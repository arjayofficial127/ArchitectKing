import { Router, Request, Response } from 'express';
import { container } from '../../../core/di/container';
import { TYPES } from '../../../core/di/types';
import { CalendarService } from '../../../infrastructure/services/superadmin/calendar.service';
import { ICalendarEventRepository } from '../../../application/interfaces/ICalendarEventRepository';
import { GetScheduleRangeDto } from '../../../application/dtos/booking.dto';
import { ValidationError } from '../../../core/errors/AppError';

const router: ReturnType<typeof Router> = Router();

// GET /api/public/schedule?start=...&end=...
// Returns only public_open events
router.get('/', async (req: Request, res: Response, next) => {
  try {
    const queryResult = GetScheduleRangeDto.safeParse(req.query);
    
    if (!queryResult.success) {
      return next(new ValidationError('Invalid query parameters', queryResult.error.flatten().fieldErrors));
    }

    const { start, end } = queryResult.data;
    const rangeStart = new Date(start);
    const rangeEnd = new Date(end);

    // Get all public_open events in the date range
    const calendarEventRepo = container.resolve<ICalendarEventRepository>(TYPES.ICalendarEventRepository);
    const allEvents = await calendarEventRepo.findByDateRange(rangeStart, rangeEnd);
    
    // Filter for public_open visibility and open_slot status
    const publicEvents = allEvents.filter(
      (e) => e.visibility === 'public_open' && e.status === 'open_slot'
    );

    // Times where a recurring instance was already materialized into a
    // concrete child event (booked or pending) must not be offered again.
    const materializedTimes = new Set(
      allEvents
        .filter((e) => e.recurrenceParentId)
        .map((e) => `${e.recurrenceParentId}|${(e.recurrenceOriginalStart ?? e.startDatetime).getTime()}`)
    );

    // Expand recurring events
    const calendarService = container.resolve<CalendarService>(TYPES.ICalendarService);
    const expandedEvents: any[] = [];

    for (const event of publicEvents) {
      if (event.recurrenceRule && !event.recurrenceParentId) {
        const instances = calendarService
          .generateRecurringInstances(event, rangeStart, rangeEnd)
          .filter((i) => !materializedTimes.has(`${i.parentId}|${i.startDatetime.getTime()}`));
        expandedEvents.push(...instances);
      } else {
        // Standalone slots and still-open materialized children
        expandedEvents.push(event);
      }
    }

    // Only offer future times, with a minimum booking notice
    const MIN_NOTICE_MS = 60 * 60 * 1000; // 1 hour
    const cutoff = Date.now() + MIN_NOTICE_MS;
    const bookableEvents = expandedEvents.filter(
      (e) => e.startDatetime.getTime() >= cutoff
    );

    // Sort by start_datetime
    bookableEvents.sort((a, b) => a.startDatetime.getTime() - b.startDatetime.getTime());

    res.json({
      success: true,
      data: bookableEvents,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

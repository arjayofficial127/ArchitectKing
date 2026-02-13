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

    // Expand recurring events
    const calendarService = container.resolve<CalendarService>(TYPES.ICalendarService);
    const expandedEvents: any[] = [];
    
    for (const event of publicEvents) {
      if (event.recurrenceRule && !event.recurrenceParentId) {
        const instances = calendarService.generateRecurringInstances(event, rangeStart, rangeEnd);
        expandedEvents.push(...instances);
      } else if (!event.recurrenceParentId) {
        expandedEvents.push(event);
      }
    }

    // Sort by start_datetime
    expandedEvents.sort((a, b) => a.startDatetime.getTime() - b.startDatetime.getTime());

    res.json({
      success: true,
      data: expandedEvents,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

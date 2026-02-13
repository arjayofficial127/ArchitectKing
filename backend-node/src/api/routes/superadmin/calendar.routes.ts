import { Router, Request, Response } from 'express';
import { container } from '../../../core/di/container';
import { TYPES } from '../../../core/di/types';
import { CalendarService } from '../../../infrastructure/services/superadmin/calendar.service';
import { CreateCalendarEventDto, UpdateCalendarEventDto, GetEventsRangeDto, DeleteEventModeDto } from '../../../application/dtos/calendar.dto';
import { authMiddleware } from '../../middleware/authMiddleware';
import { requireSuperAdmin } from '../../middleware/requireSuperAdmin';
import { ValidationError } from '../../../core/errors/AppError';

const router: ReturnType<typeof Router> = Router();

// All routes require authentication and SuperAdmin
router.use(authMiddleware);
router.use(requireSuperAdmin);

// GET /api/superadmin/calendar/range?start=...&end=...
router.get('/range', async (req: Request, res: Response, next) => {
  try {
    const userId = req.user!.userId;
    const queryResult = GetEventsRangeDto.safeParse(req.query);
    
    if (!queryResult.success) {
      return next(new ValidationError('Invalid query parameters', queryResult.error.flatten().fieldErrors));
    }

    const { start, end } = queryResult.data;
    const rangeStart = new Date(start);
    const rangeEnd = new Date(end);

    const calendarService = container.resolve<CalendarService>(TYPES.ICalendarService);
    const events = await calendarService.getEvents(userId, rangeStart, rangeEnd);

    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/superadmin/calendar
router.post('/', async (req: Request, res: Response, next) => {
  try {
    const userId = req.user!.userId;
    const bodyResult = CreateCalendarEventDto.safeParse(req.body);

    if (!bodyResult.success) {
      return next(new ValidationError('Invalid request body', bodyResult.error.flatten().fieldErrors));
    }

    const calendarService = container.resolve<CalendarService>(TYPES.ICalendarService);
    const event = await calendarService.createEvent(userId, bodyResult.data);

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/superadmin/calendar/:id?mode=single|series
router.patch('/:id', async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const modeResult = DeleteEventModeDto.safeParse(req.query.mode || 'single');
    const bodyResult = UpdateCalendarEventDto.safeParse(req.body);

    if (!bodyResult.success) {
      return next(new ValidationError('Invalid request body', bodyResult.error.flatten().fieldErrors));
    }

    const mode = modeResult.success ? modeResult.data : 'single';
    const calendarService = container.resolve<CalendarService>(TYPES.ICalendarService);
    const event = await calendarService.updateEvent(id, bodyResult.data, mode);

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/superadmin/calendar/:id?mode=single|series
router.delete('/:id', async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params;
    const modeResult = DeleteEventModeDto.safeParse(req.query.mode || 'single');
    const mode = modeResult.success ? modeResult.data : 'single';

    const calendarService = container.resolve<CalendarService>(TYPES.ICalendarService);
    await calendarService.deleteEvent(id, mode);

    res.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

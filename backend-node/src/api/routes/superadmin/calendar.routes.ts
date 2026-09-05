import { Router, Request, Response } from 'express';
import { container } from '../../../core/di/container';
import { TYPES } from '../../../core/di/types';
import { CalendarService } from '../../../infrastructure/services/superadmin/calendar.service';
import { CreateCalendarEventDto, UpdateCalendarEventDto, GetEventsRangeDto, DeleteEventModeDto, BulkCreateCalendarEventsDto } from '../../../application/dtos/calendar.dto';
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

    // Batch-wide updates are not supported yet; treat as single
    const mode = modeResult.success && modeResult.data !== 'batch' ? modeResult.data : 'single';
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

// POST /api/superadmin/calendar/bulk - create several events sharing one batchId
router.post('/bulk', async (req: Request, res: Response, next) => {
  try {
    const userId = req.user!.userId;
    const bodyResult = BulkCreateCalendarEventsDto.safeParse(req.body);

    if (!bodyResult.success) {
      return next(new ValidationError('Invalid request body', bodyResult.error.flatten().fieldErrors));
    }

    const { occurrences, ...template } = bodyResult.data;
    const calendarService = container.resolve<CalendarService>(TYPES.ICalendarService);
    const events = await calendarService.createBatch(userId, template, occurrences);

    res.status(201).json({
      success: true,
      data: events,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/superadmin/calendar/materialize - turn a virtual recurring
// instance into a concrete child event so it can be edited individually
router.post('/materialize', async (req: Request, res: Response, next) => {
  try {
    const instanceId = typeof req.body?.instanceId === 'string' ? req.body.instanceId : '';
    if (!instanceId) {
      return next(new ValidationError('instanceId is required', {}));
    }

    const calendarService = container.resolve<CalendarService>(TYPES.ICalendarService);
    const event = await calendarService.materializeOccurrence(instanceId);

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/superadmin/calendar/batch/:batchId/size - how many events share this batch
router.get('/batch/:batchId/size', async (req: Request, res: Response, next) => {
  try {
    const calendarService = container.resolve<CalendarService>(TYPES.ICalendarService);
    const size = await calendarService.getBatchSize(req.params.batchId);
    res.json({ success: true, data: { size } });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/superadmin/calendar/:id?mode=single|series|batch
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

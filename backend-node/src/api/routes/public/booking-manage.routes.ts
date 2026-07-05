import { Router, Request, Response } from 'express';
import { container } from '../../../core/di/container';
import { TYPES } from '../../../core/di/types';
import { BookingService } from '../../../infrastructure/services/public/booking.service';
import { ValidationError } from '../../../core/errors/AppError';

const router: ReturnType<typeof Router> = Router();

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function toPublicPayload(booking: any, event: any) {
  return {
    name: booking.name,
    email: booking.email,
    message: booking.message,
    status: booking.status,
    timezoneAtBooking: booking.timezoneAtBooking,
    event: {
      title: event.title,
      startDatetime: event.startDatetime,
      endDatetime: event.endDatetime,
      timezone: event.timezone,
    },
  };
}

// GET /api/public/booking/:token — view a booking via its secret token
router.get('/:token', async (req: Request, res: Response, next) => {
  try {
    const { token } = req.params;
    if (!UUID_RE.test(token)) {
      return next(new ValidationError('Invalid booking token', {}));
    }

    const bookingService = container.resolve<BookingService>(TYPES.IBookingService);
    const { booking, event } = await bookingService.getBookingByToken(token);

    res.json({ success: true, data: toPublicPayload(booking, event) });
  } catch (error) {
    next(error);
  }
});

// POST /api/public/booking/:token/cancel
router.post('/:token/cancel', async (req: Request, res: Response, next) => {
  try {
    const { token } = req.params;
    if (!UUID_RE.test(token)) {
      return next(new ValidationError('Invalid booking token', {}));
    }

    const bookingService = container.resolve<BookingService>(TYPES.IBookingService);
    const { booking, event } = await bookingService.cancelBookingByToken(token);

    res.json({ success: true, data: toPublicPayload(booking, event) });
  } catch (error) {
    next(error);
  }
});

export default router;

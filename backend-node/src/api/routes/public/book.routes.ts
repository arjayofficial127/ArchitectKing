import { Router, Request, Response } from 'express';
import { container } from '../../../core/di/container';
import { TYPES } from '../../../core/di/types';
import { BookingService } from '../../../infrastructure/services/public/booking.service';
import { CreateBookingRequestDto } from '../../../application/dtos/booking.dto';
import { ValidationError } from '../../../core/errors/AppError';

const router: ReturnType<typeof Router> = Router();

// POST /api/public/book
router.post('/', async (req: Request, res: Response, next) => {
  try {
    const bodyResult = CreateBookingRequestDto.safeParse(req.body);

    if (!bodyResult.success) {
      return next(new ValidationError('Invalid request body', bodyResult.error.flatten().fieldErrors));
    }

    const bookingService = container.resolve<BookingService>(TYPES.IBookingService);
    const booking = await bookingService.createBookingRequest(bodyResult.data);

    res.status(201).json({
      success: true,
      data: booking,
      message: 'Booking request created successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

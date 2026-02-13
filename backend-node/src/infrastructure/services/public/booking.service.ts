import { injectable } from 'tsyringe';
import { IBookingRequestRepository } from '../../../application/interfaces/IBookingRequestRepository';
import { IEntityRepository } from '../../../application/interfaces/IEntityRepository';
import { ISuperAdminNotificationRepository } from '../../../application/interfaces/ISuperAdminNotificationRepository';
import { ICalendarEventRepository } from '../../../application/interfaces/ICalendarEventRepository';
import { CalendarService } from '../superadmin/calendar.service';
import { BookingRequest } from '../../../domain/entities/BookingRequest';
import { Entity } from '../../../domain/entities/Entity';
import { NotFoundError } from '../../../core/errors/AppError';

export interface CreateBookingRequestInput {
  calendarEventId: string;
  name: string;
  email: string;
  message?: string;
  timezone?: string;
}

@injectable()
export class BookingService {
  constructor(
    private bookingRequestRepo: IBookingRequestRepository,
    private entityRepo: IEntityRepository,
    private notificationRepo: ISuperAdminNotificationRepository,
    private calendarEventRepo: ICalendarEventRepository,
    private calendarService: CalendarService
  ) {}

  async createBookingRequest(input: CreateBookingRequestInput): Promise<BookingRequest> {
    // Get the slot first to get its times
    const slot = await this.calendarEventRepo.findById(input.calendarEventId);
    if (!slot) {
      throw new NotFoundError('Calendar Event', input.calendarEventId);
    }

    // Validate the slot (checks status, visibility, overlaps)
    await this.calendarService.validatePublicBooking(
      input.calendarEventId,
      slot.startDatetime,
      slot.endDatetime
    );

    // Create or find entity by email
    let entity = await this.entityRepo.findByEmail(input.email);
    if (!entity) {
      entity = await this.entityRepo.create({
        type: 'person',
        name: input.name,
        email: input.email,
        phone: null,
        website: null,
        imageUrl: null,
        notes: null,
      });
    }

    // Create booking request
    const booking = await this.bookingRequestRepo.create({
      calendarEventId: input.calendarEventId,
      name: input.name,
      email: input.email,
      message: input.message || null,
      timezoneAtBooking: input.timezone || null,
      status: 'confirmed',
    });

    // Convert slot to scheduled
    await this.calendarService.convertOpenSlotToScheduled(input.calendarEventId);

    // Create notification
    await this.notificationRepo.create({
      type: 'booking_request',
      relatedId: booking.id,
      read: false,
    });

    return booking;
  }
}

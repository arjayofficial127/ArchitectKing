import { injectable, inject } from 'tsyringe';
import { DateTime } from 'luxon';
import { TYPES } from '../../../core/di/types';
import { IMailService } from '../../../application/interfaces/IMailService';
import { generateIcs } from '../mail/ics';
import { IBookingRequestRepository } from '../../../application/interfaces/IBookingRequestRepository';
import { IEntityRepository } from '../../../application/interfaces/IEntityRepository';
import { ISuperAdminNotificationRepository } from '../../../application/interfaces/ISuperAdminNotificationRepository';
import { ICalendarEventRepository } from '../../../application/interfaces/ICalendarEventRepository';
import { CalendarService } from '../superadmin/calendar.service';
import { BookingRequest } from '../../../domain/entities/BookingRequest';
import { Entity } from '../../../domain/entities/Entity';
import { NotFoundError, ConflictError } from '../../../core/errors/AppError';

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
    @inject(TYPES.IBookingRequestRepository) private bookingRequestRepo: IBookingRequestRepository,
    @inject(TYPES.IEntityRepository) private entityRepo: IEntityRepository,
    @inject(TYPES.ISuperAdminNotificationRepository) private notificationRepo: ISuperAdminNotificationRepository,
    @inject(TYPES.ICalendarEventRepository) private calendarEventRepo: ICalendarEventRepository,
    @inject(TYPES.ICalendarService) private calendarService: CalendarService,
    @inject(TYPES.IMailService) private mailService: IMailService
  ) {}

  async createBookingRequest(input: CreateBookingRequestInput): Promise<BookingRequest> {
    // Recurring slots arrive as virtual instance ids - materialize a concrete
    // child event first so the booking has a real row to attach to.
    const isVirtualInstance =
      CalendarService.parseInstanceId(input.calendarEventId) !== null;

    let slot;
    if (isVirtualInstance) {
      slot = await this.calendarService.materializeInstance(input.calendarEventId);
    } else {
      slot = await this.calendarEventRepo.findById(input.calendarEventId);
      if (!slot) {
        throw new NotFoundError('Calendar Event', input.calendarEventId);
      }
    }
    const slotId = slot.id;

    // Validate the slot (checks status, visibility, overlaps)
    await this.calendarService.validatePublicBooking(
      slotId,
      slot.startDatetime,
      slot.endDatetime
    );

    // Guard: cap upcoming bookings per email to prevent calendar hostage-taking
    const MAX_ACTIVE_BOOKINGS_PER_EMAIL = 3;
    const previousBookings = await this.bookingRequestRepo.findByEmail(input.email);
    const confirmed = previousBookings.filter((b) => b.status === 'confirmed');
    if (confirmed.length >= MAX_ACTIVE_BOOKINGS_PER_EMAIL) {
      let active = 0;
      for (const b of confirmed) {
        const ev = await this.calendarEventRepo.findById(b.calendarEventId);
        if (ev && ev.startDatetime.getTime() > Date.now()) active++;
      }
      if (active >= MAX_ACTIVE_BOOKINGS_PER_EMAIL) {
        throw new ConflictError(
          'You already have several upcoming bookings. Please email me directly to arrange more time.'
        );
      }
    }

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
      calendarEventId: slotId,
      name: input.name,
      email: input.email,
      message: input.message || null,
      timezoneAtBooking: input.timezone || null,
      status: 'confirmed',
    });

    // Convert slot to scheduled
    await this.calendarService.convertOpenSlotToScheduled(slotId);

    // Create notification
    await this.notificationRepo.create({
      type: 'booking_request',
      relatedId: booking.id,
      read: false,
    });

    // Emails are best-effort: a mail outage must never fail a booking
    try {
      await this.sendBookingEmails(input, slot.startDatetime, slot.endDatetime, booking.cancelToken);
    } catch (error: any) {
      console.error(`[Booking] Failed to send booking emails: ${error?.message || error}`);
    }

    return booking;
  }

  async getBookingByToken(token: string): Promise<{ booking: BookingRequest; event: any }> {
    const booking = await this.bookingRequestRepo.findByCancelToken(token);
    if (!booking) {
      throw new NotFoundError('Booking', token);
    }
    const event = await this.calendarEventRepo.findById(booking.calendarEventId);
    if (!event) {
      throw new NotFoundError('Calendar Event', booking.calendarEventId);
    }
    return { booking, event };
  }

  async cancelBookingByToken(token: string): Promise<{ booking: BookingRequest; event: any }> {
    const { booking, event } = await this.getBookingByToken(token);

    if (booking.status === 'cancelled') {
      return { booking, event };
    }
    if (event.startDatetime.getTime() <= Date.now()) {
      throw new ConflictError('This booking has already started or passed');
    }

    const updated = await this.bookingRequestRepo.updateStatus(booking.id, 'cancelled');

    // Release the slot so someone else can book it
    if (event.status === 'scheduled') {
      await this.calendarEventRepo.update(event.id, {
        status: 'open_slot',
        visibility: 'public_open',
      });
    }

    await this.notificationRepo.create({
      type: 'system',
      relatedId: booking.id,
      read: false,
    });

    try {
      await this.sendCancellationEmails(updated, event.startDatetime, event.endDatetime);
    } catch (error: any) {
      console.error(`[Booking] Failed to send cancellation emails: ${error?.message || error}`);
    }

    return { booking: updated, event };
  }

  private async sendCancellationEmails(booking: BookingRequest, start: Date, end: Date): Promise<void> {
    const visitorZone = booking.timezoneAtBooking || 'Asia/Manila';
    const startLocal = DateTime.fromJSDate(start).setZone(visitorZone);
    const endLocal = DateTime.fromJSDate(end).setZone(visitorZone);
    const dateLine = `${startLocal.toFormat('cccc, MMMM d, yyyy')} · ${startLocal.toFormat('h:mm a')} – ${endLocal.toFormat('h:mm a')} (${visitorZone})`;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const ownerEmail = process.env.OWNER_NOTIFY_EMAIL || 'arvinjaysoncastro@gmail.com';

    await this.mailService.send({
      to: booking.email,
      subject: `Booking cancelled - ${startLocal.toFormat('MMM d, h:mm a')}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
          <h2 style="margin-bottom:4px">Your booking has been cancelled.</h2>
          <div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px;background:#f8fafc">
            <strong>${escapeHtml(dateLine)}</strong>
          </div>
          <p style="color:#475569">Changed your mind? You can <a href="${frontendUrl}/schedule" style="color:#b45309">pick a new time</a> any time.</p>
        </div>`,
    });

    await this.mailService.send({
      to: ownerEmail,
      subject: `Booking cancelled: ${booking.name} - ${startLocal.toFormat('MMM d, h:mm a')}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
          <h2 style="margin-bottom:4px">Booking cancelled</h2>
          <div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px;background:#f8fafc">
            <p style="margin:0"><strong>${escapeHtml(booking.name)}</strong> &lt;${escapeHtml(booking.email)}&gt;</p>
            <p style="margin:8px 0 0">${escapeHtml(dateLine)}</p>
          </div>
          <p style="color:#475569">The slot has been released and is bookable again.</p>
        </div>`,
    });
  }

  private async sendBookingEmails(
    input: CreateBookingRequestInput,
    start: Date,
    end: Date,
    cancelToken: string
  ): Promise<void> {
    const visitorZone = input.timezone || 'Asia/Manila';
    const startLocal = DateTime.fromJSDate(start).setZone(visitorZone);
    const endLocal = DateTime.fromJSDate(end).setZone(visitorZone);
    const dateLine = `${startLocal.toFormat('cccc, MMMM d, yyyy')} · ${startLocal.toFormat('h:mm a')} – ${endLocal.toFormat('h:mm a')} (${visitorZone})`;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const ownerEmail = process.env.OWNER_NOTIFY_EMAIL || 'arvinjaysoncastro@gmail.com';

    const ics = generateIcs({
      uid: `booking-${start.getTime()}@arvinjaysoncastro.com`,
      start,
      end,
      summary: 'Call with Arvin Jayson Castro',
      description: input.message || 'Booked via arvinjaysoncastro.com/schedule',
      url: `${frontendUrl}/schedule`,
      organizerName: 'Arvin Jayson Castro',
      organizerEmail: ownerEmail,
    });
    const icsBase64 = Buffer.from(ics, 'utf-8').toString('base64');

    // Visitor confirmation
    await this.mailService.send({
      to: input.email,
      subject: `Booking received - ${startLocal.toFormat('MMM d, h:mm a')} (${visitorZone})`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
          <h2 style="margin-bottom:4px">Your booking is in, ${escapeHtml(input.name.split(' ')[0])}.</h2>
          <p style="color:#475569">Here are the details:</p>
          <div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px;background:#f8fafc">
            <strong>${escapeHtml(dateLine)}</strong>
            ${input.message ? `<p style="margin:8px 0 0;color:#475569">Your note: ${escapeHtml(input.message)}</p>` : ''}
          </div>
          <p style="color:#475569">I'll personally confirm the call and send the meeting link from this address. The attached invite adds the slot to your calendar.</p>
          <p style="color:#475569">Need to reschedule or cancel? <a href="${frontendUrl}/booking/${cancelToken}" style="color:#b45309">Manage your booking here</a>.</p>
        </div>`,
      attachments: [{ filename: 'booking.ics', content: icsBase64 }],
    });

    // Owner alert
    await this.mailService.send({
      to: ownerEmail,
      subject: `New booking: ${input.name} - ${startLocal.toFormat('MMM d, h:mm a')}`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
          <h2 style="margin-bottom:4px">New booking request</h2>
          <div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px;background:#f8fafc">
            <p style="margin:0"><strong>${escapeHtml(input.name)}</strong> &lt;${escapeHtml(input.email)}&gt;</p>
            <p style="margin:8px 0 0">${escapeHtml(dateLine)}</p>
            ${input.message ? `<p style="margin:8px 0 0;color:#475569">Message: ${escapeHtml(input.message)}</p>` : ''}
          </div>
          <p><a href="${frontendUrl}/superadmin/notifications" style="color:#b45309">Open notifications</a></p>
        </div>`,
      attachments: [{ filename: 'booking.ics', content: icsBase64 }],
    });
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

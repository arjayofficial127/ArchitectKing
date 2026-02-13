import { injectable } from 'tsyringe';
import { eq } from 'drizzle-orm';
import { db } from '../db/drizzle/client';
import { bookingRequestsTable } from '../db/drizzle/schema';
import { IBookingRequestRepository } from '../../application/interfaces/IBookingRequestRepository';
import { BookingRequest } from '../../domain/entities/BookingRequest';

@injectable()
export class BookingRequestRepository implements IBookingRequestRepository {
  async create(booking: Omit<BookingRequest, 'id' | 'createdAt'>): Promise<BookingRequest> {
    const [created] = await db
      .insert(bookingRequestsTable)
      .values({
        calendarEventId: booking.calendarEventId,
        name: booking.name,
        email: booking.email,
        message: booking.message ?? null,
        timezoneAtBooking: booking.timezoneAtBooking ?? null,
        status: booking.status,
      })
      .returning();

    return new BookingRequest(
      created.id,
      created.calendarEventId,
      created.name,
      created.email,
      created.message,
      created.timezoneAtBooking,
      created.status,
      created.createdAt
    );
  }

  async findById(id: string): Promise<BookingRequest | null> {
    const [booking] = await db
      .select()
      .from(bookingRequestsTable)
      .where(eq(bookingRequestsTable.id, id))
      .limit(1);

    if (!booking) return null;

    return new BookingRequest(
      booking.id,
      booking.calendarEventId,
      booking.name,
      booking.email,
      booking.message,
      booking.timezoneAtBooking,
      booking.status,
      booking.createdAt
    );
  }

  async findByCalendarEventId(calendarEventId: string): Promise<BookingRequest[]> {
    const bookings = await db
      .select()
      .from(bookingRequestsTable)
      .where(eq(bookingRequestsTable.calendarEventId, calendarEventId));

    return bookings.map(
      (b) =>
        new BookingRequest(
          b.id,
          b.calendarEventId,
          b.name,
          b.email,
          b.message,
          b.timezoneAtBooking,
          b.status,
          b.createdAt
        )
    );
  }

  async findByEmail(email: string): Promise<BookingRequest[]> {
    const bookings = await db
      .select()
      .from(bookingRequestsTable)
      .where(eq(bookingRequestsTable.email, email));

    return bookings.map(
      (b) =>
        new BookingRequest(
          b.id,
          b.calendarEventId,
          b.name,
          b.email,
          b.message,
          b.timezoneAtBooking,
          b.status,
          b.createdAt
        )
    );
  }

  async delete(id: string): Promise<void> {
    await db.delete(bookingRequestsTable).where(eq(bookingRequestsTable.id, id));
  }
}

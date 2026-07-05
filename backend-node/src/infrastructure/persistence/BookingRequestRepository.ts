import { injectable } from 'tsyringe';
import { eq } from 'drizzle-orm';
import { db } from '../db/drizzle/client';
import { bookingRequestsTable } from '../db/drizzle/schema';
import { IBookingRequestRepository } from '../../application/interfaces/IBookingRequestRepository';
import { BookingRequest } from '../../domain/entities/BookingRequest';

@injectable()
export class BookingRequestRepository implements IBookingRequestRepository {
  async create(booking: Omit<BookingRequest, 'id' | 'createdAt' | 'cancelToken'>): Promise<BookingRequest> {
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

    return this.mapToEntity(created);
  }

  async findById(id: string): Promise<BookingRequest | null> {
    const [booking] = await db
      .select()
      .from(bookingRequestsTable)
      .where(eq(bookingRequestsTable.id, id))
      .limit(1);

    return booking ? this.mapToEntity(booking) : null;
  }

  async findByCancelToken(cancelToken: string): Promise<BookingRequest | null> {
    const [booking] = await db
      .select()
      .from(bookingRequestsTable)
      .where(eq(bookingRequestsTable.cancelToken, cancelToken))
      .limit(1);

    return booking ? this.mapToEntity(booking) : null;
  }

  async findByCalendarEventId(calendarEventId: string): Promise<BookingRequest[]> {
    const bookings = await db
      .select()
      .from(bookingRequestsTable)
      .where(eq(bookingRequestsTable.calendarEventId, calendarEventId));

    return bookings.map((b) => this.mapToEntity(b));
  }

  async findByEmail(email: string): Promise<BookingRequest[]> {
    const bookings = await db
      .select()
      .from(bookingRequestsTable)
      .where(eq(bookingRequestsTable.email, email));

    return bookings.map((b) => this.mapToEntity(b));
  }

  async updateStatus(id: string, status: string): Promise<BookingRequest> {
    const [updated] = await db
      .update(bookingRequestsTable)
      .set({ status })
      .where(eq(bookingRequestsTable.id, id))
      .returning();

    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await db.delete(bookingRequestsTable).where(eq(bookingRequestsTable.id, id));
  }

  private mapToEntity(row: any): BookingRequest {
    return new BookingRequest(
      row.id,
      row.calendarEventId,
      row.name,
      row.email,
      row.message,
      row.timezoneAtBooking,
      row.status,
      row.cancelToken,
      row.createdAt
    );
  }
}

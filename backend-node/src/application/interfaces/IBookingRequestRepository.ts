import { BookingRequest } from '../../domain/entities/BookingRequest';

export interface IBookingRequestRepository {
  create(booking: Omit<BookingRequest, 'id' | 'createdAt'>): Promise<BookingRequest>;
  findById(id: string): Promise<BookingRequest | null>;
  findByCalendarEventId(calendarEventId: string): Promise<BookingRequest[]>;
  findByEmail(email: string): Promise<BookingRequest[]>;
  delete(id: string): Promise<void>;
}

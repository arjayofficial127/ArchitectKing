import { BookingRequest } from '../../domain/entities/BookingRequest';

export interface IBookingRequestRepository {
  create(booking: Omit<BookingRequest, 'id' | 'createdAt' | 'cancelToken'>): Promise<BookingRequest>;
  findById(id: string): Promise<BookingRequest | null>;
  findByCancelToken(cancelToken: string): Promise<BookingRequest | null>;
  findByCalendarEventId(calendarEventId: string): Promise<BookingRequest[]>;
  findByEmail(email: string): Promise<BookingRequest[]>;
  updateStatus(id: string, status: string): Promise<BookingRequest>;
  delete(id: string): Promise<void>;
}

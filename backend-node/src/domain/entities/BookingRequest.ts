/**
 * Booking Request domain entity
 */
export class BookingRequest {
  constructor(
    public readonly id: string,
    public readonly calendarEventId: string,
    public readonly name: string,
    public readonly email: string,
    public readonly message: string | null,
    public readonly timezoneAtBooking: string | null,
    public readonly status: string,
    /** Secret token allowing the visitor to view/cancel this booking */
    public readonly cancelToken: string,
    public readonly createdAt: Date
  ) {}
}

/**
 * Calendar Event domain entity
 */
export class CalendarEvent {
  constructor(
    public readonly id: string,
    public readonly ownerUserId: string,
    public readonly title: string,
    public readonly agenda: string | null,
    public readonly notes: string | null,
    public readonly startDatetime: Date,
    public readonly endDatetime: Date,
    public readonly timezone: string,
    public readonly status: 'scheduled' | 'completed' | 'cancelled' | 'open_slot',
    public readonly visibility: 'private' | 'public_open',
    public readonly recurrenceRule: Record<string, any> | null,
    public readonly recurrenceParentId: string | null,
    public readonly color: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

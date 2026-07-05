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
    /** For materialized occurrences: the rule-generated time, fixed even if the occurrence is moved */
    public readonly recurrenceOriginalStart: Date | null,
    /** Groups events created together in one action (multi-day / split); deleting can target the whole batch */
    public readonly batchId: string | null,
    public readonly color: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

/**
 * Prospect Meeting junction entity
 */
export class ProspectMeeting {
  constructor(
    public readonly id: string,
    public readonly prospectId: string,
    public readonly calendarEventId: string
  ) {}
}

import { injectable } from 'tsyringe';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/drizzle/client';
import { prospectMeetingsTable } from '../db/drizzle/schema';
import { IProspectMeetingRepository } from '../../application/interfaces/IProspectMeetingRepository';
import { ProspectMeeting } from '../../domain/entities/ProspectMeeting';

@injectable()
export class ProspectMeetingRepository implements IProspectMeetingRepository {
  async create(meeting: Omit<ProspectMeeting, 'id'>): Promise<ProspectMeeting> {
    const [created] = await db
      .insert(prospectMeetingsTable)
      .values({
        prospectId: meeting.prospectId,
        calendarEventId: meeting.calendarEventId,
      })
      .returning();

    return new ProspectMeeting(created.id, created.prospectId, created.calendarEventId);
  }

  async findByProspectId(prospectId: string): Promise<ProspectMeeting[]> {
    const meetings = await db
      .select()
      .from(prospectMeetingsTable)
      .where(eq(prospectMeetingsTable.prospectId, prospectId));

    return meetings.map((m) => new ProspectMeeting(m.id, m.prospectId, m.calendarEventId));
  }

  async findByCalendarEventId(calendarEventId: string): Promise<ProspectMeeting[]> {
    const meetings = await db
      .select()
      .from(prospectMeetingsTable)
      .where(eq(prospectMeetingsTable.calendarEventId, calendarEventId));

    return meetings.map((m) => new ProspectMeeting(m.id, m.prospectId, m.calendarEventId));
  }

  async delete(id: string): Promise<void> {
    await db.delete(prospectMeetingsTable).where(eq(prospectMeetingsTable.id, id));
  }

  async deleteByProspectAndEvent(prospectId: string, calendarEventId: string): Promise<void> {
    await db
      .delete(prospectMeetingsTable)
      .where(
        and(
          eq(prospectMeetingsTable.prospectId, prospectId),
          eq(prospectMeetingsTable.calendarEventId, calendarEventId)
        )
      );
  }
}

import { ProspectMeeting } from '../../domain/entities/ProspectMeeting';

export interface IProspectMeetingRepository {
  create(meeting: Omit<ProspectMeeting, 'id'>): Promise<ProspectMeeting>;
  findByProspectId(prospectId: string): Promise<ProspectMeeting[]>;
  findByCalendarEventId(calendarEventId: string): Promise<ProspectMeeting[]>;
  delete(id: string): Promise<void>;
  deleteByProspectAndEvent(prospectId: string, calendarEventId: string): Promise<void>;
}

import { CalendarEvent } from '../../domain/entities/CalendarEvent';

export interface ICalendarEventRepository {
  create(event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent>;
  findById(id: string): Promise<CalendarEvent | null>;
  findByOwnerUserId(ownerUserId: string, startDate?: Date, endDate?: Date): Promise<CalendarEvent[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<CalendarEvent[]>;
  update(id: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent>;
  delete(id: string): Promise<void>;
  findRecurringInstances(parentId: string): Promise<CalendarEvent[]>;
}

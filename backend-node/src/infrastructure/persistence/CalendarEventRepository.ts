import { injectable } from 'tsyringe';
import { eq, and, gte, lte, or, isNull } from 'drizzle-orm';
import { db } from '../db/drizzle/client';
import { calendarEventsTable } from '../db/drizzle/schema';
import { ICalendarEventRepository } from '../../application/interfaces/ICalendarEventRepository';
import { CalendarEvent } from '../../domain/entities/CalendarEvent';

@injectable()
export class CalendarEventRepository implements ICalendarEventRepository {
  async create(event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent> {
    const now = new Date();
    const [created] = await db
      .insert(calendarEventsTable)
      .values({
        ownerUserId: event.ownerUserId,
        title: event.title,
        agenda: event.agenda ?? null,
        notes: event.notes ?? null,
        startDatetime: event.startDatetime,
        endDatetime: event.endDatetime,
        timezone: event.timezone,
        status: event.status,
        visibility: event.visibility,
        recurrenceRule: event.recurrenceRule ? JSON.stringify(event.recurrenceRule) : null,
        recurrenceParentId: event.recurrenceParentId ?? null,
        color: event.color ?? null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return this.mapToEntity(created);
  }

  async findById(id: string): Promise<CalendarEvent | null> {
    const [event] = await db
      .select()
      .from(calendarEventsTable)
      .where(eq(calendarEventsTable.id, id))
      .limit(1);

    if (!event) return null;
    return this.mapToEntity(event);
  }

  async findByOwnerUserId(ownerUserId: string, startDate?: Date, endDate?: Date): Promise<CalendarEvent[]> {
    if (startDate && endDate) {
      const events = await db
        .select()
        .from(calendarEventsTable)
        .where(
          and(
            eq(calendarEventsTable.ownerUserId, ownerUserId),
            or(
              and(
                gte(calendarEventsTable.startDatetime, startDate),
                lte(calendarEventsTable.startDatetime, endDate)
              ),
              and(
                gte(calendarEventsTable.endDatetime, startDate),
                lte(calendarEventsTable.endDatetime, endDate)
              ),
              and(
                lte(calendarEventsTable.startDatetime, startDate),
                gte(calendarEventsTable.endDatetime, endDate)
              )
            )
          )
        );
      return events.map((e) => this.mapToEntity(e));
    }

    const events = await db
      .select()
      .from(calendarEventsTable)
      .where(eq(calendarEventsTable.ownerUserId, ownerUserId));

    return events.map((e) => this.mapToEntity(e));
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    const events = await db
      .select()
      .from(calendarEventsTable)
      .where(
        or(
          and(
            gte(calendarEventsTable.startDatetime, startDate),
            lte(calendarEventsTable.startDatetime, endDate)
          ),
          and(
            gte(calendarEventsTable.endDatetime, startDate),
            lte(calendarEventsTable.endDatetime, endDate)
          ),
          and(
            lte(calendarEventsTable.startDatetime, startDate),
            gte(calendarEventsTable.endDatetime, endDate)
          )
        )
      );

    return events.map((e) => this.mapToEntity(e));
  }

  async update(id: string, updates: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.agenda !== undefined) updateData.agenda = updates.agenda;
    if (updates.notes !== undefined) updateData.notes = updates.notes;
    if (updates.startDatetime !== undefined) updateData.startDatetime = updates.startDatetime;
    if (updates.endDatetime !== undefined) updateData.endDatetime = updates.endDatetime;
    if (updates.timezone !== undefined) updateData.timezone = updates.timezone;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.visibility !== undefined) updateData.visibility = updates.visibility;
    if (updates.recurrenceRule !== undefined) {
      updateData.recurrenceRule = updates.recurrenceRule ? JSON.stringify(updates.recurrenceRule) : null;
    }
    if (updates.recurrenceParentId !== undefined) updateData.recurrenceParentId = updates.recurrenceParentId;
    if (updates.color !== undefined) updateData.color = updates.color;

    const [updated] = await db
      .update(calendarEventsTable)
      .set(updateData)
      .where(eq(calendarEventsTable.id, id))
      .returning();

    return this.mapToEntity(updated);
  }

  async delete(id: string): Promise<void> {
    await db.delete(calendarEventsTable).where(eq(calendarEventsTable.id, id));
  }

  async findRecurringInstances(parentId: string): Promise<CalendarEvent[]> {
    const events = await db
      .select()
      .from(calendarEventsTable)
      .where(eq(calendarEventsTable.recurrenceParentId, parentId));

    return events.map((e) => this.mapToEntity(e));
  }

  private mapToEntity(row: any): CalendarEvent {
    return new CalendarEvent(
      row.id,
      row.ownerUserId,
      row.title,
      row.agenda,
      row.notes,
      row.startDatetime,
      row.endDatetime,
      row.timezone,
      row.status,
      row.visibility,
      row.recurrenceRule ? JSON.parse(row.recurrenceRule) : null,
      row.recurrenceParentId,
      row.color,
      row.createdAt,
      row.updatedAt
    );
  }
}

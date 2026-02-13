import { injectable } from 'tsyringe';
import { DateTime } from 'luxon';
import { ICalendarEventRepository } from '../../../application/interfaces/ICalendarEventRepository';
import { CalendarEvent } from '../../../domain/entities/CalendarEvent';
import { BadRequestError, NotFoundError, ConflictError } from '../../../core/errors/AppError';

export interface CreateEventInput {
  title: string;
  agenda?: string;
  notes?: string;
  startDatetime: string; // ISO string in timezone
  endDatetime: string; // ISO string in timezone
  timezone?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'open_slot';
  visibility: 'private' | 'public_open';
  recurrenceRule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval?: number;
    endDate?: string;
    count?: number;
    byDay?: string[]; // For weekly: ['MO', 'WE', 'FR']
    byMonthDay?: number[]; // For monthly: [1, 15]
  };
  color?: string;
}

export interface UpdateEventInput {
  title?: string;
  agenda?: string;
  notes?: string;
  startDatetime?: string;
  endDatetime?: string;
  timezone?: string;
  status?: 'scheduled' | 'completed' | 'cancelled' | 'open_slot';
  visibility?: 'private' | 'public_open';
  recurrenceRule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval?: number;
    endDate?: string;
    count?: number;
    byDay?: string[];
    byMonthDay?: number[];
  } | null;
  color?: string;
}

export interface VirtualEventInstance {
  id: string;
  parentId: string;
  title: string;
  agenda: string | null;
  notes: string | null;
  startDatetime: Date;
  endDatetime: Date;
  timezone: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'open_slot';
  visibility: 'private' | 'public_open';
  color: string | null;
  isVirtual: true;
}

@injectable()
export class CalendarService {
  constructor(private calendarEventRepo: ICalendarEventRepository) {}

  async createEvent(ownerUserId: string, input: CreateEventInput): Promise<CalendarEvent> {
    const timezone = input.timezone || 'Asia/Manila';

    // Parse and convert to UTC
    const startDt = DateTime.fromISO(input.startDatetime, { zone: timezone });
    const endDt = DateTime.fromISO(input.endDatetime, { zone: timezone });

    if (!startDt.isValid || !endDt.isValid) {
      throw new BadRequestError('Invalid datetime format');
    }

    const startUtc = startDt.toUTC();
    const endUtc = endDt.toUTC();

    // Validate start < end
    if (startUtc >= endUtc) {
      throw new BadRequestError('Start datetime must be before end datetime');
    }

    const event = await this.calendarEventRepo.create({
      ownerUserId,
      title: input.title,
      agenda: input.agenda || null,
      notes: input.notes || null,
      startDatetime: startUtc.toJSDate(),
      endDatetime: endUtc.toJSDate(),
      timezone,
      status: input.status,
      visibility: input.visibility,
      recurrenceRule: input.recurrenceRule || null,
      recurrenceParentId: null,
      color: input.color || null,
    });

    return event;
  }

  async updateEvent(
    eventId: string,
    input: UpdateEventInput,
    mode: 'single' | 'series'
  ): Promise<CalendarEvent> {
    const existingEvent = await this.calendarEventRepo.findById(eventId);
    if (!existingEvent) {
      throw new NotFoundError('Calendar Event', eventId);
    }

    if (mode === 'single') {
      // Clone instance and remove recurrenceParentId
      if (existingEvent.recurrenceParentId) {
        // Handle timezone conversion if datetime is updated
        let startDatetime = existingEvent.startDatetime;
        let endDatetime = existingEvent.endDatetime;
        
        if (input.startDatetime || input.endDatetime) {
          const timezone = input.timezone || existingEvent.timezone;
          if (input.startDatetime) {
            const startDt = DateTime.fromISO(input.startDatetime, { zone: timezone });
            if (startDt.isValid) {
              startDatetime = startDt.toUTC().toJSDate();
            }
          }
          if (input.endDatetime) {
            const endDt = DateTime.fromISO(input.endDatetime, { zone: timezone });
            if (endDt.isValid) {
              endDatetime = endDt.toUTC().toJSDate();
            }
          }
        }

        // Create new event
        const newEvent = await this.calendarEventRepo.create({
          ownerUserId: existingEvent.ownerUserId,
          title: input.title ?? existingEvent.title,
          agenda: input.agenda ?? existingEvent.agenda,
          notes: input.notes ?? existingEvent.notes,
          startDatetime,
          endDatetime,
          timezone: input.timezone || existingEvent.timezone,
          status: input.status || existingEvent.status,
          visibility: input.visibility || existingEvent.visibility,
          recurrenceRule: null,
          recurrenceParentId: null,
          color: input.color ?? existingEvent.color,
        });

        return newEvent;
      } else {
        // Not a recurring instance, just update
        return this.updateEventFields(eventId, input);
      }
    } else {
      // Update series (master event)
      if (existingEvent.recurrenceParentId) {
        // If this is an instance, update the parent
        const parent = await this.calendarEventRepo.findById(existingEvent.recurrenceParentId);
        if (parent) {
          return this.updateEventFields(parent.id, input);
        }
      }
      return this.updateEventFields(eventId, input);
    }
  }

  private async updateEventFields(eventId: string, input: UpdateEventInput): Promise<CalendarEvent> {
    const existingEvent = await this.calendarEventRepo.findById(eventId);
    if (!existingEvent) {
      throw new NotFoundError('Calendar Event', eventId);
    }

    const updates: any = {};

    if (input.title !== undefined) updates.title = input.title;
    if (input.agenda !== undefined) updates.agenda = input.agenda;
    if (input.notes !== undefined) updates.notes = input.notes;
    if (input.status !== undefined) updates.status = input.status;
    if (input.visibility !== undefined) updates.visibility = input.visibility;
    if (input.color !== undefined) updates.color = input.color;
    if (input.recurrenceRule !== undefined) {
      updates.recurrenceRule = input.recurrenceRule;
    }

    // Handle timezone conversion for datetime updates
    let startDatetime = existingEvent.startDatetime;
    let endDatetime = existingEvent.endDatetime;
    
    if (input.startDatetime || input.endDatetime) {
      const timezone = input.timezone || existingEvent.timezone;
      if (input.startDatetime) {
        const startDt = DateTime.fromISO(input.startDatetime, { zone: timezone });
        if (startDt.isValid) {
          startDatetime = startDt.toUTC().toJSDate();
          updates.startDatetime = startDatetime;
        }
      }
      if (input.endDatetime) {
        const endDt = DateTime.fromISO(input.endDatetime, { zone: timezone });
        if (endDt.isValid) {
          endDatetime = endDt.toUTC().toJSDate();
          updates.endDatetime = endDatetime;
        }
      }

      // Validate start < end
      if (startDatetime >= endDatetime) {
        throw new BadRequestError('Start datetime must be before end datetime');
      }
    }

    return this.calendarEventRepo.update(eventId, updates);
  }

  async deleteEvent(eventId: string, mode: 'single' | 'series'): Promise<void> {
    const event = await this.calendarEventRepo.findById(eventId);
    if (!event) {
      throw new NotFoundError('Calendar Event', eventId);
    }

    if (mode === 'single') {
      if (event.recurrenceParentId) {
        // Delete this instance only
        await this.calendarEventRepo.delete(eventId);
      } else {
        // Delete standalone event
        await this.calendarEventRepo.delete(eventId);
      }
    } else {
      // Delete series (master + all instances)
      if (event.recurrenceParentId) {
        // Delete parent and all instances
        const parentId = event.recurrenceParentId;
        const instances = await this.calendarEventRepo.findRecurringInstances(parentId);
        for (const instance of instances) {
          await this.calendarEventRepo.delete(instance.id);
        }
        await this.calendarEventRepo.delete(parentId);
      } else {
        // Delete master and all instances
        const instances = await this.calendarEventRepo.findRecurringInstances(eventId);
        for (const instance of instances) {
          await this.calendarEventRepo.delete(instance.id);
        }
        await this.calendarEventRepo.delete(eventId);
      }
    }
  }

  generateRecurringInstances(
    event: CalendarEvent,
    rangeStart: Date,
    rangeEnd: Date
  ): VirtualEventInstance[] {
    if (!event.recurrenceRule) {
      return [];
    }

    const instances: VirtualEventInstance[] = [];
    const timezone = event.timezone;
    const startDt = DateTime.fromJSDate(event.startDatetime, { zone: 'utc' }).setZone(timezone);
    const endDt = DateTime.fromJSDate(event.endDatetime, { zone: 'utc' }).setZone(timezone);
    const duration = endDt.diff(startDt);

    const rangeStartDt = DateTime.fromJSDate(rangeStart, { zone: 'utc' }).setZone(timezone);
    const rangeEndDt = DateTime.fromJSDate(rangeEnd, { zone: 'utc' }).setZone(timezone);

    const rule = event.recurrenceRule;
    const frequency = rule.frequency;
    const interval = rule.interval || 1;
    const endDate = rule.endDate ? DateTime.fromISO(rule.endDate, { zone: timezone }) : null;
    const count = rule.count;

    let current = startDt;
    let instanceCount = 0;
    const maxIterations = 1000; // Safety limit
    let iterations = 0;

    while (current <= rangeEndDt && iterations < maxIterations) {
      iterations++;

      // Check if we've exceeded count limit
      if (count && instanceCount >= count) {
        break;
      }

      // Check if we've exceeded end date
      if (endDate && current > endDate) {
        break;
      }

      // Check if current instance is within range
      if (current >= rangeStartDt && current <= rangeEndDt) {
        const instanceEnd = current.plus(duration);
        instances.push({
          id: `${event.id}-${current.toISO()}`,
          parentId: event.id,
          title: event.title,
          agenda: event.agenda,
          notes: event.notes,
          startDatetime: current.toUTC().toJSDate(),
          endDatetime: instanceEnd.toUTC().toJSDate(),
          timezone: event.timezone,
          status: event.status,
          visibility: event.visibility,
          color: event.color,
          isVirtual: true,
        });
        instanceCount++;
      }

      // Advance to next occurrence
      if (frequency === 'daily') {
        current = current.plus({ days: interval });
      } else if (frequency === 'weekly') {
        if (rule.byDay && rule.byDay.length > 0) {
          // Find next occurrence based on byDay
          const dayMap: Record<string, number> = {
            SU: 0,
            MO: 1,
            TU: 2,
            WE: 3,
            TH: 4,
            FR: 5,
            SA: 6,
          };
          const targetDays = rule.byDay.map((d) => dayMap[d.toUpperCase()]);
          let next = current.plus({ days: 1 });
          let attempts = 0;
          while (attempts < 14) {
            if (targetDays.includes(next.weekday % 7)) {
              current = next;
              break;
            }
            next = next.plus({ days: 1 });
            attempts++;
          }
          if (attempts >= 14) {
            current = current.plus({ weeks: interval });
          }
        } else {
          current = current.plus({ weeks: interval });
        }
      } else if (frequency === 'monthly') {
        if (rule.byMonthDay && rule.byMonthDay.length > 0) {
          // Find next occurrence based on byMonthDay
          const targetDays = rule.byMonthDay;
          let next = current.plus({ months: 1 });
          let attempts = 0;
          while (attempts < 12) {
            if (targetDays.includes(next.day)) {
              current = next;
              break;
            }
            next = next.plus({ months: 1 });
            attempts++;
          }
          if (attempts >= 12) {
            current = current.plus({ months: interval });
          }
        } else {
          current = current.plus({ months: interval });
        }
      } else {
        break; // Unknown frequency
      }
    }

    return instances;
  }

  async getEvents(ownerUserId: string, rangeStart: Date, rangeEnd: Date): Promise<(CalendarEvent | VirtualEventInstance)[]> {
    // Fetch base events
    const baseEvents = await this.calendarEventRepo.findByOwnerUserId(ownerUserId, rangeStart, rangeEnd);

    const allEvents: (CalendarEvent | VirtualEventInstance)[] = [];

    for (const event of baseEvents) {
      if (event.recurrenceRule && !event.recurrenceParentId) {
        // This is a master recurring event, expand it
        const instances = this.generateRecurringInstances(event, rangeStart, rangeEnd);
        allEvents.push(...instances);
      } else if (!event.recurrenceParentId) {
        // Standalone event
        allEvents.push(event);
      }
      // Skip instances (they're generated from masters)
    }

    // Sort by start_datetime
    allEvents.sort((a, b) => a.startDatetime.getTime() - b.startDatetime.getTime());

    return allEvents;
  }

  async validatePublicBooking(slotId: string, start: Date, end: Date): Promise<CalendarEvent> {
    const slot = await this.calendarEventRepo.findById(slotId);
    if (!slot) {
      throw new NotFoundError('Calendar Event', slotId);
    }

    if (slot.status !== 'open_slot') {
      throw new ConflictError('Slot is not available for booking');
    }

    if (slot.visibility !== 'public_open') {
      throw new ConflictError('Slot is not publicly available');
    }

    // Check for overlaps with scheduled/private events
    const overlappingEvents = await this.calendarEventRepo.findByDateRange(start, end);
    const hasOverlap = overlappingEvents.some(
      (e) =>
        e.id !== slotId &&
        e.status !== 'open_slot' &&
        e.visibility === 'private' &&
        this.eventsOverlap(start, end, e.startDatetime, e.endDatetime)
    );

    if (hasOverlap) {
      throw new ConflictError('Time slot overlaps with existing private event');
    }

    // Check if already booked
    // This would require checking booking_requests, but for now we'll just check status
    if (slot.status !== 'open_slot') {
      throw new ConflictError('Slot is already booked');
    }

    return slot;
  }

  async convertOpenSlotToScheduled(slotId: string): Promise<CalendarEvent> {
    const slot = await this.calendarEventRepo.findById(slotId);
    if (!slot) {
      throw new NotFoundError('Calendar Event', slotId);
    }

    if (slot.status !== 'open_slot') {
      throw new BadRequestError('Event is not an open slot');
    }

    return this.calendarEventRepo.update(slotId, { status: 'scheduled' });
  }

  private eventsOverlap(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
    return start1 < end2 && end1 > start2;
  }
}

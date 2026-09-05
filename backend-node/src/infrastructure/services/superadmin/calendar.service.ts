import { injectable, inject } from 'tsyringe';
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';
import { TYPES } from '../../../core/di/types';
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
  constructor(@inject(TYPES.ICalendarEventRepository) private calendarEventRepo: ICalendarEventRepository) {}

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
      recurrenceOriginalStart: null,
      batchId: null,
      color: input.color || null,
    });

    return event;
  }

  /**
   * Create several events in one action (multi-day selection or slot splitting).
   * All created rows share a batchId so they can be managed as a series.
   */
  async createBatch(
    ownerUserId: string,
    input: Omit<CreateEventInput, 'startDatetime' | 'endDatetime' | 'recurrenceRule'>,
    occurrences: Array<{ startDatetime: string; endDatetime: string }>
  ): Promise<CalendarEvent[]> {
    if (occurrences.length === 0) {
      throw new BadRequestError('At least one occurrence is required');
    }
    if (occurrences.length > 200) {
      throw new BadRequestError('Too many occurrences in one batch (max 200)');
    }

    const timezone = input.timezone || 'Asia/Manila';

    // Validate everything before inserting anything
    const parsed = occurrences.map((occ) => {
      const startDt = DateTime.fromISO(occ.startDatetime, { zone: timezone });
      const endDt = DateTime.fromISO(occ.endDatetime, { zone: timezone });
      if (!startDt.isValid || !endDt.isValid) {
        throw new BadRequestError('Invalid datetime format in occurrences');
      }
      if (startDt >= endDt) {
        throw new BadRequestError('Each occurrence must start before it ends');
      }
      return { start: startDt.toUTC().toJSDate(), end: endDt.toUTC().toJSDate() };
    });

    const batchId = parsed.length > 1 ? uuidv4() : null;
    const created: CalendarEvent[] = [];
    for (const occ of parsed) {
      created.push(
        await this.calendarEventRepo.create({
          ownerUserId,
          title: input.title,
          agenda: input.agenda || null,
          notes: input.notes || null,
          startDatetime: occ.start,
          endDatetime: occ.end,
          timezone,
          status: input.status,
          visibility: input.visibility,
          recurrenceRule: null,
          recurrenceParentId: null,
          recurrenceOriginalStart: null,
          batchId,
          color: input.color || null,
        })
      );
    }
    return created;
  }

  async getBatchSize(batchId: string): Promise<number> {
    const events = await this.calendarEventRepo.findByBatchId(batchId);
    return events.length;
  }

  async deleteBatch(batchId: string): Promise<number> {
    return this.calendarEventRepo.deleteByBatchId(batchId);
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
          recurrenceOriginalStart: existingEvent.recurrenceOriginalStart,
          batchId: existingEvent.batchId,
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

  async deleteEvent(eventId: string, mode: 'single' | 'series' | 'batch'): Promise<void> {
    const event = await this.calendarEventRepo.findById(eventId);
    if (!event) {
      throw new NotFoundError('Calendar Event', eventId);
    }

    if (mode === 'batch') {
      // Delete every event created together with this one
      if (event.batchId) {
        await this.calendarEventRepo.deleteByBatchId(event.batchId);
      } else {
        await this.calendarEventRepo.delete(eventId);
      }
      return;
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

    // Times already materialized into concrete child events (booked or moved
    // occurrences) must not also be rendered as virtual instances
    const materializedTimes = new Set(
      baseEvents
        .filter((e) => e.recurrenceParentId)
        .map((e) => `${e.recurrenceParentId}|${(e.recurrenceOriginalStart ?? e.startDatetime).getTime()}`)
    );

    const allEvents: (CalendarEvent | VirtualEventInstance)[] = [];

    for (const event of baseEvents) {
      if (event.recurrenceRule && !event.recurrenceParentId) {
        // This is a master recurring event, expand it
        const instances = this
          .generateRecurringInstances(event, rangeStart, rangeEnd)
          .filter((i) => !materializedTimes.has(`${i.parentId}|${i.startDatetime.getTime()}`));
        allEvents.push(...instances);
      } else {
        // Standalone events AND materialized children (booked/moved occurrences)
        allEvents.push(event);
      }
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

    if (slot.startDatetime.getTime() <= Date.now()) {
      throw new ConflictError('This time has already passed');
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

  /**
   * Virtual recurring instances are offered publicly with ids of the form
   * `<parentUuid>-<startISO>`. Returns null when the id is a plain event uuid.
   */
  static parseInstanceId(id: string): { parentId: string; startISO: string } | null {
    const UUID_LEN = 36;
    if (id.length <= UUID_LEN + 1) return null;
    const parentId = id.slice(0, UUID_LEN);
    const startISO = id.slice(UUID_LEN + 1);
    const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRe.test(parentId)) return null;
    if (!DateTime.fromISO(startISO).isValid) return null;
    return { parentId, startISO };
  }

  /**
   * Turn a virtual recurring instance into a concrete, bookable child event.
   * Idempotent: if a child already exists at that time it is returned (or a
   * conflict is raised when it is no longer an open slot).
   */
  async materializeInstance(instanceId: string): Promise<CalendarEvent> {
    return this.materializeFromInstanceId(instanceId, true);
  }

  /**
   * Superadmin variant: materialize any recurring occurrence (regardless of
   * status/visibility) so it can be edited, moved, or deleted individually.
   */
  async materializeOccurrence(instanceId: string): Promise<CalendarEvent> {
    return this.materializeFromInstanceId(instanceId, false);
  }

  private async materializeFromInstanceId(
    instanceId: string,
    requirePublicBookable: boolean
  ): Promise<CalendarEvent> {
    const parsed = CalendarService.parseInstanceId(instanceId);
    if (!parsed) {
      throw new BadRequestError('Invalid slot instance id');
    }

    const parent = await this.calendarEventRepo.findById(parsed.parentId);
    if (!parent) {
      throw new NotFoundError('Calendar Event', parsed.parentId);
    }
    if (!parent.recurrenceRule || parent.recurrenceParentId) {
      throw new BadRequestError('Slot is not a recurring series');
    }
    if (requirePublicBookable && (parent.status !== 'open_slot' || parent.visibility !== 'public_open')) {
      throw new ConflictError('Slot is not available for booking');
    }

    const start = DateTime.fromISO(parsed.startISO).toUTC();
    if (!start.isValid) {
      throw new BadRequestError('Invalid slot instance time');
    }
    const duration =
      parent.endDatetime.getTime() - parent.startDatetime.getTime();
    const startDate = start.toJSDate();
    const endDate = new Date(startDate.getTime() + duration);

    // The requested time must be one the recurrence rule actually generates.
    const generated = this.generateRecurringInstances(parent, startDate, endDate);
    const isRealInstance = generated.some(
      (i) => i.startDatetime.getTime() === startDate.getTime()
    );
    if (!isRealInstance) {
      throw new ConflictError('Slot is not available for booking');
    }

    // Idempotency: reuse the child already materialized for this occurrence
    // (matched by original rule time - the child may have been moved since)
    const children = await this.calendarEventRepo.findRecurringInstances(parent.id);
    const existingChild = children.find(
      (e) => (e.recurrenceOriginalStart ?? e.startDatetime).getTime() === startDate.getTime()
    );
    if (existingChild) {
      if (requirePublicBookable && existingChild.status !== 'open_slot') {
        throw new ConflictError('Slot is already booked');
      }
      return existingChild;
    }

    return this.calendarEventRepo.create({
      ownerUserId: parent.ownerUserId,
      title: parent.title,
      agenda: parent.agenda,
      notes: parent.notes,
      startDatetime: startDate,
      endDatetime: endDate,
      timezone: parent.timezone,
      status: parent.status,
      visibility: parent.visibility,
      recurrenceRule: null,
      recurrenceParentId: parent.id,
      recurrenceOriginalStart: startDate,
      batchId: null,
      color: parent.color,
    });
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

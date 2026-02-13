import { z } from 'zod';

const RecurrenceRuleSchema = z.object({
  frequency: z.enum(['daily', 'weekly', 'monthly']),
  interval: z.number().int().positive().optional(),
  endDate: z.string().optional(),
  count: z.number().int().positive().optional(),
  byDay: z.array(z.string()).optional(),
  byMonthDay: z.array(z.number().int().min(1).max(31)).optional(),
});

export const CreateCalendarEventDto = z.object({
  title: z.string().min(1).max(255),
  agenda: z.string().optional(),
  notes: z.string().optional(),
  startDatetime: z.string(),
  endDatetime: z.string(),
  timezone: z.string().optional().default('Asia/Manila'),
  status: z.enum(['scheduled', 'completed', 'cancelled', 'open_slot']),
  visibility: z.enum(['private', 'public_open']),
  recurrenceRule: RecurrenceRuleSchema.optional(),
  color: z.string().max(50).optional(),
});

export const UpdateCalendarEventDto = z.object({
  title: z.string().min(1).max(255).optional(),
  agenda: z.string().optional(),
  notes: z.string().optional(),
  startDatetime: z.string().optional(),
  endDatetime: z.string().optional(),
  timezone: z.string().optional(),
  status: z.enum(['scheduled', 'completed', 'cancelled', 'open_slot']).optional(),
  visibility: z.enum(['private', 'public_open']).optional(),
  recurrenceRule: RecurrenceRuleSchema.nullable().optional(),
  color: z.string().max(50).optional(),
});

export const GetEventsRangeDto = z.object({
  start: z.string(),
  end: z.string(),
});

export const DeleteEventModeDto = z.enum(['single', 'series']);

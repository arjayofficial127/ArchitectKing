import { z } from 'zod';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// Recurring slots are offered as virtual instances with ids of the form `<parentUuid>-<startISO>`
const INSTANCE_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-\d{4}-\d{2}-\d{2}T.+$/i;

export const CreateBookingRequestDto = z.object({
  calendarEventId: z
    .string()
    .refine((v) => UUID_RE.test(v) || INSTANCE_ID_RE.test(v), 'Invalid calendar event id'),
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  message: z.string().optional(),
  timezone: z.string().optional(),
});

export const GetScheduleRangeDto = z.object({
  start: z.string(),
  end: z.string(),
});

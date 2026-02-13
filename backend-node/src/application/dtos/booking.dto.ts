import { z } from 'zod';

export const CreateBookingRequestDto = z.object({
  calendarEventId: z.string().uuid(),
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  message: z.string().optional(),
  timezone: z.string().optional(),
});

export const GetScheduleRangeDto = z.object({
  start: z.string(),
  end: z.string(),
});

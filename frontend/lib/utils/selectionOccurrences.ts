import { DateTime } from 'luxon';

export interface OccurrenceInput {
  startDatetime: string;
  endDatetime: string;
}

export interface SelectionPlan {
  /** How a multi-day selection is interpreted */
  mode: 'per-day' | 'continuous';
  /** Split each day's time window into smaller slots */
  split: boolean;
  splitMinutes: number;
  bufferMinutes: number;
}

export const MAX_OCCURRENCES = 200;

/**
 * Expand a date/time selection into concrete event occurrences.
 *
 * - continuous: one event from start date+time to end date+time
 * - per-day: one occurrence per day using the same daily time window
 * - split: within each day's window, generate slots of splitMinutes
 *   separated by bufferMinutes
 */
export function computeOccurrences(
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
  plan: SelectionPlan,
  timezone: string
): OccurrenceInput[] {
  const startDay = DateTime.fromISO(startDate, { zone: timezone }).startOf('day');
  const endDay = DateTime.fromISO(endDate, { zone: timezone }).startOf('day');
  if (!startDay.isValid || !endDay.isValid || endDay < startDay) return [];

  if (plan.mode === 'continuous') {
    const start = DateTime.fromISO(`${startDate}T${startTime}`, { zone: timezone });
    const end = DateTime.fromISO(`${endDate}T${endTime}`, { zone: timezone });
    if (!start.isValid || !end.isValid || end <= start) return [];
    return [{ startDatetime: start.toISO()!, endDatetime: end.toISO()! }];
  }

  const occurrences: OccurrenceInput[] = [];
  for (let day = startDay; day <= endDay; day = day.plus({ days: 1 })) {
    const dayKey = day.toFormat('yyyy-MM-dd');
    const windowStart = DateTime.fromISO(`${dayKey}T${startTime}`, { zone: timezone });
    const windowEnd = DateTime.fromISO(`${dayKey}T${endTime}`, { zone: timezone });
    if (!windowStart.isValid || !windowEnd.isValid || windowEnd <= windowStart) continue;

    if (plan.split && plan.splitMinutes > 0) {
      let cursor = windowStart;
      while (cursor.plus({ minutes: plan.splitMinutes }) <= windowEnd) {
        occurrences.push({
          startDatetime: cursor.toISO()!,
          endDatetime: cursor.plus({ minutes: plan.splitMinutes }).toISO()!,
        });
        cursor = cursor.plus({ minutes: plan.splitMinutes + plan.bufferMinutes });
        if (occurrences.length > MAX_OCCURRENCES) return occurrences;
      }
    } else {
      occurrences.push({
        startDatetime: windowStart.toISO()!,
        endDatetime: windowEnd.toISO()!,
      });
    }
    if (occurrences.length > MAX_OCCURRENCES) return occurrences;
  }
  return occurrences;
}

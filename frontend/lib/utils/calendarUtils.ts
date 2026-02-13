import { DateTime } from 'luxon';

export type ViewMode = 'day' | 'week' | 'biweek' | 'month' | 'year';

/**
 * Get the start and end dates for a view mode
 */
export function getViewRange(viewMode: ViewMode, currentDate: Date, timezone: string): { start: Date; end: Date } {
  const dt = DateTime.fromJSDate(currentDate, { zone: timezone });

  switch (viewMode) {
    case 'day': {
      const start = dt.startOf('day');
      const end = dt.endOf('day');
      return { start: start.toJSDate(), end: end.toJSDate() };
    }
    case 'week': {
      const start = dt.startOf('week');
      const end = dt.endOf('week');
      return { start: start.toJSDate(), end: end.toJSDate() };
    }
    case 'biweek': {
      const start = dt.startOf('week');
      const end = dt.plus({ weeks: 1 }).endOf('week');
      return { start: start.toJSDate(), end: end.toJSDate() };
    }
    case 'month': {
      const start = dt.startOf('month');
      const end = dt.endOf('month');
      return { start: start.toJSDate(), end: end.toJSDate() };
    }
    case 'year': {
      const start = dt.startOf('year');
      const end = dt.endOf('year');
      return { start: start.toJSDate(), end: end.toJSDate() };
    }
    default:
      const start = dt.startOf('day');
      const end = dt.endOf('day');
      return { start: start.toJSDate(), end: end.toJSDate() };
  }
}

/**
 * Format date for display
 */
export function formatDate(date: Date, timezone: string, format: 'short' | 'long' | 'month' | 'year' = 'short'): string {
  const dt = DateTime.fromJSDate(date, { zone: timezone });

  switch (format) {
    case 'short':
      return dt.toFormat('MMM d, yyyy');
    case 'long':
      return dt.toFormat('EEEE, MMMM d, yyyy');
    case 'month':
      return dt.toFormat('MMMM yyyy');
    case 'year':
      return dt.toFormat('yyyy');
    default:
      return dt.toFormat('MMM d, yyyy');
  }
}

/**
 * Format time for display
 */
export function formatTime(date: Date, timezone: string): string {
  const dt = DateTime.fromJSDate(date, { zone: timezone });
  return dt.toFormat('h:mm a');
}

/**
 * Snap time to 30-minute intervals
 */
export function snapToInterval(date: Date, intervalMinutes: number = 30): Date {
  const minutes = date.getMinutes();
  const snappedMinutes = Math.round(minutes / intervalMinutes) * intervalMinutes;
  const snapped = new Date(date);
  snapped.setMinutes(snappedMinutes, 0, 0);
  return snapped;
}

/**
 * Get minutes from midnight for a date
 */
export function getMinutesFromMidnight(date: Date, timezone: string): number {
  const dt = DateTime.fromJSDate(date, { zone: timezone });
  return dt.hour * 60 + dt.minute;
}

/**
 * Get date from minutes from midnight
 */
export function getDateFromMinutes(baseDate: Date, minutes: number, timezone: string): Date {
  const dt = DateTime.fromJSDate(baseDate, { zone: timezone });
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const newDt = dt.set({ hour: hours, minute: mins, second: 0, millisecond: 0 });
  return newDt.toJSDate();
}

/**
 * Get week days for a given date
 */
export function getWeekDays(startDate: Date, timezone: string): Date[] {
  const dt = DateTime.fromJSDate(startDate, { zone: timezone });
  const weekStart = dt.startOf('week');
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(weekStart.plus({ days: i }).toJSDate());
  }
  return days;
}

/**
 * Get bi-week days (14 days)
 */
export function getBiWeekDays(startDate: Date, timezone: string): Date[] {
  const dt = DateTime.fromJSDate(startDate, { zone: timezone });
  const weekStart = dt.startOf('week');
  const days: Date[] = [];
  for (let i = 0; i < 14; i++) {
    days.push(weekStart.plus({ days: i }).toJSDate());
  }
  return days;
}

/**
 * Get month days for a given date
 */
export function getMonthDays(date: Date, timezone: string): Date[] {
  const dt = DateTime.fromJSDate(date, { zone: timezone });
  const monthStart = dt.startOf('month');
  const monthEnd = dt.endOf('month');
  const days: Date[] = [];
  
  // Include days from previous month to fill first week
  const firstDayOfWeek = monthStart.weekday;
  if (firstDayOfWeek !== 1) {
    const prevMonthDays = firstDayOfWeek === 7 ? 0 : firstDayOfWeek - 1;
    for (let i = prevMonthDays; i > 0; i--) {
      days.push(monthStart.minus({ days: i }).toJSDate());
    }
  }
  
  // Add all days of the month
  let current = monthStart;
  while (current <= monthEnd) {
    days.push(current.toJSDate());
    current = current.plus({ days: 1 });
  }
  
  // Fill remaining days to complete last week
  const lastDayOfWeek = monthEnd.weekday;
  const remainingDays = 7 - lastDayOfWeek;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(monthEnd.plus({ days: i }).toJSDate());
  }
  
  return days;
}

/**
 * Get year months
 */
export function getYearMonths(date: Date, timezone: string): Date[] {
  const dt = DateTime.fromJSDate(date, { zone: timezone });
  const yearStart = dt.startOf('year');
  const months: Date[] = [];
  for (let i = 0; i < 12; i++) {
    months.push(yearStart.plus({ months: i }).toJSDate());
  }
  return months;
}

/**
 * Check if two date ranges overlap
 */
export function rangesOverlap(
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date
): boolean {
  return start1 < end2 && end1 > start2;
}

/**
 * Get events for a specific day
 */
export function getEventsForDay(events: any[], day: Date, timezone: string): any[] {
  const dayStart = DateTime.fromJSDate(day, { zone: timezone }).startOf('day').toJSDate();
  const dayEnd = DateTime.fromJSDate(day, { zone: timezone }).endOf('day').toJSDate();
  
  return events.filter((event) => {
    const eventStart = new Date(event.startDatetime);
    const eventEnd = new Date(event.endDatetime);
    return rangesOverlap(dayStart, dayEnd, eventStart, eventEnd);
  });
}

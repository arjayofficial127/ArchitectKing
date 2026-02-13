'use client';

import { DateTime } from 'luxon';
import type { CalendarEvent } from '@/lib/api/superadmin';
import { getYearMonths, getEventsForDay, formatDate } from '@/lib/utils/calendarUtils';

interface YearViewProps {
  date: Date;
  events: CalendarEvent[];
  onMonthClick: (date: Date) => void;
  timezone: string;
}

export function YearView({ date, events, onMonthClick, timezone }: YearViewProps) {
  const yearMonths = getYearMonths(date, timezone);
  const dt = DateTime.fromJSDate(date, { zone: timezone });

  const getEventCountForMonth = (monthDate: Date) => {
    const monthStart = DateTime.fromJSDate(monthDate, { zone: timezone }).startOf('month').toJSDate();
    const monthEnd = DateTime.fromJSDate(monthDate, { zone: timezone }).endOf('month').toJSDate();

    return events.filter((event) => {
      const eventStart = new Date(event.startDatetime);
      const eventEnd = new Date(event.endDatetime);
      return eventStart < monthEnd && eventEnd > monthStart;
    }).length;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Year Header */}
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">{formatDate(date, timezone, 'year')}</h3>
      </div>

      {/* Month Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
        {yearMonths.map((month, index) => {
          const monthDt = DateTime.fromJSDate(month, { zone: timezone });
          const eventCount = getEventCountForMonth(month);
          const isCurrentMonth = monthDt.hasSame(DateTime.now().setZone(timezone), 'month');

          return (
            <div
              key={index}
              onClick={() => onMonthClick(month)}
              className={`p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                isCurrentMonth ? 'bg-blue-50 border-blue-300' : ''
              }`}
            >
              <div className={`text-sm font-semibold mb-2 ${isCurrentMonth ? 'text-blue-600' : 'text-gray-900'}`}>
                {monthDt.toFormat('MMMM')}
              </div>
              <div className="text-xs text-gray-600">
                {eventCount} {eventCount === 1 ? 'event' : 'events'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

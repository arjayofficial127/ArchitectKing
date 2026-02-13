'use client';

import { DateTime } from 'luxon';
import type { CalendarEvent } from '@/lib/api/superadmin';
import { getMonthDays, getEventsForDay, formatDate } from '@/lib/utils/calendarUtils';
import { getCalendarEventColor } from '@/config/superadminColors';

interface MonthViewProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDayClick: (date: Date) => void;
  timezone: string;
}

export function MonthView({ date, events, onEventClick, onDayClick, timezone }: MonthViewProps) {
  const monthDays = getMonthDays(date, timezone);
  const dt = DateTime.fromJSDate(date, { zone: timezone });
  const today = DateTime.now().setZone(timezone);

  // Group days into weeks
  const weeks: Date[][] = [];
  for (let i = 0; i < monthDays.length; i += 7) {
    weeks.push(monthDays.slice(i, i + 7));
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Month Header */}
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">{formatDate(date, timezone, 'month')}</h3>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-200 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {monthDays.map((day, index) => {
          const dayDt = DateTime.fromJSDate(day, { zone: timezone });
          const isToday = dayDt.hasSame(today, 'day');
          const isCurrentMonth = dayDt.hasSame(dt, 'month');
          const dayEvents = getEventsForDay(events, day, timezone);
          const displayEvents = dayEvents.slice(0, 3);
          const moreCount = dayEvents.length - 3;

          return (
            <div
              key={index}
              onClick={() => onDayClick(day)}
              className={`min-h-[120px] border-r border-b border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                !isCurrentMonth ? 'bg-gray-50 opacity-50' : ''
              } ${isToday ? 'bg-blue-50' : ''}`}
            >
              <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}`}>
                {dayDt.day}
              </div>
              <div className="space-y-1">
                {displayEvents.map((event) => {
                  const color = getCalendarEventColor(event.status, event.color);
                  return (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className="text-xs px-2 py-1 rounded truncate cursor-pointer hover:shadow-sm transition-shadow border-l-2"
                      style={{
                        backgroundColor: `${color}20`,
                        borderLeftColor: color,
                      }}
                    >
                      {event.title}
                    </div>
                  );
                })}
                {moreCount > 0 && (
                  <div className="text-xs text-gray-500 px-2">+{moreCount} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

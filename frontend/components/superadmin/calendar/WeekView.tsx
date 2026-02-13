'use client';

import { useState, useRef, useCallback } from 'react';
import { DateTime } from 'luxon';
import type { CalendarEvent } from '@/lib/api/superadmin';
import { getWeekDays, getMinutesFromMidnight, getDateFromMinutes, formatTime } from '@/lib/utils/calendarUtils';
import { getCalendarEventColor } from '@/config/superadminColors';

interface WeekViewProps {
  startDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onSlotClick: (start: Date, end: Date) => void;
  openSlotMode: boolean;
  timezone: string;
}

export function WeekView({ startDate, events, onEventClick, onSlotClick, openSlotMode, timezone }: WeekViewProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ day: number; minutes: number } | null>(null);
  const [dragEnd, setDragEnd] = useState<{ day: number; minutes: number } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const weekDays = getWeekDays(startDate, timezone);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, dayIndex: number, minutes: number) => {
      if (e.button !== 0) return;
      setIsDragging(true);
      const snapped = Math.round(minutes / 30) * 30;
      setDragStart({ day: dayIndex, minutes: snapped });
      setDragEnd({ day: dayIndex, minutes: snapped });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !dragStart || !gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dayWidth = rect.width / 7;
      const dayIndex = Math.max(0, Math.min(6, Math.floor(x / dayWidth)));
      const hourHeight = rect.height / 24;
      const minutes = Math.max(0, Math.min(24 * 60 - 1, (y / hourHeight) * 60));
      const snapped = Math.round(minutes / 30) * 30;

      setDragEnd({ day: dayIndex, minutes: snapped });
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging && dragStart && dragEnd) {
      const startDay = weekDays[Math.min(dragStart.day, dragEnd.day)];
      const endDay = weekDays[Math.max(dragStart.day, dragEnd.day)];
      const startMinutes = Math.min(dragStart.minutes, dragEnd.minutes);
      const endMinutes = Math.max(dragStart.minutes, dragEnd.minutes);

      const start = getDateFromMinutes(startDay, startMinutes, timezone);
      const end = getDateFromMinutes(endDay, endMinutes, timezone);
      onSlotClick(start, end);
    }
    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
  }, [isDragging, dragStart, dragEnd, weekDays, timezone, onSlotClick]);

  const handleSlotClick = (dayIndex: number, minutes: number) => {
    const day = weekDays[dayIndex];
    const start = getDateFromMinutes(day, minutes, timezone);
    const end = getDateFromMinutes(day, minutes + 30, timezone);
    onSlotClick(start, end);
  };

  const getEventsForDay = (day: Date) => {
    const dayStart = DateTime.fromJSDate(day, { zone: timezone }).startOf('day').toJSDate();
    const dayEnd = DateTime.fromJSDate(day, { zone: timezone }).endOf('day').toJSDate();

    return events.filter((event) => {
      const eventStart = new Date(event.startDatetime);
      const eventEnd = new Date(event.endDatetime);
      return eventStart < dayEnd && eventEnd > dayStart;
    });
  };

  const getEventPosition = (event: CalendarEvent, day: Date) => {
    const eventStart = DateTime.fromISO(event.startDatetime, { zone: event.timezone || timezone });
    const dayStartDt = DateTime.fromJSDate(day, { zone: timezone }).startOf('day');
    const eventEnd = DateTime.fromISO(event.endDatetime, { zone: event.timezone || timezone });

    const startMinutes = eventStart.diff(dayStartDt, 'minutes').minutes;
    const durationMinutes = eventEnd.diff(eventStart, 'minutes').minutes;

    const topPercent = (startMinutes / (24 * 60)) * 100;
    const heightPercent = (durationMinutes / (24 * 60)) * 100;

    return { top: `${topPercent}%`, height: `${heightPercent}%` };
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Week Header */}
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-7">
          <div className="p-2 border-r border-gray-200 bg-gray-50"></div>
          {weekDays.map((day, index) => {
            const dt = DateTime.fromJSDate(day, { zone: timezone });
            const isToday = dt.hasSame(DateTime.now().setZone(timezone), 'day');
            return (
              <div
                key={index}
                className={`p-2 border-r border-gray-200 text-center ${isToday ? 'bg-blue-50' : 'bg-gray-50'}`}
              >
                <div className="text-xs text-gray-600">{dt.toFormat('EEE')}</div>
                <div className={`text-lg font-semibold ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                  {dt.day}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Grid */}
      <div
        ref={gridRef}
        className="relative overflow-x-auto"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ height: '800px' }}
      >
        {/* Hour Lines */}
        <div className="absolute inset-0">
          {Array.from({ length: 24 }, (_, hour) => (
            <div
              key={hour}
              className="absolute border-t border-gray-200"
              style={{ top: `${(hour / 24) * 100}%`, width: '100%' }}
            />
          ))}
        </div>

        {/* Day Columns */}
        <div className="absolute inset-0 pl-16 grid grid-cols-7">
          {weekDays.map((day, dayIndex) => {
            const dayEvents = getEventsForDay(day);
            const dayStart = DateTime.fromJSDate(day, { zone: timezone }).startOf('day').toJSDate();

            return (
              <div key={dayIndex} className="relative border-r border-gray-200">
                {/* Clickable Slots */}
                {Array.from({ length: 48 }, (_, i) => {
                  const minutes = i * 30;
                  const topPercent = (minutes / (24 * 60)) * 100;
                  return (
                    <div
                      key={i}
                      onMouseDown={(e) => handleMouseDown(e, dayIndex, minutes)}
                      onClick={() => handleSlotClick(dayIndex, minutes)}
                      className={`absolute cursor-pointer hover:bg-blue-50 transition-colors ${
                        openSlotMode ? 'bg-amber-50 opacity-50' : ''
                      }`}
                      style={{
                        top: `${topPercent}%`,
                        height: `${(30 / (24 * 60)) * 100}%`,
                        width: '100%',
                      }}
                    />
                  );
                })}

                {/* Events */}
                {dayEvents.map((event, eventIndex) => {
                  const position = getEventPosition(event, day);
                  const color = getCalendarEventColor(event.status, event.color);
                  const overlappingEvents = dayEvents.filter(
                    (e, idx) =>
                      idx < eventIndex &&
                      rangesOverlap(
                        new Date(event.startDatetime),
                        new Date(event.endDatetime),
                        new Date(e.startDatetime),
                        new Date(e.endDatetime)
                      )
                  );
                  const offset = overlappingEvents.length * 5;

                  return (
                    <div
                      key={event.id}
                      onClick={() => onEventClick(event)}
                      className="absolute rounded px-2 py-1 text-xs cursor-pointer hover:shadow-md transition-shadow border-l-2"
                      style={{
                        ...position,
                        left: `${offset}%`,
                        width: `${100 - offset}%`,
                        backgroundColor: `${color}20`,
                        borderLeftColor: color,
                        color: '#111',
                        zIndex: 10,
                      }}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="text-gray-600">
                        {formatTime(new Date(event.startDatetime), timezone)}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Drag Selection */}
        {isDragging && dragStart && dragEnd && (
          <div
            className="absolute bg-blue-200 opacity-50 border border-blue-400 z-20"
            style={{
              left: `${(Math.min(dragStart.day, dragEnd.day) / 7) * 100 + 16 / 7}%`,
              width: `${(Math.abs(dragEnd.day - dragStart.day) + 1) / 7 * 100}%`,
              top: `${(Math.min(dragStart.minutes, dragEnd.minutes) / (24 * 60)) * 100}%`,
              height: `${(Math.abs(dragEnd.minutes - dragStart.minutes) / (24 * 60)) * 100}%`,
            }}
          />
        )}

        {/* Time Labels */}
        <div className="absolute left-0 top-0 bottom-0 w-16 border-r border-gray-200 bg-gray-50">
          {Array.from({ length: 24 }, (_, hour) => (
            <div
              key={hour}
              className="absolute text-xs text-gray-600 px-2"
              style={{ top: `${(hour / 24) * 100}%` }}
            >
              {hour.toString().padStart(2, '0')}:00
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function rangesOverlap(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
  return start1 < end2 && end1 > start2;
}

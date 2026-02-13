'use client';

import { useState, useRef, useCallback } from 'react';
import { DateTime } from 'luxon';
import type { CalendarEvent } from '@/lib/api/superadmin';
import { getMinutesFromMidnight, getDateFromMinutes, snapToInterval, formatTime } from '@/lib/utils/calendarUtils';
import { getCalendarEventColor } from '@/config/superadminColors';

interface DayViewProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onSlotClick: (start: Date, end: Date) => void;
  openSlotMode: boolean;
  timezone: string;
}

export function DayView({ date, events, onEventClick, onSlotClick, openSlotMode, timezone }: DayViewProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragEnd, setDragEnd] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const dt = DateTime.fromJSDate(date, { zone: timezone });
  const dayStart = dt.startOf('day').toJSDate();
  const dayEnd = dt.endOf('day').toJSDate();

  // Filter events for this day
  const dayEvents = events.filter((event) => {
    const eventStart = new Date(event.startDatetime);
    const eventEnd = new Date(event.endDatetime);
    return eventStart < dayEnd && eventEnd > dayStart;
  });

  // Generate 24 hours with 30-minute intervals
  const timeSlots: number[] = [];
  for (let hour = 0; hour < 24; hour++) {
    timeSlots.push(hour * 60); // Top of hour
    timeSlots.push(hour * 60 + 30); // Half hour
  }

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, minutes: number) => {
      if (e.button !== 0) return; // Only left click
      setIsDragging(true);
      const snapped = Math.round(minutes / 30) * 30;
      setDragStart(snapped);
      setDragEnd(snapped);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || dragStart === null || !gridRef.current) return;

      const rect = gridRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const hourHeight = rect.height / 24;
      const minutes = Math.max(0, Math.min(24 * 60 - 1, (y / hourHeight) * 60));
      const snapped = Math.round(minutes / 30) * 30;
      setDragEnd(snapped);
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging && dragStart !== null && dragEnd !== null) {
      const startMinutes = Math.min(dragStart, dragEnd);
      const endMinutes = Math.max(dragStart, dragEnd);
      
      if (endMinutes > startMinutes) {
        const start = getDateFromMinutes(dayStart, startMinutes, timezone);
        const end = getDateFromMinutes(dayStart, endMinutes, timezone);
        onSlotClick(start, end);
      }
    }
    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);
  }, [isDragging, dragStart, dragEnd, dayStart, timezone, onSlotClick]);

  const handleSlotClick = (minutes: number) => {
    const start = getDateFromMinutes(dayStart, minutes, timezone);
    const end = getDateFromMinutes(dayStart, minutes + 30, timezone);
    onSlotClick(start, end);
  };

  const getEventPosition = (event: CalendarEvent) => {
    const eventStart = DateTime.fromISO(event.startDatetime, { zone: event.timezone || timezone });
    const eventEnd = DateTime.fromISO(event.endDatetime, { zone: event.timezone || timezone });
    const dayStartDt = DateTime.fromJSDate(dayStart, { zone: timezone });

    const startMinutes = eventStart.diff(dayStartDt, 'minutes').minutes;
    const durationMinutes = eventEnd.diff(eventStart, 'minutes').minutes;

    const topPercent = (startMinutes / (24 * 60)) * 100;
    const heightPercent = (durationMinutes / (24 * 60)) * 100;

    return { top: `${topPercent}%`, height: `${heightPercent}%` };
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Day Header */}
      <div className="border-b border-gray-200 p-4 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">
          {dt.toFormat('EEEE, MMMM d, yyyy')}
        </h3>
      </div>

      {/* Time Grid */}
      <div
        ref={gridRef}
        className="relative"
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
            >
              <div className="absolute left-0 -mt-3 text-xs text-gray-500 px-2">
                {hour.toString().padStart(2, '0')}:00
              </div>
            </div>
          ))}
        </div>

        {/* 30-minute dividers */}
        <div className="absolute inset-0">
          {Array.from({ length: 48 }, (_, i) => {
            if (i % 2 === 0) return null; // Skip hour lines
            return (
              <div
                key={i}
                className="absolute border-t border-gray-100"
                style={{ top: `${(i / 48) * 100}%`, width: '100%' }}
              />
            );
          })}
        </div>

        {/* Clickable Slots */}
        <div className="absolute inset-0 pl-16">
          {timeSlots.map((minutes) => {
            const hour = Math.floor(minutes / 60);
            const min = minutes % 60;
            const topPercent = (minutes / (24 * 60)) * 100;
            return (
              <div
                key={minutes}
                onClick={() => handleSlotClick(minutes)}
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
        </div>

        {/* Drag Selection */}
        {isDragging && dragStart !== null && dragEnd !== null && (
          <div
            className="absolute left-16 right-0 bg-blue-200 opacity-50 border border-blue-400 z-10"
            style={{
              top: `${(Math.min(dragStart, dragEnd) / (24 * 60)) * 100}%`,
              height: `${(Math.abs(dragEnd - dragStart) / (24 * 60)) * 100}%`,
            }}
          />
        )}

        {/* Events */}
        <div className="absolute inset-0 pl-16">
          {dayEvents.map((event, index) => {
            const position = getEventPosition(event);
            const color = getCalendarEventColor(event.status, event.color);
            const isOverlapping = dayEvents.filter(
              (e) => e.id !== event.id && rangesOverlap(
                new Date(event.startDatetime),
                new Date(event.endDatetime),
                new Date(e.startDatetime),
                new Date(e.endDatetime)
              )
            ).length > 0;

            return (
              <div
                key={event.id}
                onClick={() => onEventClick(event)}
                className="absolute rounded px-2 py-1 text-xs cursor-pointer hover:shadow-md transition-shadow border-l-2"
                style={{
                  ...position,
                  left: isOverlapping ? `${index * 5}%` : '0',
                  width: isOverlapping ? '95%' : '100%',
                  backgroundColor: `${color}20`,
                  borderLeftColor: color,
                  color: '#111',
                  zIndex: 10,
                }}
              >
                <div className="font-medium truncate">{event.title}</div>
                <div className="text-gray-600">
                  {formatTime(new Date(event.startDatetime), timezone)} -{' '}
                  {formatTime(new Date(event.endDatetime), timezone)}
                </div>
              </div>
            );
          })}
        </div>

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

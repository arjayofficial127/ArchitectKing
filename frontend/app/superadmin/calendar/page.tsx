'use client';

import { useState, useEffect, useMemo } from 'react';
import { DateTime } from 'luxon';
import { useCalendar } from '@/hooks/superadmin/useCalendar';
import { EventModal } from '@/components/superadmin/calendar/EventModal';
import { DayView } from '@/components/superadmin/calendar/DayView';
import { WeekView } from '@/components/superadmin/calendar/WeekView';
import { BiWeekView } from '@/components/superadmin/calendar/BiWeekView';
import { MonthView } from '@/components/superadmin/calendar/MonthView';
import { YearView } from '@/components/superadmin/calendar/YearView';
import { getViewRange, type ViewMode, formatDate } from '@/lib/utils/calendarUtils';
import type { CalendarEvent, CreateCalendarEventInput, UpdateCalendarEventInput, BulkCreateCalendarEventsInput } from '@/lib/api/superadmin';
import { toast } from '@/lib/toast';

export default function SuperAdminCalendarPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openSlotMode, setOpenSlotMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [initialStart, setInitialStart] = useState<Date | undefined>();
  const [initialEnd, setInitialEnd] = useState<Date | undefined>();
  const [batchSize, setBatchSize] = useState<number | undefined>();
  const timezone = 'Asia/Manila';

  const { start, end } = useMemo(() => getViewRange(viewMode, currentDate, timezone), [viewMode, currentDate, timezone]);
  const startISO = start.toISOString();
  const endISO = end.toISOString();

  const { events, loading, error, fetchEvents, createEvent, createEventsBulk, getBatchSize, materializeOccurrence, updateEvent, deleteEvent } = useCalendar(startISO, endISO);

  // ---- Direct grid interactions (drag-move, resize, context menu) ----

  const isVirtualInstance = (event: CalendarEvent): boolean =>
    (event as any).isVirtual === true || event.id.length > 36;

  const utcToZonedISO = (utcIso: string): string => {
    const iso = DateTime.fromISO(utcIso, { zone: 'utc' }).setZone(timezone).toISO();
    if (!iso) throw new Error('Invalid datetime');
    return iso;
  };

  const dateToZonedISO = (date: Date): string => {
    const iso = DateTime.fromJSDate(date).setZone(timezone).toISO();
    if (!iso) throw new Error('Invalid datetime');
    return iso;
  };

  /** Virtual recurring occurrences must become concrete rows before editing. */
  const resolveConcreteId = async (event: CalendarEvent, promptText: string): Promise<string | null> => {
    if (!isVirtualInstance(event)) return event.id;
    if (!window.confirm(promptText)) return null;
    const concrete = await materializeOccurrence(event.id);
    return concrete.id;
  };

  const handleEventTimesChange = async (
    event: CalendarEvent,
    newStart: Date,
    newEnd: Date,
    kind: 'move' | 'resize'
  ) => {
    try {
      const id = await resolveConcreteId(
        event,
        'This is one occurrence of a recurring series. Change only this occurrence?'
      );
      if (!id) return;
      const prevStart = utcToZonedISO(event.startDatetime);
      const prevEnd = utcToZonedISO(event.endDatetime);
      await updateEvent(
        id,
        { startDatetime: dateToZonedISO(newStart), endDatetime: dateToZonedISO(newEnd), timezone },
        'single'
      );
      const when = DateTime.fromJSDate(newStart).setZone(timezone).toFormat('ccc, MMM d h:mm a');
      toast(`${kind === 'move' ? 'Moved' : 'Resized'} "${event.title}" — ${when}`, 'success', 6000, {
        label: 'Undo',
        onClick: () => {
          updateEvent(id, { startDatetime: prevStart, endDatetime: prevEnd, timezone }, 'single').catch(() =>
            toast('Undo failed', 'error')
          );
        },
      });
    } catch (err: any) {
      toast(err.message || 'Failed to update event', 'error');
    }
  };

  const handleEventDuplicate = async (event: CalendarEvent) => {
    try {
      await createEvent({
        title: event.title,
        agenda: event.agenda || undefined,
        notes: event.notes || undefined,
        startDatetime: utcToZonedISO(event.startDatetime),
        endDatetime: utcToZonedISO(event.endDatetime),
        timezone,
        status: event.status,
        visibility: event.visibility,
        color: event.color || undefined,
      });
      toast('Duplicated — drag the copy to reposition', 'success');
    } catch (err: any) {
      toast(err.message || 'Failed to duplicate event', 'error');
    }
  };

  const handleEventToggleOpenSlot = async (event: CalendarEvent) => {
    try {
      const makingOpen = event.status !== 'open_slot';
      const id = await resolveConcreteId(
        event,
        'This is one occurrence of a recurring series. Convert only this occurrence?'
      );
      if (!id) return;
      const prev = { status: event.status, visibility: event.visibility };
      await updateEvent(
        id,
        makingOpen
          ? { status: 'open_slot', visibility: 'public_open' }
          : { status: 'scheduled', visibility: 'private' },
        'single'
      );
      toast(makingOpen ? 'Converted to bookable open slot' : 'Converted to private event', 'success', 6000, {
        label: 'Undo',
        onClick: () => {
          updateEvent(id, prev, 'single').catch(() => toast('Undo failed', 'error'));
        },
      });
    } catch (err: any) {
      toast(err.message || 'Failed to convert event', 'error');
    }
  };

  const handleEventQuickDelete = async (event: CalendarEvent) => {
    try {
      if (isVirtualInstance(event)) {
        if (!window.confirm('Remove this occurrence from the series? It will no longer be offered.')) return;
        const concrete = await materializeOccurrence(event.id);
        await updateEvent(concrete.id, { status: 'cancelled', visibility: 'private' }, 'single');
        toast('Occurrence cancelled', 'success');
        return;
      }
      const confirmText = event.recurrenceParentId
        ? 'Delete this occurrence? The recurring series will offer this time again.'
        : `Delete "${event.title}"?`;
      if (!window.confirm(confirmText)) return;

      const snapshot: CreateCalendarEventInput | null = event.recurrenceParentId
        ? null
        : {
            title: event.title,
            agenda: event.agenda || undefined,
            notes: event.notes || undefined,
            startDatetime: utcToZonedISO(event.startDatetime),
            endDatetime: utcToZonedISO(event.endDatetime),
            timezone,
            status: event.status,
            visibility: event.visibility,
            recurrenceRule: (event.recurrenceRule as CreateCalendarEventInput['recurrenceRule']) || undefined,
            color: event.color || undefined,
          };
      await deleteEvent(event.id, 'single');
      if (snapshot) {
        toast(`Deleted "${event.title}"`, 'success', 6000, {
          label: 'Undo',
          onClick: () => {
            createEvent(snapshot).catch(() => toast('Undo failed', 'error'));
          },
        });
      } else {
        toast(`Deleted "${event.title}"`, 'success');
      }
    } catch (err: any) {
      toast(err.message || 'Failed to delete event', 'error');
    }
  };

  // Navigate dates
  const navigateDate = (direction: 'prev' | 'next') => {
    const dt = DateTime.fromJSDate(currentDate, { zone: timezone });
    let newDate: Date;

    switch (viewMode) {
      case 'day':
        newDate = dt.plus({ days: direction === 'next' ? 1 : -1 }).toJSDate();
        break;
      case 'week':
        newDate = dt.plus({ weeks: direction === 'next' ? 1 : -1 }).toJSDate();
        break;
      case 'biweek':
        newDate = dt.plus({ weeks: direction === 'next' ? 2 : -2 }).toJSDate();
        break;
      case 'month':
        newDate = dt.plus({ months: direction === 'next' ? 1 : -1 }).toJSDate();
        break;
      case 'year':
        newDate = dt.plus({ years: direction === 'next' ? 1 : -1 }).toJSDate();
        break;
      default:
        newDate = currentDate;
    }

    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleSlotClick = (start: Date, end: Date) => {
    setInitialStart(start);
    setInitialEnd(end);
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setInitialStart(undefined);
    setInitialEnd(undefined);
    setBatchSize(undefined);
    if (event.batchId) {
      getBatchSize(event.batchId).then((size) => setBatchSize(size || undefined));
    }
    setIsModalOpen(true);
  };

  const handleSaveBulk = async (data: BulkCreateCalendarEventsInput) => {
    await createEventsBulk(data);
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSave = async (
    data: CreateCalendarEventInput | UpdateCalendarEventInput,
    mode?: 'single' | 'series'
  ) => {
    if (selectedEvent) {
      await updateEvent(selectedEvent.id, data as UpdateCalendarEventInput, mode || 'single');
    } else {
      await createEvent(data as CreateCalendarEventInput);
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleDelete = async (mode: 'single' | 'series' | 'batch') => {
    if (selectedEvent) {
      await deleteEvent(selectedEvent.id, mode);
      setIsModalOpen(false);
      setSelectedEvent(null);
    }
  };

  const handleDayClick = (date: Date) => {
    setCurrentDate(date);
    setViewMode('day');
  };

  const handleMonthClick = (date: Date) => {
    setCurrentDate(date);
    setViewMode('month');
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* View Selector */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'day'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('biweek')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'biweek'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bi-Weekly
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('year')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'year'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Year
            </button>
          </div>

          {/* Date Navigation */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigateDate('prev')}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Today
            </button>
            <button
              onClick={() => navigateDate('next')}
              className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Open Slot Mode Toggle */}
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={openSlotMode}
                onChange={(e) => setOpenSlotMode(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">Open Slot Mode</span>
            </label>
          </div>

          {/* Add Event Button */}
          <button
            onClick={() => {
              setSelectedEvent(null);
              setInitialStart(undefined);
              setInitialEnd(undefined);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            + Add Event
          </button>
        </div>

        {/* Timezone Label */}
        <div className="mt-3 text-sm text-gray-600">
          Timezone: <span className="font-medium">{timezone}</span>
        </div>
      </div>

      {/* Calendar View */}
      {loading && (
        <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
          <div className="text-gray-600">Loading events...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className={openSlotMode ? 'opacity-90' : ''}>
          {viewMode === 'day' && (
            <DayView
              date={currentDate}
              events={events}
              onEventClick={handleEventClick}
              onSlotClick={handleSlotClick}
              onEventTimesChange={handleEventTimesChange}
              onEventDuplicate={handleEventDuplicate}
              onEventToggleOpenSlot={handleEventToggleOpenSlot}
              onEventDelete={handleEventQuickDelete}
              openSlotMode={openSlotMode}
              timezone={timezone}
            />
          )}
          {viewMode === 'week' && (
            <WeekView
              startDate={currentDate}
              events={events}
              onEventClick={handleEventClick}
              onSlotClick={handleSlotClick}
              onEventTimesChange={handleEventTimesChange}
              onEventDuplicate={handleEventDuplicate}
              onEventToggleOpenSlot={handleEventToggleOpenSlot}
              onEventDelete={handleEventQuickDelete}
              openSlotMode={openSlotMode}
              timezone={timezone}
            />
          )}
          {viewMode === 'biweek' && (
            <BiWeekView
              startDate={currentDate}
              events={events}
              onEventClick={handleEventClick}
              onSlotClick={handleSlotClick}
              onEventTimesChange={handleEventTimesChange}
              onEventDuplicate={handleEventDuplicate}
              onEventToggleOpenSlot={handleEventToggleOpenSlot}
              onEventDelete={handleEventQuickDelete}
              openSlotMode={openSlotMode}
              timezone={timezone}
            />
          )}
          {viewMode === 'month' && (
            <MonthView
              date={currentDate}
              events={events}
              onEventClick={handleEventClick}
              onDayClick={handleDayClick}
              timezone={timezone}
            />
          )}
          {viewMode === 'year' && (
            <YearView
              date={currentDate}
              events={events}
              onMonthClick={handleMonthClick}
              timezone={timezone}
            />
          )}
        </div>
      )}

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
          setInitialStart(undefined);
          setInitialEnd(undefined);
        }}
        event={selectedEvent}
        initialStart={initialStart}
        initialEnd={initialEnd}
        openSlotMode={openSlotMode}
        onSave={handleSave}
        onSaveBulk={handleSaveBulk}
        onDelete={selectedEvent ? handleDelete : undefined}
        batchSize={batchSize}
      />
    </div>
  );
}

'use client';

import { useState, useEffect, useMemo } from 'react';
import { DateTime } from 'luxon';
import type { CalendarEvent, CreateCalendarEventInput, UpdateCalendarEventInput, BulkCreateCalendarEventsInput } from '@/lib/api/superadmin';
import { formatTime, snapToInterval } from '@/lib/utils/calendarUtils';
import { computeOccurrences, MAX_OCCURRENCES } from '@/lib/utils/selectionOccurrences';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: CalendarEvent | null;
  initialStart?: Date;
  initialEnd?: Date;
  openSlotMode: boolean;
  onSave: (data: CreateCalendarEventInput | UpdateCalendarEventInput, mode?: 'single' | 'series') => Promise<void>;
  onSaveBulk?: (data: BulkCreateCalendarEventsInput) => Promise<void>;
  onDelete?: (mode: 'single' | 'series' | 'batch') => Promise<void>;
  /** Number of events sharing this event's batch (for the delete-series prompt) */
  batchSize?: number;
}

export function EventModal({
  isOpen,
  onClose,
  event,
  initialStart,
  initialEnd,
  openSlotMode,
  onSave,
  onSaveBulk,
  onDelete,
  batchSize,
}: EventModalProps) {
  const timezone = 'Asia/Manila';
  const [title, setTitle] = useState('');
  const [agenda, setAgenda] = useState('');
  const [notes, setNotes] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState<30 | 60 | 90 | 120>(60);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceFrequency, setRecurrenceFrequency] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [recurrenceInterval, setRecurrenceInterval] = useState(1);
  const [recurrenceEndDate, setRecurrenceEndDate] = useState('');
  const [recurrenceCount, setRecurrenceCount] = useState<number | undefined>();
  const [editMode, setEditMode] = useState<'single' | 'series' | undefined>(undefined);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteMode, setDeleteMode] = useState<'single' | 'series' | 'batch'>('single');
  const [loading, setLoading] = useState(false);
  // Multi-day / split interpretation of the selection (create mode only)
  const [multiMode, setMultiMode] = useState<'per-day' | 'continuous'>('per-day');
  const [splitEnabled, setSplitEnabled] = useState(false);
  const [splitMinutes, setSplitMinutes] = useState(60);
  const [bufferMinutes, setBufferMinutes] = useState(0);

  // Initialize form from event or initial times
  useEffect(() => {
    if (event) {
      const start = DateTime.fromISO(event.startDatetime, { zone: event.timezone || timezone });
      const end = DateTime.fromISO(event.endDatetime, { zone: event.timezone || timezone });
      
      setTitle(event.title);
      setAgenda(event.agenda || '');
      setNotes(event.notes || '');
      setStartDate(start.toFormat('yyyy-MM-dd'));
      setStartTime(start.toFormat('HH:mm'));
      setEndDate(end.toFormat('yyyy-MM-dd'));
      setEndTime(end.toFormat('HH:mm'));
      setIsRecurring(!!event.recurrenceRule);
      
      if (event.recurrenceRule) {
        setRecurrenceFrequency(event.recurrenceRule.frequency || 'weekly');
        setRecurrenceInterval(event.recurrenceRule.interval || 1);
        if (event.recurrenceRule.endDate) {
          setRecurrenceEndDate(event.recurrenceRule.endDate);
        }
        if (event.recurrenceRule.count) {
          setRecurrenceCount(event.recurrenceRule.count);
        }
      }
    } else if (initialStart && initialEnd) {
      const start = DateTime.fromJSDate(initialStart, { zone: timezone });
      const end = DateTime.fromJSDate(initialEnd, { zone: timezone });
      
      setTitle(openSlotMode ? 'Available' : '');
      setStartDate(start.toFormat('yyyy-MM-dd'));
      setStartTime(start.toFormat('HH:mm'));
      setEndDate(end.toFormat('yyyy-MM-dd'));
      setEndTime(end.toFormat('HH:mm'));
    } else {
      // New event - default to now
      const now = DateTime.now().setZone(timezone);
      const defaultEnd = now.plus({ hours: 1 });
      setStartDate(now.toFormat('yyyy-MM-dd'));
      setStartTime(now.toFormat('HH:mm'));
      setEndDate(defaultEnd.toFormat('yyyy-MM-dd'));
      setEndTime(defaultEnd.toFormat('HH:mm'));
    }
  }, [event, initialStart, initialEnd, openSlotMode, timezone]);

  // Explicit quick-set: only rewrites the end when the user picks a duration
  // (an effect here would clobber multi-day drag selections on mount)
  const applyDuration = (minutes: 30 | 60 | 90 | 120) => {
    setDuration(minutes);
    if (startDate && startTime) {
      const start = DateTime.fromISO(`${startDate}T${startTime}`, { zone: timezone });
      const end = start.plus({ minutes });
      setEndDate(end.toFormat('yyyy-MM-dd'));
      setEndTime(end.toFormat('HH:mm'));
    }
  };

  // How many calendar days the selection covers
  const daySpan = useMemo(() => {
    const start = DateTime.fromISO(startDate, { zone: timezone });
    const end = DateTime.fromISO(endDate, { zone: timezone });
    if (!start.isValid || !end.isValid || end < start) return 1;
    return Math.round(end.startOf('day').diff(start.startOf('day'), 'days').days) + 1;
  }, [startDate, endDate, timezone]);

  // Expand the selection into concrete occurrences (create mode only)
  const occurrences = useMemo(() => {
    if (event) return [];
    return computeOccurrences(
      startDate,
      startTime,
      endDate,
      endTime,
      {
        mode: daySpan > 1 ? multiMode : 'per-day',
        split: splitEnabled && !(daySpan > 1 && multiMode === 'continuous'),
        splitMinutes,
        bufferMinutes,
      },
      timezone
    );
  }, [event, startDate, startTime, endDate, endTime, daySpan, multiMode, splitEnabled, splitMinutes, bufferMinutes, timezone]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Batch path: the selection expands to several events sharing a batchId
      if (!event && occurrences.length > 1 && onSaveBulk) {
        if (occurrences.length > MAX_OCCURRENCES) {
          alert(`This selection would create more than ${MAX_OCCURRENCES} events. Narrow it down.`);
          setLoading(false);
          return;
        }
        await onSaveBulk({
          title,
          agenda: agenda || undefined,
          notes: notes || undefined,
          timezone,
          status: openSlotMode ? 'open_slot' : 'scheduled',
          visibility: openSlotMode ? 'public_open' : 'private',
          occurrences,
        });
        onClose();
        setLoading(false);
        return;
      }

      if (!event && occurrences.length === 0) {
        alert("Each day's end time must be after its start time");
        setLoading(false);
        return;
      }

      const start = DateTime.fromISO(`${startDate}T${startTime}`, { zone: timezone });
      const end = DateTime.fromISO(`${endDate}T${endTime}`, { zone: timezone });

      if (end <= start) {
        alert('End time must be after start time');
        setLoading(false);
        return;
      }

      // A single occurrence may be shorter than the raw window (split quick-set)
      const single = !event && occurrences.length === 1 ? occurrences[0] : null;
      const data: CreateCalendarEventInput | UpdateCalendarEventInput = {
        title,
        agenda: agenda || undefined,
        notes: notes || undefined,
        startDatetime: single ? single.startDatetime : start.toISO()!,
        endDatetime: single ? single.endDatetime : end.toISO()!,
        timezone,
        status: openSlotMode ? 'open_slot' : 'scheduled',
        visibility: openSlotMode ? 'public_open' : 'private',
        recurrenceRule: isRecurring && (!!event || (daySpan === 1 && !splitEnabled))
          ? {
              frequency: recurrenceFrequency,
              interval: recurrenceInterval,
              endDate: recurrenceEndDate || undefined,
              count: recurrenceCount,
            }
          : undefined,
      };

      await onSave(data, event ? editMode || 'single' : undefined);
      onClose();
    } catch (error: any) {
      alert(error.message || 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    setLoading(true);
    try {
      await onDelete(deleteMode);
      setShowDeleteConfirm(false);
      onClose();
    } catch (error: any) {
      alert(error.message || 'Failed to delete event');
    } finally {
      setLoading(false);
    }
  };

  const isEditing = !!event;
  const isRecurringEvent = event?.recurrenceRule || (event?.recurrenceParentId && !event.recurrenceParentId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Event' : openSlotMode ? 'Create Open Slot' : 'Create Event'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isEditing && isRecurringEvent && editMode === undefined && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-3">This is a recurring event. What would you like to edit?</p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setEditMode('single')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Edit This Only
                </button>
                <button
                  onClick={() => setEditMode('series')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Edit Series
                </button>
              </div>
            </div>
          )}

          {showDeleteConfirm ? (
            <div className="space-y-4">
              <p className="text-gray-700">Are you sure you want to delete this event?</p>
              {isRecurringEvent && (
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={deleteMode === 'single'}
                      onChange={() => setDeleteMode('single')}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Delete this occurrence only</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={deleteMode === 'series'}
                      onChange={() => setDeleteMode('series')}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Delete entire series</span>
                  </label>
                </div>
              )}
              {!isRecurringEvent && event?.batchId && (
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={deleteMode === 'single'}
                      onChange={() => setDeleteMode('single')}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Delete this event only</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={deleteMode === 'batch'}
                      onChange={() => setDeleteMode('batch')}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      Delete the whole series{batchSize ? ` - ${batchSize} events` : ''} created together
                    </span>
                  </label>
                </div>
              )}
              <div className="flex space-x-3">
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  disabled={openSlotMode}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Agenda</label>
                <textarea
                  value={agenda}
                  onChange={(e) => setAgenda(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {!event && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Quick Set)</label>
                  <select
                    value={duration}
                    onChange={(e) => applyDuration(Number(e.target.value) as 30 | 60 | 90 | 120)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>
              )}

              {/* Multi-day interpretation */}
              {!event && daySpan > 1 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg space-y-2">
                  <p className="text-sm font-medium text-gray-900">
                    Your selection covers {daySpan} days ({startTime}–{endTime} each day). Create:
                  </p>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={multiMode === 'per-day'}
                      onChange={() => setMultiMode('per-day')}
                      className="border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      One event per day - same title, {daySpan} entries, managed as a series
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      checked={multiMode === 'continuous'}
                      onChange={() => setMultiMode('continuous')}
                      className="border-gray-300"
                    />
                    <span className="text-sm text-gray-700">One continuous event spanning all days</span>
                  </label>
                </div>
              )}

              {/* Split into smaller slots */}
              {!event && !(daySpan > 1 && multiMode === 'continuous') && (
                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={splitEnabled}
                      onChange={(e) => setSplitEnabled(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Split into smaller slots{openSlotMode ? ' (recommended for bookable time)' : ''}
                    </span>
                  </label>

                  {splitEnabled && (
                    <div className="pl-6 border-l-2 border-gray-200 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slot length</label>
                        <select
                          value={splitMinutes}
                          onChange={(e) => setSplitMinutes(Number(e.target.value))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        >
                          <option value={30}>30 minutes</option>
                          <option value={45}>45 minutes</option>
                          <option value={60}>1 hour</option>
                          <option value={90}>1.5 hours</option>
                          <option value={120}>2 hours</option>
                          <option value={180}>3 hours</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Break between slots</label>
                        <select
                          value={bufferMinutes}
                          onChange={(e) => setBufferMinutes(Number(e.target.value))}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        >
                          <option value={0}>None</option>
                          <option value={15}>15 minutes</option>
                          <option value={30}>30 minutes</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Live preview of what will be created */}
              {!event && (occurrences.length > 1 || splitEnabled || daySpan > 1) && (
                <div
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    occurrences.length > MAX_OCCURRENCES
                      ? 'bg-red-50 border-red-200 text-red-800'
                      : 'bg-blue-50 border-blue-200 text-blue-900'
                  }`}
                >
                  {occurrences.length === 0
                    ? 'No events would be created - check that the end time is after the start time.'
                    : occurrences.length > MAX_OCCURRENCES
                    ? `This selection would create over ${MAX_OCCURRENCES} events - narrow it down.`
                    : `Creates ${occurrences.length} event${occurrences.length === 1 ? '' : 's'}${
                        occurrences.length > 1 ? ' (one title, grouped as a series - deletable together)' : ''
                      }`}
                </div>
              )}

              {(!!event || (daySpan === 1 && !splitEnabled)) && (
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Recurring Event</span>
                </label>
              </div>
              )}

              {isRecurring && (!!event || (daySpan === 1 && !splitEnabled)) && (
                <div className="pl-6 border-l-2 border-gray-200 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <select
                      value={recurrenceFrequency}
                      onChange={(e) => setRecurrenceFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Repeat Every</label>
                    <input
                      type="number"
                      min="1"
                      value={recurrenceInterval}
                      onChange={(e) => setRecurrenceInterval(Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                    <span className="text-xs text-gray-500 mt-1 block">
                      {recurrenceInterval === 1
                        ? recurrenceFrequency === 'daily'
                          ? 'day'
                          : recurrenceFrequency === 'weekly'
                          ? 'week'
                          : 'month'
                        : recurrenceFrequency === 'daily'
                        ? 'days'
                        : recurrenceFrequency === 'weekly'
                        ? 'weeks'
                        : 'months'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
                    <input
                      type="date"
                      value={recurrenceEndDate}
                      onChange={(e) => setRecurrenceEndDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Occurrences (Optional)</label>
                    <input
                      type="number"
                      min="1"
                      value={recurrenceCount || ''}
                      onChange={(e) => setRecurrenceCount(e.target.value ? Number(e.target.value) : undefined)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  {isEditing && onDelete && (
                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(true)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || (isEditing && isRecurringEvent && editMode === undefined) || false}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

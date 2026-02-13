'use client';

import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import type { CalendarEvent, CreateCalendarEventInput, UpdateCalendarEventInput } from '@/lib/api/superadmin';
import { formatTime, snapToInterval } from '@/lib/utils/calendarUtils';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: CalendarEvent | null;
  initialStart?: Date;
  initialEnd?: Date;
  openSlotMode: boolean;
  onSave: (data: CreateCalendarEventInput | UpdateCalendarEventInput, mode?: 'single' | 'series') => Promise<void>;
  onDelete?: (mode: 'single' | 'series') => Promise<void>;
}

export function EventModal({
  isOpen,
  onClose,
  event,
  initialStart,
  initialEnd,
  openSlotMode,
  onSave,
  onDelete,
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
  const [deleteMode, setDeleteMode] = useState<'single' | 'series'>('single');
  const [loading, setLoading] = useState(false);

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

  // Update end time when duration changes
  useEffect(() => {
    if (startDate && startTime && !event) {
      const start = DateTime.fromISO(`${startDate}T${startTime}`, { zone: timezone });
      const end = start.plus({ minutes: duration });
      setEndDate(end.toFormat('yyyy-MM-dd'));
      setEndTime(end.toFormat('HH:mm'));
    }
  }, [duration, startDate, startTime, event, timezone]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const start = DateTime.fromISO(`${startDate}T${startTime}`, { zone: timezone });
      const end = DateTime.fromISO(`${endDate}T${endTime}`, { zone: timezone });

      if (end <= start) {
        alert('End time must be after start time');
        setLoading(false);
        return;
      }

      const data: CreateCalendarEventInput | UpdateCalendarEventInput = {
        title,
        agenda: agenda || undefined,
        notes: notes || undefined,
        startDatetime: start.toISO()!,
        endDatetime: end.toISO()!,
        timezone,
        status: openSlotMode ? 'open_slot' : 'scheduled',
        visibility: openSlotMode ? 'public_open' : 'private',
        recurrenceRule: isRecurring
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
                    onChange={(e) => setDuration(Number(e.target.value) as 30 | 60 | 90 | 120)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>
              )}

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

              {isRecurring && (
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

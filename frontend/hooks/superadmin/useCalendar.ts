'use client';

import { useState, useEffect } from 'react';
import { superadminApi, type CalendarEvent, type CreateCalendarEventInput, type UpdateCalendarEventInput, type BulkCreateCalendarEventsInput } from '@/lib/api/superadmin';

export function useCalendar(start?: string, end?: string) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async (rangeStart: string, rangeEnd: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await superadminApi.getEvents(rangeStart, rangeEnd);
      setEvents(data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (start && end) {
      fetchEvents(start, end);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end]);

  const createEvent = async (input: CreateCalendarEventInput) => {
    try {
      const newEvent = await superadminApi.createEvent(input);
      // Refetch to get all expanded recurring instances
      if (start && end) {
        await fetchEvents(start, end);
      }
      return newEvent;
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to create event');
    }
  };

  const createEventsBulk = async (input: BulkCreateCalendarEventsInput) => {
    try {
      const newEvents = await superadminApi.createEventsBulk(input);
      if (start && end) {
        await fetchEvents(start, end);
      }
      return newEvents;
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to create events');
    }
  };

  const getBatchSize = async (batchId: string): Promise<number> => {
    try {
      return await superadminApi.getBatchSize(batchId);
    } catch {
      return 0;
    }
  };

  const materializeOccurrence = async (instanceId: string) => {
    try {
      return await superadminApi.materializeOccurrence(instanceId);
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to materialize occurrence');
    }
  };

  const updateEvent = async (id: string, input: UpdateCalendarEventInput, mode: 'single' | 'series' = 'single') => {
    try {
      const updatedEvent = await superadminApi.updateEvent(id, input, mode);
      // Refetch to get all expanded recurring instances
      if (start && end) {
        await fetchEvents(start, end);
      }
      return updatedEvent;
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to update event');
    }
  };

  const deleteEvent = async (id: string, mode: 'single' | 'series' | 'batch' = 'single') => {
    try {
      await superadminApi.deleteEvent(id, mode);
      // Refetch to get updated list after deletion
      if (start && end) {
        await fetchEvents(start, end);
      }
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to delete event');
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    createEventsBulk,
    getBatchSize,
    materializeOccurrence,
    updateEvent,
    deleteEvent,
  };
}

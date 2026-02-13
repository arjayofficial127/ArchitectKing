'use client';

import { useState, useEffect } from 'react';
import { superadminApi, type CalendarEvent, type CreateCalendarEventInput, type UpdateCalendarEventInput } from '@/lib/api/superadmin';

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
      setEvents((prev) => [...prev, newEvent]);
      return newEvent;
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to create event');
    }
  };

  const updateEvent = async (id: string, input: UpdateCalendarEventInput, mode: 'single' | 'series' = 'single') => {
    try {
      const updatedEvent = await superadminApi.updateEvent(id, input, mode);
      setEvents((prev) => prev.map((e) => (e.id === id ? updatedEvent : e)));
      return updatedEvent;
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to update event');
    }
  };

  const deleteEvent = async (id: string, mode: 'single' | 'series' = 'single') => {
    try {
      await superadminApi.deleteEvent(id, mode);
      setEvents((prev) => prev.filter((e) => e.id !== id));
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
    updateEvent,
    deleteEvent,
  };
}

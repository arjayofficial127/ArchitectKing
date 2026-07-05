'use client';

import { useRef, useState, useCallback } from 'react';
import { DateTime } from 'luxon';
import type { CalendarEvent } from '@/lib/api/superadmin';

export type EventDragKind = 'move' | 'resize-start' | 'resize-end';

export interface EventDragPreview {
  event: CalendarEvent;
  dayIndex: number;
  startMinutes: number;
  endMinutes: number;
  kind: EventDragKind;
}

export interface EventContextMenuState {
  x: number;
  y: number;
  event: CalendarEvent;
}

interface PendingDrag {
  event: CalendarEvent;
  kind: EventDragKind;
  startClientX: number;
  startClientY: number;
  grabOffsetMinutes: number;
  durationMinutes: number;
  eventDayIndex: number;
  eventStartMinutes: number;
  active: boolean;
}

interface UseEventInteractionsParams {
  gridRef: React.RefObject<HTMLDivElement>;
  days: Date[];
  gutterPx: number;
  timezone: string;
  snapMinutes?: number;
  onEventClick: (event: CalendarEvent) => void;
  onCommitTimes: (event: CalendarEvent, newStart: Date, newEnd: Date, kind: 'move' | 'resize') => void;
}

const DRAG_THRESHOLD_PX = 5;
const DAY_MINUTES = 24 * 60;

/**
 * Move / resize / context-menu interactions for calendar event blocks.
 * The host view forwards its grid mousemove/mouseup to handleGridMouseMove /
 * handleGridMouseUp; a `true` return means the interaction consumed the event
 * and the view's own slot-selection logic should skip it.
 */
export function useEventInteractions({
  gridRef,
  days,
  gutterPx,
  timezone,
  snapMinutes = 30,
  onEventClick,
  onCommitTimes,
}: UseEventInteractionsParams) {
  const [preview, setPreview] = useState<EventDragPreview | null>(null);
  const [contextMenu, setContextMenu] = useState<EventContextMenuState | null>(null);
  const pendingRef = useRef<PendingDrag | null>(null);
  const previewRef = useRef<EventDragPreview | null>(null);

  const updatePreview = (next: EventDragPreview | null) => {
    previewRef.current = next;
    setPreview(next);
  };

  const geometryFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const el = gridRef.current;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left + el.scrollLeft - gutterPx;
      const y = clientY - rect.top;
      const dayWidth = (el.scrollWidth - gutterPx) / days.length;
      const dayIndex = Math.max(0, Math.min(days.length - 1, Math.floor(x / dayWidth)));
      const minutes = Math.max(0, Math.min(DAY_MINUTES - 1, (y / (rect.height / 24)) * 60));
      return { dayIndex, minutes };
    },
    [gridRef, days.length, gutterPx]
  );

  const localTimes = useCallback(
    (event: CalendarEvent) => {
      const start = DateTime.fromISO(event.startDatetime, { zone: 'utc' }).setZone(timezone);
      const end = DateTime.fromISO(event.endDatetime, { zone: 'utc' }).setZone(timezone);
      return { start, end };
    },
    [timezone]
  );

  const snap = useCallback(
    (minutes: number) => Math.round(minutes / snapMinutes) * snapMinutes,
    [snapMinutes]
  );

  /** Attach to each event block. Blocks spanning >1 day are click/menu only. */
  const handleEventMouseDown = useCallback(
    (e: React.MouseEvent, event: CalendarEvent, kind: EventDragKind) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();
      const { start, end } = localTimes(event);
      const durationMinutes = end.diff(start, 'minutes').minutes;
      const eventDayIndex = days.findIndex((d) =>
        DateTime.fromJSDate(d, { zone: timezone }).hasSame(start, 'day')
      );
      const eventStartMinutes = start.hour * 60 + start.minute;

      const geometry = geometryFromPointer(e.clientX, e.clientY);
      if (!geometry || durationMinutes >= DAY_MINUTES || durationMinutes <= 0) {
        // Continuous multi-day events: click only
        pendingRef.current = null;
        onEventClick(event);
        return;
      }

      pendingRef.current = {
        event,
        kind,
        startClientX: e.clientX,
        startClientY: e.clientY,
        grabOffsetMinutes: geometry.minutes - eventStartMinutes,
        durationMinutes,
        eventDayIndex: eventDayIndex === -1 ? geometry.dayIndex : eventDayIndex,
        eventStartMinutes,
        active: false,
      };
    },
    [days, timezone, localTimes, geometryFromPointer, onEventClick]
  );

  const handleGridMouseMove = useCallback(
    (e: React.MouseEvent): boolean => {
      const pending = pendingRef.current;
      if (!pending) return false;

      if (!pending.active) {
        const moved =
          Math.abs(e.clientX - pending.startClientX) + Math.abs(e.clientY - pending.startClientY);
        if (moved < DRAG_THRESHOLD_PX) return true;
        pending.active = true;
      }

      const geometry = geometryFromPointer(e.clientX, e.clientY);
      if (!geometry) return true;

      if (pending.kind === 'move') {
        let startM = snap(geometry.minutes - pending.grabOffsetMinutes);
        startM = Math.max(0, Math.min(DAY_MINUTES - pending.durationMinutes, startM));
        updatePreview({
          event: pending.event,
          dayIndex: geometry.dayIndex,
          startMinutes: startM,
          endMinutes: startM + pending.durationMinutes,
          kind: 'move',
        });
      } else if (pending.kind === 'resize-end') {
        const base = pending.eventStartMinutes;
        const endM = Math.max(base + snapMinutes, Math.min(DAY_MINUTES, snap(geometry.minutes)));
        updatePreview({
          event: pending.event,
          dayIndex: pending.eventDayIndex,
          startMinutes: base,
          endMinutes: endM,
          kind: 'resize-end',
        });
      } else {
        const baseEnd = pending.eventStartMinutes + pending.durationMinutes;
        const startM = Math.min(baseEnd - snapMinutes, Math.max(0, snap(geometry.minutes)));
        updatePreview({
          event: pending.event,
          dayIndex: pending.eventDayIndex,
          startMinutes: startM,
          endMinutes: baseEnd,
          kind: 'resize-start',
        });
      }
      return true;
    },
    [geometryFromPointer, snap, snapMinutes]
  );

  const handleGridMouseUp = useCallback((): boolean => {
    const pending = pendingRef.current;
    if (!pending) return false;
    pendingRef.current = null;

    const current = previewRef.current;
    updatePreview(null);

    if (!pending.active) {
      onEventClick(pending.event);
      return true;
    }

    if (current) {
      const noChange =
        current.dayIndex === pending.eventDayIndex &&
        current.startMinutes === pending.eventStartMinutes &&
        current.endMinutes === pending.eventStartMinutes + pending.durationMinutes;
      if (!noChange) {
        const day = days[current.dayIndex];
        const dayStart = DateTime.fromJSDate(day, { zone: timezone }).startOf('day');
        const newStart = dayStart.plus({ minutes: current.startMinutes }).toJSDate();
        const newEnd = dayStart.plus({ minutes: current.endMinutes }).toJSDate();
        onCommitTimes(pending.event, newStart, newEnd, current.kind === 'move' ? 'move' : 'resize');
      }
    }
    return true;
  }, [days, timezone, onEventClick, onCommitTimes]);

  const handleEventContextMenu = useCallback((e: React.MouseEvent, event: CalendarEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, event });
  }, []);

  return {
    preview,
    contextMenu,
    closeContextMenu: () => setContextMenu(null),
    handleEventMouseDown,
    handleGridMouseMove,
    handleGridMouseUp,
    handleEventContextMenu,
  };
}

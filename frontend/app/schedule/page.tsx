'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { DateTime } from 'luxon';
import { publicApi, type PublicScheduleEvent } from '@/lib/api/public';
import { BookingModal } from '@/components/public/BookingModal';
import { SiteNavbar } from '@/components/shared/SiteNavbar';
import { AmbientBackground } from '@/components/ui/AmbientBackground';

const WINDOW_DAYS = 30;

interface ConfirmedBooking {
  event: PublicScheduleEvent;
  name: string;
  email: string;
  cancelToken?: string;
}

interface DayGroup {
  dayKey: string;
  label: string;
  relative: string | null;
  events: PublicScheduleEvent[];
}

export default function SchedulePage() {
  const [visitorTimezone, setVisitorTimezone] = useState<string>('');
  const [events, setEvents] = useState<PublicScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<PublicScheduleEvent | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  // Detect visitor timezone on load
  useEffect(() => {
    setVisitorTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const fetchSchedule = useCallback(async (options?: { silent?: boolean }) => {
    if (!options?.silent) setLoading(true);
    setError(false);
    try {
      const now = DateTime.now();
      const start = now.toISO();
      const end = now.plus({ days: WINDOW_DAYS }).endOf('day').toISO();
      if (!start || !end) throw new Error('Invalid date range');
      const data = await publicApi.getSchedule(start, end);
      setEvents(data);
    } catch {
      setError(true);
    } finally {
      if (!options?.silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!visitorTimezone) return;
    fetchSchedule();
  }, [visitorTimezone, fetchSchedule]);

  // Group available slots by day in the visitor's timezone; only days with slots
  const days = useMemo<DayGroup[]>(() => {
    if (!visitorTimezone) return [];
    const grouped = new Map<string, PublicScheduleEvent[]>();

    for (const event of events) {
      const dayKey = DateTime.fromISO(event.startDatetime, { zone: 'utc' })
        .setZone(visitorTimezone)
        .toFormat('yyyy-MM-dd');
      const list = grouped.get(dayKey) ?? [];
      list.push(event);
      grouped.set(dayKey, list);
    }

    const today = DateTime.now().setZone(visitorTimezone).toFormat('yyyy-MM-dd');
    const tomorrow = DateTime.now().setZone(visitorTimezone).plus({ days: 1 }).toFormat('yyyy-MM-dd');

    return Array.from(grouped.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([dayKey, dayEvents]) => ({
        dayKey,
        label: DateTime.fromISO(dayKey, { zone: visitorTimezone }).toFormat('cccc, MMMM d'),
        relative: dayKey === today ? 'Today' : dayKey === tomorrow ? 'Tomorrow' : null,
        events: [...dayEvents].sort((a, b) => a.startDatetime.localeCompare(b.startDatetime)),
      }));
  }, [events, visitorTimezone]);

  const formatTime = (isoString: string): string =>
    DateTime.fromISO(isoString, { zone: 'utc' }).setZone(visitorTimezone).toFormat('h:mm a');

  const durationMinutes = (event: PublicScheduleEvent): number =>
    Math.round(
      DateTime.fromISO(event.endDatetime).diff(DateTime.fromISO(event.startDatetime), 'minutes').minutes
    );

  const googleCalendarUrl = (booking: ConfirmedBooking): string => {
    const fmt = "yyyyMMdd'T'HHmmss'Z'";
    const start = DateTime.fromISO(booking.event.startDatetime, { zone: 'utc' }).toFormat(fmt);
    const end = DateTime.fromISO(booking.event.endDatetime, { zone: 'utc' }).toFormat(fmt);
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: 'Call with Arvin Jayson Castro',
      dates: `${start}/${end}`,
      details: 'Booked via arvinjaysoncastro.com/schedule',
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const handleBookingSuccess = (details: { name: string; email: string; cancelToken?: string }) => {
    if (selectedEvent) {
      setConfirmedBooking({
        event: selectedEvent,
        name: details.name,
        email: details.email,
        cancelToken: details.cancelToken,
      });
    }
    setSelectedEvent(null);
    fetchSchedule();
  };

  // ---------- Confirmation view ----------
  if (confirmedBooking) {
    const start = DateTime.fromISO(confirmedBooking.event.startDatetime, { zone: 'utc' }).setZone(visitorTimezone);
    return (
      <div className="relative min-h-screen bg-white text-slate-800">
        <AmbientBackground gridSize={64} lightCount={6} enableGradient gradientOpacity={0.05} enableGrain grainOpacity={0.03} />
        <SiteNavbar />
        <main className="relative mx-auto flex max-w-2xl flex-col items-center px-6 py-16 md:py-24">
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-10">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <svg className="h-8 w-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">{"You're booked!"}</h1>

            <div className="mx-auto mt-6 max-w-sm rounded-xl border border-slate-200 bg-slate-50/60 p-5 text-left">
              <p className="text-sm font-semibold text-slate-900">{start.toFormat('cccc, MMMM d, yyyy')}</p>
              <p className="mt-1 text-sm text-slate-700">
                {formatTime(confirmedBooking.event.startDatetime)} – {formatTime(confirmedBooking.event.endDatetime)}
                <span className="ml-2 text-xs text-slate-500">({durationMinutes(confirmedBooking.event)} min)</span>
              </p>
              <p className="mt-1 text-xs text-slate-500">{visitorTimezone}</p>
            </div>

            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-slate-600">
              {"Thanks, "}{confirmedBooking.name.split(' ')[0]}{". I'll personally follow up at "}
              <span className="font-medium text-slate-800">{confirmedBooking.email}</span>
              {" to confirm the call and share the meeting link."}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={googleCalendarUrl(confirmedBooking)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 sm:w-auto"
              >
                Add to Google Calendar
              </a>
              <button
                type="button"
                onClick={() => setConfirmedBooking(null)}
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-[#F4C430] hover:bg-[#FFFDF4] sm:w-auto"
              >
                Book another time
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4 text-sm">
              {confirmedBooking.cancelToken && (
                <Link
                  href={`/booking/${confirmedBooking.cancelToken}`}
                  className="text-slate-500 transition-colors hover:text-[#F4C430]"
                >
                  Manage booking
                </Link>
              )}
              <Link href="/" className="text-slate-500 transition-colors hover:text-[#F4C430]">
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ---------- Booking view ----------
  return (
    <div className="relative min-h-screen bg-white text-slate-800">
      <AmbientBackground gridSize={64} lightCount={6} enableGradient gradientOpacity={0.05} enableGrain grainOpacity={0.03} />
      <SiteNavbar />

      <main className="relative mx-auto max-w-3xl px-6 py-12 md:py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Book a Call</h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
            Pick a time that works for you. We&apos;ll talk through what you&apos;re working on and see whether I can help.
          </p>
          {visitorTimezone && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm text-slate-600">
              <svg className="h-4 w-4 text-[#F4C430]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0" />
              </svg>
              Times shown in {visitorTimezone.replace(/_/g, ' ')}
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-10 space-y-8" role="status" aria-live="polite">
            <p className="text-center text-sm font-medium text-slate-600">
              Checking the next {WINDOW_DAYS} days for available times…
            </p>
            {[0, 1].map((group) => (
              <div key={group} aria-hidden="true">
                <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[0, 1, 2].map((slot) => (
                    <div key={slot} className="h-16 animate-pulse rounded-xl bg-slate-100" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fallback: API error or no upcoming slots */}
        {!loading && (error || days.length === 0) && (
          <div
            className="mx-auto mt-10 max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
            role={error ? 'alert' : 'status'}
          >
            <h2 className="text-lg font-semibold text-slate-900">
              {error ? 'The booking calendar is temporarily unavailable' : 'No open times in the next 30 days'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {error
                ? 'You can retry the calendar or send me a note directly.'
                : 'Send me a note and we’ll arrange a time that works.'}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/contact-me"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#F4C430]/30 transition-all hover:bg-[#F4C430]/90 sm:w-auto"
              >
                Send Me a Note
              </Link>
              <button
                type="button"
                onClick={() => fetchSchedule()}
                className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-[#F4C430] hover:bg-[#FFFDF4] sm:w-auto"
              >
                Check again
              </button>
            </div>
          </div>
        )}

        {/* Available days */}
        {!loading && !error && days.length > 0 && (
          <div className="mt-10 space-y-8">
            {days.map((day) => (
              <section key={day.dayKey} aria-label={day.label}>
                <h2 className="flex items-baseline gap-2 text-lg font-semibold text-slate-900">
                  {day.label}
                  {day.relative && (
                    <span className="rounded-full bg-[#FFF8E1] px-2.5 py-0.5 text-xs font-medium text-[#8a6d00]">
                      {day.relative}
                    </span>
                  )}
                </h2>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {day.events.map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#F4C430] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#F4C430] focus:ring-offset-1"
                    >
                      <span className="block text-sm font-semibold text-slate-900 group-hover:text-[#8a6d00]">
                        {formatTime(event.startDatetime)}
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {durationMinutes(event)} min
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            ))}

            <p className="pt-2 text-center text-xs text-slate-400">
              Can&apos;t find a time that works?{' '}
              <Link href="/contact-me" className="underline transition-colors hover:text-[#F4C430]">
                Email me
              </Link>{' '}
              and we&apos;ll sort something out.
            </p>
          </div>
        )}
      </main>

      {/* Booking Modal */}
      {selectedEvent && (
        <BookingModal
          isOpen={selectedEvent !== null}
          onClose={() => {
            setSelectedEvent(null);
            fetchSchedule({ silent: true });
          }}
          event={selectedEvent}
          visitorTimezone={visitorTimezone}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}

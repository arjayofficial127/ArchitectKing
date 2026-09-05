'use client';

import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { publicApi, type PublicScheduleEvent, type CreateBookingRequest } from '@/lib/api/public';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: PublicScheduleEvent;
  visitorTimezone: string;
  onSuccess: (details: { name: string; email: string; cancelToken?: string }) => void;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function BookingModal({ isOpen, onClose, event, visitorTimezone, onSuccess }: BookingModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slotTaken, setSlotTaken] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  const start = DateTime.fromISO(event.startDatetime, { zone: 'utc' }).setZone(visitorTimezone);
  const end = DateTime.fromISO(event.endDatetime, { zone: 'utc' }).setZone(visitorTimezone);
  const duration = Math.round(end.diff(start, 'minutes').minutes);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      const bookingData: CreateBookingRequest = {
        calendarEventId: event.id,
        name: name.trim(),
        email: email.trim(),
        message: message.trim() || undefined,
        timezone: visitorTimezone,
      };
      const created = await publicApi.createBooking(bookingData);
      onSuccess({ name: name.trim(), email: email.trim(), cancelToken: created?.cancelToken });
    } catch (err: any) {
      const apiMessage: string = err.response?.data?.error?.message || '';
      if (/already|taken|passed|not available/i.test(apiMessage)) {
        setSlotTaken(true);
      } else {
        setError(apiMessage || 'Something went wrong while booking. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Confirm your booking"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-7">
          {slotTaken ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
                <svg className="h-6 w-6 text-[#F4C430]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900">That time was just taken</h2>
              <p className="mt-2 text-sm text-slate-600">
                Someone booked this slot moments ago. Pick another time - the list will refresh.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
              >
                Choose another time
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <h2 className="text-xl font-bold text-slate-900">Confirm your booking</h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="rounded-md p-1 text-slate-400 transition-colors hover:text-slate-600"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Slot summary */}
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#F4C430] shadow-sm">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{start.toFormat('cccc, MMMM d, yyyy')}</p>
                  <p className="text-sm text-slate-600">
                    {start.toFormat('h:mm a')} – {end.toFormat('h:mm a')}
                    <span className="ml-1.5 text-xs text-slate-400">({duration} min)</span>
                  </p>
                  <p className="truncate text-xs text-slate-400">{visitorTimezone.replace(/_/g, ' ')}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="booking-name" className="mb-1 block text-sm font-medium text-slate-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoFocus
                    autoComplete="name"
                    placeholder="Your full name"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#F4C430] focus:outline-none focus:ring-2 focus:ring-[#F4C430]/40"
                  />
                </div>

                <div>
                  <label htmlFor="booking-email" className="mb-1 block text-sm font-medium text-slate-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#F4C430] focus:outline-none focus:ring-2 focus:ring-[#F4C430]/40"
                  />
                  <p className="mt-1 text-xs text-slate-400">The meeting confirmation goes here.</p>
                </div>

                <div>
                  <label htmlFor="booking-message" className="mb-1 block text-sm font-medium text-slate-700">
                    What would you like to discuss? <span className="text-slate-400">(optional)</span>
                  </label>
                  <textarea
                    id="booking-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="A sentence or two about your system and what's on your mind."
                    className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#F4C430] focus:outline-none focus:ring-2 focus:ring-[#F4C430]/40"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={submitting}
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-lg bg-[#F4C430] px-4 py-2.5 text-sm font-semibold text-[#0F172A] shadow-md shadow-[#F4C430]/30 transition-all hover:bg-[#F4C430]/90 disabled:opacity-60"
                  >
                    {submitting ? 'Booking…' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

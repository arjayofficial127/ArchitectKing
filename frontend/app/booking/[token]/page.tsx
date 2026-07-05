'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DateTime } from 'luxon';
import { publicApi, type ManagedBooking } from '@/lib/api/public';
import { SiteNavbar } from '@/components/shared/SiteNavbar';
import { AmbientBackground } from '@/components/ui/AmbientBackground';

export default function ManageBookingPage() {
  const params = useParams<{ token: string }>();
  const token = typeof params?.token === 'string' ? params.token : '';

  const [booking, setBooking] = useState<ManagedBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooking = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setNotFound(false);
    try {
      const data = await publicApi.getManagedBooking(token);
      setBooking(data);
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  const handleCancel = async () => {
    if (!window.confirm('Cancel this booking? The time slot will be released.')) return;
    setCancelling(true);
    setError(null);
    try {
      const data = await publicApi.cancelManagedBooking(token);
      setBooking(data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to cancel the booking. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  const zone = booking?.timezoneAtBooking || booking?.event.timezone || 'Asia/Manila';
  const start = booking ? DateTime.fromISO(booking.event.startDatetime, { zone: 'utc' }).setZone(zone) : null;
  const end = booking ? DateTime.fromISO(booking.event.endDatetime, { zone: 'utc' }).setZone(zone) : null;
  const isCancelled = booking?.status === 'cancelled';
  const isPast = start ? start.toMillis() <= DateTime.now().toMillis() : false;

  return (
    <div className="relative min-h-screen bg-white text-slate-800">
      <AmbientBackground gridSize={64} lightCount={6} enableGradient gradientOpacity={0.05} enableGrain grainOpacity={0.03} />
      <SiteNavbar />

      <main className="relative mx-auto flex max-w-2xl flex-col items-center px-6 py-16 md:py-24">
        {loading && (
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-10 shadow-sm" aria-hidden>
            <div className="mx-auto h-6 w-56 animate-pulse rounded bg-slate-200" />
            <div className="mx-auto mt-6 h-24 max-w-sm animate-pulse rounded-xl bg-slate-100" />
          </div>
        )}

        {!loading && notFound && (
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">Booking not found</h1>
            <p className="mt-3 text-sm text-slate-600">
              This link is invalid or no longer active. If you think that&apos;s wrong, just email me.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center rounded-lg bg-[#F4C430] px-6 py-3 text-sm font-semibold text-[#0F172A] shadow-lg shadow-[#F4C430]/30 transition-all hover:bg-[#F4C430]/90"
              >
                Book a time
              </Link>
              <Link
                href="/contact-me"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-[#F4C430] hover:bg-[#FFFDF4]"
              >
                Contact me
              </Link>
            </div>
          </div>
        )}

        {!loading && booking && start && end && (
          <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-10">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                isCancelled ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              {isCancelled ? 'Cancelled' : 'Confirmed'}
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {isCancelled ? 'This booking was cancelled' : `Your call with Arvin, ${booking.name.split(' ')[0]}`}
            </h1>

            <div className={`mx-auto mt-6 max-w-sm rounded-xl border border-slate-200 p-5 text-left ${isCancelled ? 'bg-slate-50 opacity-70' : 'bg-slate-50/60'}`}>
              <p className={`text-sm font-semibold text-slate-900 ${isCancelled ? 'line-through' : ''}`}>
                {start.toFormat('cccc, MMMM d, yyyy')}
              </p>
              <p className={`mt-1 text-sm text-slate-700 ${isCancelled ? 'line-through' : ''}`}>
                {start.toFormat('h:mm a')} – {end.toFormat('h:mm a')}
              </p>
              <p className="mt-1 text-xs text-slate-500">{zone.replace(/_/g, ' ')}</p>
              {booking.message && (
                <p className="mt-3 border-t border-slate-200 pt-3 text-xs text-slate-500">
                  Your note: {booking.message}
                </p>
              )}
            </div>

            {error && (
              <div className="mx-auto mt-4 max-w-sm rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {!isCancelled && !isPast && (
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-red-200 bg-white px-6 py-3 text-sm font-semibold text-red-600 transition-all hover:border-red-400 hover:bg-red-50 disabled:opacity-50 sm:w-auto"
                >
                  {cancelling ? 'Cancelling…' : 'Cancel booking'}
                </button>
              )}
              <Link
                href="/schedule"
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 sm:w-auto"
              >
                {isCancelled ? 'Book a new time' : 'Reschedule (cancel, then pick a new time)'}
              </Link>
            </div>

            <p className="mt-6 text-xs text-slate-400">
              Questions? Email{' '}
              <a href="mailto:arvinjaysoncastro@gmail.com" className="underline hover:text-[#F4C430]">
                arvinjaysoncastro@gmail.com
              </a>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DateTime } from 'luxon';
import { useNotifications } from '@/hooks/superadmin/useNotifications';
import { superadminApi, type SuperAdminNotification } from '@/lib/api/superadmin';
import { toast } from '@/lib/toast';

const TYPE_LABELS: Record<SuperAdminNotification['type'], string> = {
  booking_request: 'New booking',
  system: 'Booking update',
  reminder: 'Reminder',
};

export default function SuperAdminNotificationsPage() {
  const { notifications, loading, error, markAsRead } = useNotifications(false);
  const [addingProspect, setAddingProspect] = useState<string | null>(null);
  const [addedProspects, setAddedProspects] = useState<Set<string>>(new Set());

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
    } catch {
      toast('Failed to mark notification as read', 'error');
    }
  };

  const handleAddToProspects = async (notification: SuperAdminNotification) => {
    const booking = notification.booking;
    if (!booking) return;
    setAddingProspect(notification.id);
    try {
      const slotLine = booking.event
        ? DateTime.fromISO(booking.event.startDatetime, { zone: 'utc' })
            .setZone(booking.timezoneAtBooking || booking.event.timezone)
            .toFormat('ccc, MMM d yyyy h:mm a')
        : 'unknown time';
      const prospect = await superadminApi.createProspect({
        type: 'person',
        name: booking.name,
        status: 'meeting',
        tags: ['booking'],
        notes: `Email: ${booking.email}\nBooked: ${slotLine}${booking.message ? `\nMessage: ${booking.message}` : ''}`,
      });
      if (booking.event) {
        await superadminApi.linkMeeting(prospect.id, booking.event.id);
      }
      setAddedProspects((prev) => new Set(prev).add(notification.id));
      toast(`${booking.name} added to prospects with meeting linked`, 'success');
    } catch (err: any) {
      toast(err.response?.data?.error?.message || 'Failed to add prospect', 'error');
    } finally {
      setAddingProspect(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-1">Bookings and system updates</p>
      </div>

      {loading && <div className="text-gray-600">Loading notifications...</div>}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {!loading && !error && notifications.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-500 text-sm">No notifications</p>
        </div>
      )}

      {!loading && !error && notifications.length > 0 && (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const booking = notification.booking;
            const zone = booking?.timezoneAtBooking || booking?.event?.timezone || 'Asia/Manila';
            const start = booking?.event
              ? DateTime.fromISO(booking.event.startDatetime, { zone: 'utc' }).setZone(zone)
              : null;
            const end = booking?.event
              ? DateTime.fromISO(booking.event.endDatetime, { zone: 'utc' }).setZone(zone)
              : null;
            const received = DateTime.fromISO(notification.createdAt).toRelative();

            return (
              <div
                key={notification.id}
                className={`rounded-lg border p-4 ${
                  notification.read ? 'border-gray-200 bg-white' : 'border-blue-200 bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        {TYPE_LABELS[notification.type] ?? notification.type}
                      </span>
                      {booking?.status === 'cancelled' && (
                        <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-600">Cancelled</span>
                      )}
                      {!notification.read && (
                        <span className="rounded bg-blue-500 px-2 py-0.5 text-xs text-white">New</span>
                      )}
                      <span className="text-xs text-gray-400">{received}</span>
                    </div>

                    {booking ? (
                      <div className="mt-2 space-y-1 text-sm text-gray-700">
                        <p>
                          <span className="font-medium text-gray-900">{booking.name}</span>{' '}
                          <a href={`mailto:${booking.email}`} className="text-blue-600 hover:underline">
                            {booking.email}
                          </a>
                        </p>
                        {start && end && (
                          <p>
                            {start.toFormat('cccc, MMMM d')} · {start.toFormat('h:mm a')} – {end.toFormat('h:mm a')}{' '}
                            <span className="text-xs text-gray-400">({zone.replace(/_/g, ' ')})</span>
                          </p>
                        )}
                        {booking.message && (
                          <p className="rounded border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600">
                            “{booking.message}”
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-gray-500">System notification</p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    {booking && booking.status !== 'cancelled' && (
                      addedProspects.has(notification.id) ? (
                        <Link
                          href="/superadmin/prospects"
                          className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                        >
                          View in Prospects
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleAddToProspects(notification)}
                          disabled={addingProspect === notification.id}
                          className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-700 disabled:opacity-50"
                        >
                          {addingProspect === notification.id ? 'Adding…' : '+ Add to Prospects'}
                        </button>
                      )
                    )}
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                      >
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

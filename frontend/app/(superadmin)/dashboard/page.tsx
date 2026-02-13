'use client';

import { useState, useEffect } from 'react';
import { superadminApi, type BookingRequest, type CalendarEvent, type Prospect } from '@/lib/api/superadmin';

export default function SuperAdminDashboardPage() {
  const [recentBookings, setRecentBookings] = useState<BookingRequest[]>([]);
  const [tomorrowEvents, setTomorrowEvents] = useState<CalendarEvent[]>([]);
  const [thisWeekEvents, setThisWeekEvents] = useState<CalendarEvent[]>([]);
  const [overdueEvents, setOverdueEvents] = useState<CalendarEvent[]>([]);
  const [urgentProspects, setUrgentProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const nextWeek = new Date(now);
        nextWeek.setDate(nextWeek.getDate() + 7);
        nextWeek.setHours(23, 59, 59, 999);

        // Fetch events for tomorrow
        const tomorrowStart = tomorrow.toISOString();
        const tomorrowEnd = new Date(tomorrow);
        tomorrowEnd.setHours(23, 59, 59, 999);
        const tomorrowEventsData = await superadminApi.getEvents(tomorrowStart, tomorrowEnd.toISOString());
        setTomorrowEvents(tomorrowEventsData);

        // Fetch events for this week
        const weekStart = now.toISOString();
        const weekEnd = nextWeek.toISOString();
        const weekEventsData = await superadminApi.getEvents(weekStart, weekEnd);
        setThisWeekEvents(weekEventsData);

        // Fetch overdue events (past events that are not completed)
        const pastStart = new Date(0).toISOString();
        const pastEnd = now.toISOString();
        const pastEvents = await superadminApi.getEvents(pastStart, pastEnd);
        const overdue = pastEvents.filter(
          (e) => e.status !== 'completed' && e.status !== 'cancelled' && new Date(e.endDatetime) < now
        );
        setOverdueEvents(overdue);

        // Fetch urgent prospects (status: meeting, proposal)
        const prospects = await superadminApi.getProspects();
        const urgent = prospects.filter((p) => p.status === 'meeting' || p.status === 'proposal');
        setUrgentProspects(urgent);

        // TODO: Fetch recent booking requests when endpoint is available
        // For now, set empty array
        setRecentBookings([]);
      } catch (err: any) {
        setError(err.response?.data?.error?.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">SuperAdmin Control OS Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Booking Requests */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Booking Requests</h2>
          {recentBookings.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent booking requests</p>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded p-3">
                  <pre className="text-xs overflow-auto">{JSON.stringify(booking, null, 2)}</pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tomorrow */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tomorrow</h2>
          {tomorrowEvents.length === 0 ? (
            <p className="text-gray-500 text-sm">No events scheduled for tomorrow</p>
          ) : (
            <div className="space-y-3">
              {tomorrowEvents.map((event) => (
                <div key={event.id} className="border border-gray-200 rounded p-3">
                  <pre className="text-xs overflow-auto">{JSON.stringify(event, null, 2)}</pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* This Week */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">This Week</h2>
          {thisWeekEvents.length === 0 ? (
            <p className="text-gray-500 text-sm">No events scheduled this week</p>
          ) : (
            <div className="space-y-3">
              {thisWeekEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="border border-gray-200 rounded p-3">
                  <pre className="text-xs overflow-auto">{JSON.stringify(event, null, 2)}</pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Overdue */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Overdue</h2>
          {overdueEvents.length === 0 ? (
            <p className="text-gray-500 text-sm">No overdue events</p>
          ) : (
            <div className="space-y-3">
              {overdueEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="border border-red-200 rounded p-3 bg-red-50">
                  <pre className="text-xs overflow-auto">{JSON.stringify(event, null, 2)}</pre>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Urgent Prospects */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Urgent Prospects</h2>
          {urgentProspects.length === 0 ? (
            <p className="text-gray-500 text-sm">No urgent prospects</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {urgentProspects.map((prospect) => (
                <div key={prospect.id} className="border border-gray-200 rounded p-3">
                  <pre className="text-xs overflow-auto">{JSON.stringify(prospect, null, 2)}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

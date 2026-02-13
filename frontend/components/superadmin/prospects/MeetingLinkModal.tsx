'use client';

import { useState, useEffect } from 'react';
import type { Prospect, CalendarEvent } from '@/lib/api/superadmin';
import { superadminApi } from '@/lib/api/superadmin';
import { DateTime } from 'luxon';

interface MeetingLinkModalProps {
  prospect: Prospect;
  onClose: () => void;
}

export default function MeetingLinkModal({ prospect, onClose }: MeetingLinkModalProps) {
  const [meetings, setMeetings] = useState<CalendarEvent[]>([]);
  const [availableEvents, setAvailableEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [linking, setLinking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const now = DateTime.now().toISO();
        const future = DateTime.now().plus({ months: 3 }).toISO();
        const events = await superadminApi.getEvents(now, future!);
        setAvailableEvents(events);
        setMeetings([]);
      } catch (err: any) {
        setError(err.response?.data?.error?.message || 'Failed to load meetings');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [prospect.id]);

  const handleLinkMeeting = async (eventId: string) => {
    setLinking(true);
    setError(null);
    try {
      await superadminApi.linkMeeting(prospect.id, eventId);
      const now = DateTime.now().toISO();
      const future = DateTime.now().plus({ months: 3 }).toISO();
      const events = await superadminApi.getEvents(now, future!);
      setAvailableEvents(events);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to link meeting');
    } finally {
      setLinking(false);
    }
  };

  const formatDateTime = (isoString: string): string => {
    const dt = DateTime.fromISO(isoString);
    return dt.toFormat('MMM d, yyyy h:mm a');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Meetings - {prospect.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
          {loading ? (
            <div className="text-center py-8 text-gray-600">Loading...</div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Linked Meetings</h3>
                {meetings.length === 0 ? (
                  <p className="text-sm text-gray-500">No meetings linked yet</p>
                ) : (
                  <div className="space-y-2">
                    {meetings.map((meeting) => (
                      <div key={meeting.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="font-medium text-gray-900">{meeting.title}</div>
                        <div className="text-sm text-gray-600">{formatDateTime(meeting.startDatetime)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Link New Meeting</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {availableEvents.length === 0 ? (
                    <p className="text-sm text-gray-500">No available events</p>
                  ) : (
                    availableEvents.map((event) => (
                      <div key={event.id} className="border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">{event.title}</div>
                          <div className="text-sm text-gray-600">{formatDateTime(event.startDatetime)}</div>
                        </div>
                        <button
                          onClick={() => handleLinkMeeting(event.id)}
                          disabled={linking}
                          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          Link
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="mt-6 flex justify-end">
            <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

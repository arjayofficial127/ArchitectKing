'use client';

import { useState, useEffect, useMemo } from 'react';
import { DateTime } from 'luxon';
import { publicApi, type PublicScheduleEvent } from '@/lib/api/public';
import { BookingModal } from '@/components/public/BookingModal';

export default function SchedulePage() {
  const [visitorTimezone, setVisitorTimezone] = useState<string>('');
  const [events, setEvents] = useState<PublicScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<PublicScheduleEvent | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Detect visitor timezone on load
  useEffect(() => {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setVisitorTimezone(detected);
  }, []);

  // Calculate week range (current week)
  const weekRange = useMemo(() => {
    const now = DateTime.now().setZone(visitorTimezone || 'UTC');
    const weekStart = now.startOf('week');
    const weekEnd = weekStart.endOf('week');
    return {
      start: weekStart.toISO()!,
      end: weekEnd.toISO()!,
    };
  }, [visitorTimezone]);

  // Fetch schedule
  useEffect(() => {
    if (!visitorTimezone) return;

    const fetchSchedule = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await publicApi.getSchedule(weekRange.start, weekRange.end);
        setEvents(data);
      } catch (err: any) {
        setError(err.response?.data?.error?.message || 'Failed to load schedule');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [weekRange.start, weekRange.end, visitorTimezone]);

  // Group events by day
  const eventsByDay = useMemo(() => {
    const grouped: Record<string, PublicScheduleEvent[]> = {};
    
    events.forEach((event) => {
      // Convert UTC to visitor timezone for display
      const start = DateTime.fromISO(event.startDatetime, { zone: 'UTC' });
      const visitorStart = start.setZone(visitorTimezone);
      const dayKey = visitorStart.toFormat('yyyy-MM-dd');
      
      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
      }
      grouped[dayKey].push(event);
    });

    // Sort events within each day
    Object.keys(grouped).forEach((day) => {
      grouped[day].sort((a, b) => {
        const aStart = DateTime.fromISO(a.startDatetime, { zone: 'UTC' }).setZone(visitorTimezone);
        const bStart = DateTime.fromISO(b.startDatetime, { zone: 'UTC' }).setZone(visitorTimezone);
        return aStart.toMillis() - bStart.toMillis();
      });
    });

    return grouped;
  }, [events, visitorTimezone]);

  // Get week days
  const weekDays = useMemo(() => {
    if (!visitorTimezone) return [];
    const now = DateTime.now().setZone(visitorTimezone);
    const weekStart = now.startOf('week');
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(weekStart.plus({ days: i }).toJSDate());
    }
    return days;
  }, [visitorTimezone]);

  const handleBookClick = (event: PublicScheduleEvent) => {
    setSelectedEvent(event);
    setIsBookingModalOpen(true);
    setBookingConfirmed(false);
  };

  const handleBookingSuccess = () => {
    setBookingConfirmed(true);
    setIsBookingModalOpen(false);
    // Refetch schedule to update available slots
    const fetchSchedule = async () => {
      try {
        const data = await publicApi.getSchedule(weekRange.start, weekRange.end);
        setEvents(data);
      } catch (err: any) {
        // Silent fail on refetch
      }
    };
    fetchSchedule();
  };

  const formatTime = (isoString: string): string => {
    const dt = DateTime.fromISO(isoString, { zone: 'UTC' });
    const visitorTime = dt.setZone(visitorTimezone);
    return visitorTime.toFormat('h:mm a');
  };

  const formatDate = (date: Date): string => {
    const dt = DateTime.fromJSDate(date, { zone: visitorTimezone });
    return dt.toFormat('EEEE, MMMM d');
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your meeting has been confirmed.</h1>
          <p className="text-gray-600 mb-6">We&apos;ll send you a confirmation email shortly.</p>
          <button
            onClick={() => {
              setBookingConfirmed(false);
              setSelectedEvent(null);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Another Meeting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Book a Meeting</h1>
          <p className="text-gray-600">Select an available time slot below</p>
          {visitorTimezone && visitorTimezone !== 'Asia/Manila' && (
            <div className="mt-4 inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Your Timezone: {visitorTimezone}
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-gray-600">Loading available slots...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Week View */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {weekDays.map((day, index) => {
              const dayKey = DateTime.fromJSDate(day, { zone: visitorTimezone }).toFormat('yyyy-MM-dd');
              const dayEvents = eventsByDay[dayKey] || [];

              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {formatDate(day)}
                  </h3>
                  {dayEvents.length === 0 ? (
                    <p className="text-sm text-gray-500">No available slots</p>
                  ) : (
                    <div className="space-y-3">
                      {dayEvents.map((event) => {
                        const start = DateTime.fromISO(event.startDatetime, { zone: 'UTC' });
                        const end = DateTime.fromISO(event.endDatetime, { zone: 'UTC' });
                        const visitorStart = start.setZone(visitorTimezone);
                        const visitorEnd = end.setZone(visitorTimezone);

                        return (
                          <div
                            key={event.id}
                            className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 transition-colors"
                          >
                            <div className="text-sm font-medium text-gray-900 mb-1">
                              {formatTime(event.startDatetime)} - {formatTime(event.endDatetime)}
                            </div>
                            <button
                              onClick={() => handleBookClick(event)}
                              className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                              Book
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedEvent && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
          visitorTimezone={visitorTimezone}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { publicApi, type PublicScheduleEvent, type CreateBookingRequest } from '@/lib/api/public';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: PublicScheduleEvent;
  visitorTimezone: string;
  onSuccess: () => void;
}

export function BookingModal({ isOpen, onClose, event, visitorTimezone, onSuccess }: BookingModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form from event
  useEffect(() => {
    if (event) {
      const start = DateTime.fromISO(event.startDatetime, { zone: 'UTC' });
      const visitorStart = start.setZone(visitorTimezone);
      
      setDate(visitorStart.toFormat('yyyy-MM-dd'));
      setTime(visitorStart.toFormat('HH:mm'));
    }
  }, [event, visitorTimezone]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Validate time is within slot bounds
    const slotStart = DateTime.fromISO(event.startDatetime, { zone: 'UTC' }).setZone(visitorTimezone);
    const slotEnd = DateTime.fromISO(event.endDatetime, { zone: 'UTC' }).setZone(visitorTimezone);
    const selectedDateTime = DateTime.fromISO(`${date}T${time}`, { zone: visitorTimezone });

    if (selectedDateTime < slotStart || selectedDateTime >= slotEnd) {
      setError('Selected time must be within the slot bounds');
      setLoading(false);
      return;
    }

    try {
      const bookingData: CreateBookingRequest = {
        calendarEventId: event.id,
        name,
        email,
        message: message || undefined,
        timezone: visitorTimezone,
      };

      await publicApi.createBooking(bookingData);
      onSuccess();
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || 'Failed to book meeting';
      if (errorMessage.includes('already booked') || errorMessage.includes('taken')) {
        setError('Sorry, this time has just been booked. Please select another slot.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const slotStart = DateTime.fromISO(event.startDatetime, { zone: 'UTC' }).setZone(visitorTimezone);
  const slotEnd = DateTime.fromISO(event.endDatetime, { zone: 'UTC' }).setZone(visitorTimezone);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Book Meeting</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={slotStart.toFormat('yyyy-MM-dd')}
                max={slotStart.toFormat('yyyy-MM-dd')}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Available: {slotStart.toFormat('MMM d, yyyy')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                min={slotStart.toFormat('HH:mm')}
                max={slotEnd.toFormat('HH:mm')}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Slot: {slotStart.toFormat('h:mm a')} - {slotEnd.toFormat('h:mm a')}
              </p>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {loading ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

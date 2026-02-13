import { apiClient } from './client';

export interface PublicScheduleEvent {
  id: string;
  title: string;
  startDatetime: string;
  endDatetime: string;
  timezone: string;
  status: 'open_slot';
  visibility: 'public_open';
}

export interface CreateBookingRequest {
  calendarEventId: string;
  name: string;
  email: string;
  message?: string;
  timezone: string;
}

export const publicApi = {
  getSchedule: async (start: string, end: string): Promise<PublicScheduleEvent[]> => {
    const response = await apiClient.get('/public/schedule', {
      params: { start, end },
    });
    return response.data.data;
  },

  createBooking: async (input: CreateBookingRequest): Promise<any> => {
    const response = await apiClient.post('/public/book', input);
    return response.data.data;
  },
};

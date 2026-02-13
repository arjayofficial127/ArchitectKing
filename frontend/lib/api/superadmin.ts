import { apiClient } from './client';

// Calendar Event Types
export interface CalendarEvent {
  id: string;
  ownerUserId: string;
  title: string;
  agenda: string | null;
  notes: string | null;
  startDatetime: string;
  endDatetime: string;
  timezone: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'open_slot';
  visibility: 'private' | 'public_open';
  recurrenceRule: Record<string, any> | null;
  recurrenceParentId: string | null;
  color: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCalendarEventInput {
  title: string;
  agenda?: string;
  notes?: string;
  startDatetime: string;
  endDatetime: string;
  timezone?: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'open_slot';
  visibility: 'private' | 'public_open';
  recurrenceRule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval?: number;
    endDate?: string;
    count?: number;
    byDay?: string[];
    byMonthDay?: number[];
  };
  color?: string;
}

export interface UpdateCalendarEventInput {
  title?: string;
  agenda?: string;
  notes?: string;
  startDatetime?: string;
  endDatetime?: string;
  timezone?: string;
  status?: 'scheduled' | 'completed' | 'cancelled' | 'open_slot';
  visibility?: 'private' | 'public_open';
  recurrenceRule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval?: number;
    endDate?: string;
    count?: number;
    byDay?: string[];
    byMonthDay?: number[];
  } | null;
  color?: string;
}

// Prospect Types
export interface Prospect {
  id: string;
  type: 'person' | 'company';
  name: string;
  targetBudget: number | null;
  status: 'new' | 'contacted' | 'meeting' | 'proposal' | 'closed' | 'lost' | 'other';
  swimlane: string | null;
  tags: string[];
  notes: string | null;
  websiteUrl: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProspectInput {
  type: 'person' | 'company';
  name: string;
  targetBudget?: number;
  status: 'new' | 'contacted' | 'meeting' | 'proposal' | 'closed' | 'lost' | 'other';
  swimlane?: string;
  tags?: string[];
  notes?: string;
  websiteUrl?: string;
  imageUrl?: string;
}

export interface UpdateProspectInput {
  type?: 'person' | 'company';
  name?: string;
  targetBudget?: number | null;
  status?: 'new' | 'contacted' | 'meeting' | 'proposal' | 'closed' | 'lost' | 'other';
  swimlane?: string | null;
  tags?: string[];
  notes?: string | null;
  websiteUrl?: string | null;
  imageUrl?: string | null;
}

// Notification Types
export interface SuperAdminNotification {
  id: string;
  type: 'booking_request' | 'system' | 'reminder';
  relatedId: string | null;
  read: boolean;
  createdAt: string;
}

// Booking Request Types
export interface BookingRequest {
  id: string;
  calendarEventId: string;
  name: string;
  email: string;
  message: string | null;
  timezoneAtBooking: string | null;
  status: string;
  createdAt: string;
}

// Folder Types
export interface Folder {
  id: string;
  parentFolderId: string | null;
  name: string;
  ownerUserId: string;
  createdAt: string;
}

export interface CreateFolderInput {
  name: string;
  parentFolderId?: string | null;
}

export interface UpdateFolderInput {
  name?: string;
  parentFolderId?: string | null;
}

// SuperAdmin File Types
export interface SuperAdminFile {
  id: string;
  folderId: string | null;
  name: string;
  fileType: 'txt' | 'md' | 'rtf';
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSuperAdminFileInput {
  name: string;
  fileType: 'txt' | 'md' | 'rtf';
  folderId?: string | null;
  content?: string;
}

export interface UpdateSuperAdminFileInput {
  name?: string;
  content?: string;
  folderId?: string | null;
}

export const superadminApi = {
  // Calendar
  getEvents: async (start: string, end: string): Promise<CalendarEvent[]> => {
    const response = await apiClient.get('/superadmin/calendar/range', {
      params: { start, end },
    });
    return response.data.data;
  },

  createEvent: async (input: CreateCalendarEventInput): Promise<CalendarEvent> => {
    const response = await apiClient.post('/superadmin/calendar', input);
    return response.data.data;
  },

  updateEvent: async (id: string, input: UpdateCalendarEventInput, mode: 'single' | 'series' = 'single'): Promise<CalendarEvent> => {
    const response = await apiClient.patch(`/superadmin/calendar/${id}`, input, {
      params: { mode },
    });
    return response.data.data;
  },

  deleteEvent: async (id: string, mode: 'single' | 'series' = 'single'): Promise<void> => {
    await apiClient.delete(`/superadmin/calendar/${id}?mode=${mode}`);
  },

  // Prospects
  getProspects: async (filters?: { status?: string; swimlane?: string; tags?: string[] }): Promise<Prospect[]> => {
    const response = await apiClient.get('/superadmin/prospects', {
      params: filters,
    });
    return response.data.data;
  },

  createProspect: async (input: CreateProspectInput): Promise<Prospect> => {
    const response = await apiClient.post('/superadmin/prospects', input);
    return response.data.data;
  },

  updateProspect: async (id: string, input: UpdateProspectInput): Promise<Prospect> => {
    const response = await apiClient.patch(`/superadmin/prospects/${id}`, input);
    return response.data.data;
  },

  deleteProspect: async (id: string): Promise<void> => {
    await apiClient.delete(`/superadmin/prospects/${id}`);
  },

  moveSwimlane: async (id: string, swimlane: string): Promise<Prospect> => {
    const response = await apiClient.patch(`/superadmin/prospects/${id}/swimlane`, { swimlane });
    return response.data.data;
  },

  addTag: async (id: string, tag: string): Promise<Prospect> => {
    const response = await apiClient.post(`/superadmin/prospects/${id}/tags`, { tag });
    return response.data.data;
  },

  removeTag: async (id: string, tag: string): Promise<Prospect> => {
    const response = await apiClient.delete(`/superadmin/prospects/${id}/tags/${tag}`);
    return response.data.data;
  },

  linkMeeting: async (id: string, calendarEventId: string): Promise<any> => {
    const response = await apiClient.post(`/superadmin/prospects/${id}/meetings`, { calendarEventId });
    return response.data.data;
  },

  // Notifications
  getNotifications: async (unreadOnly: boolean = false): Promise<SuperAdminNotification[]> => {
    const response = await apiClient.get('/superadmin/notifications', {
      params: { unread: unreadOnly },
    });
    return response.data.data;
  },

  markNotificationAsRead: async (id: string): Promise<SuperAdminNotification> => {
    const response = await apiClient.patch(`/superadmin/notifications/${id}/read`);
    return response.data.data;
  },

  // Folders
  getFolders: async (): Promise<Folder[]> => {
    const response = await apiClient.get('/superadmin/files/folders');
    return response.data.data;
  },

  createFolder: async (input: CreateFolderInput): Promise<Folder> => {
    const response = await apiClient.post('/superadmin/files/folders', input);
    return response.data.data;
  },

  updateFolder: async (id: string, input: UpdateFolderInput): Promise<Folder> => {
    const response = await apiClient.patch(`/superadmin/files/folders/${id}`, input);
    return response.data.data;
  },

  deleteFolder: async (id: string): Promise<void> => {
    await apiClient.delete(`/superadmin/files/folders/${id}`);
  },

  // Files
  getFiles: async (folderId?: string | null): Promise<SuperAdminFile[]> => {
    const response = await apiClient.get('/superadmin/files', {
      params: folderId ? { folderId } : {},
    });
    return response.data.data;
  },

  getFile: async (id: string): Promise<SuperAdminFile> => {
    const response = await apiClient.get(`/superadmin/files/${id}`);
    return response.data.data;
  },

  createFile: async (input: CreateSuperAdminFileInput): Promise<SuperAdminFile> => {
    const response = await apiClient.post('/superadmin/files', input);
    return response.data.data;
  },

  updateFile: async (id: string, input: UpdateSuperAdminFileInput): Promise<SuperAdminFile> => {
    const response = await apiClient.patch(`/superadmin/files/${id}`, input);
    return response.data.data;
  },

  deleteFile: async (id: string): Promise<void> => {
    await apiClient.delete(`/superadmin/files/${id}`);
  },
};

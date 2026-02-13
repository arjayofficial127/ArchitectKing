'use client';

import { useState, useEffect } from 'react';
import { superadminApi, type SuperAdminNotification } from '@/lib/api/superadmin';

export function useNotifications(unreadOnly: boolean = false) {
  const [notifications, setNotifications] = useState<SuperAdminNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await superadminApi.getNotifications(unreadOnly);
      setNotifications(data);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [unreadOnly]);

  const markAsRead = async (id: string) => {
    try {
      const updated = await superadminApi.markNotificationAsRead(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? updated : n)));
      return updated;
    } catch (err: any) {
      throw new Error(err.response?.data?.error?.message || 'Failed to mark notification as read');
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    loading,
    error,
    unreadCount,
    fetchNotifications,
    markAsRead,
  };
}

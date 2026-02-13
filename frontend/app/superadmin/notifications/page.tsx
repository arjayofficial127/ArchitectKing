'use client';

import { useNotifications } from '@/hooks/superadmin/useNotifications';

export default function SuperAdminNotificationsPage() {
  const { notifications, loading, error, markAsRead } = useNotifications(false);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600 mt-1">SuperAdmin notifications</p>
      </div>

      {loading && (
        <div className="text-gray-600">Loading notifications...</div>
      )}

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
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border rounded p-4 ${
                  notification.read
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-blue-200 bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {notification.type}
                      </span>
                      {!notification.read && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
                          New
                        </span>
                      )}
                    </div>
                    <pre className="text-xs overflow-auto text-gray-700">
                      {JSON.stringify(notification, null, 2)}
                    </pre>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="ml-4 px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

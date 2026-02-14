'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useNotifications } from '@/hooks/superadmin/useNotifications';
import { useOrgSession } from '@/providers/OrgSessionProvider';

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

export function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const pathname = usePathname();
  const { unreadCount } = useNotifications(true);
  const orgSession = useOrgSession();
  const activeOrgId = orgSession.activeOrgId;
  const activeOrg = orgSession.activeOrg;
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const manilaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
      
      setCurrentTime(manilaTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      }));
      
      setCurrentDate(manilaTime.toLocaleDateString('en-US', { 
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { href: '/superadmin/dashboard', label: 'Dashboard' },
    { href: '/superadmin/calendar', label: 'Calendar' },
    { href: '/superadmin/prospects', label: 'Prospects' },
    { href: '/superadmin/files', label: 'Files' },
    { href: '/superadmin/notifications', label: 'Notifications' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">SuperAdmin</h1>
            <p className="text-sm text-gray-500 mt-1">Control OS</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Manila Time:</span>
                <span className="text-sm font-medium text-gray-900">{currentTime}</span>
              </div>
              <div className="text-sm text-gray-500">{currentDate}</div>
            </div>
            
            <div className="flex items-center space-x-4">
              {activeOrgId && activeOrg && (
                <Link
                  href={`/orgs/${activeOrgId}/dashboard`}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  title={`Back to ${activeOrg.name}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span className="hidden sm:inline">{activeOrg.name}</span>
                </Link>
              )}
              <Link
                href="/superadmin/notifications"
                className="relative flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

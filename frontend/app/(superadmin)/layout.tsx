'use client';

import { useRequireSuperAdmin } from '@/hooks/useRequireSuperAdmin';
import { SuperAdminLayout } from '@/components/superadmin/SuperAdminLayout';

export default function SuperAdminRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loading } = useRequireSuperAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return <SuperAdminLayout>{children}</SuperAdminLayout>;
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthSession } from '@/providers/AuthSessionProvider';
import { useSuperAdmin } from '@/hooks/useSuperAdmin';

/**
 * Hook to require SuperAdmin access
 * Redirects to login if not authenticated
 * Redirects to / if not SuperAdmin
 */
export function useRequireSuperAdmin() {
  const router = useRouter();
  const authSession = useAuthSession();
  const { isSuperAdmin, loading: superAdminLoading } = useSuperAdmin();

  useEffect(() => {
    // Wait for auth and super admin checks to complete
    if (authSession.status === 'loading' || superAdminLoading) {
      return;
    }

    // If not logged in, redirect to login
    if (!authSession.user) {
      router.push('/login');
      return;
    }

    // If not SuperAdmin, redirect to home
    if (!isSuperAdmin) {
      router.push('/');
      return;
    }
  }, [authSession.status, authSession.user, isSuperAdmin, superAdminLoading, router]);

  return {
    isAuthenticated: !!authSession.user,
    isSuperAdmin,
    loading: authSession.status === 'loading' || superAdminLoading,
  };
}

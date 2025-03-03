'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import type { UserRole } from '@/types/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ 
  children, 
  allowedRoles = ['admin', 'teacher', 'student', 'content_creator', 'parent'] 
}: ProtectedRouteProps) {
  const { isAuthenticated, loading, userRole, isAuthorized } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Don't redirect while still loading
    if (loading) return;

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    // If authenticated but not authorized for this route
    if (!isAuthorized(allowedRoles)) {
      // Redirect based on role
      if (userRole === 'student') {
        router.push('/student-dashboard');
      } else if (userRole === 'parent') {
        router.push('/parent-dashboard');
      } else if (['teacher', 'admin', 'content_creator'].includes(userRole || '')) {
        router.push('/');
      } else {
        // Fallback
        router.push('/auth');
      }
    }
  }, [isAuthenticated, loading, userRole, router, allowedRoles, isAuthorized]);

  // Show nothing while loading or redirecting
  if (loading || !isAuthenticated || !isAuthorized(allowedRoles)) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-edu-blue border-t-transparent"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

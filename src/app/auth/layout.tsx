'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading, userRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while still loading
    if (loading) return;

    // If already authenticated, redirect to appropriate dashboard
    if (isAuthenticated) {
      if (userRole === 'student') {
        router.push('/student-dashboard');
      } else if (userRole === 'parent') {
        router.push('/parent-dashboard');
      } else {
        router.push('/');
      }
    }
  }, [isAuthenticated, loading, userRole, router]);

  // Show loading indicator while checking auth state
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-edu-blue border-t-transparent"></div>
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated or still loading, show auth pages
  return <>{children}</>;
}

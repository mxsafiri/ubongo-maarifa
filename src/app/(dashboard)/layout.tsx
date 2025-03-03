'use client';

import { DashboardNav } from '@/components/layout/dashboard-nav';
import { Header } from '@/components/layout/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen bg-background">
      {/* Left Sidebar - Navigation */}
      <div className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:flex">
        <div className="flex h-16 items-center border-b px-6">
          <span className="text-heading-sm font-bold text-primary">Ubongo Maarifa</span>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto px-3 py-4">
          <DashboardNav />
        </div>
      </div>

      {/* Mobile Nav - We'll implement this later */}
      <div className="md:hidden">
        {/* Mobile menu button will go here */}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col md:pl-64">
        {/* Header */}
        <Header />
        
        {/* Main Content */}
        <main className="relative flex-1 px-4 py-8 md:px-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

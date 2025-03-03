import { ReactNode } from 'react';
import { Header } from './header';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {/* Left sidebar - 64px width as per UI/UX decisions */}
        <aside className="w-16 min-h-screen border-r bg-background">
          {/* Add sidebar content here */}
        </aside>

        {/* Main content area */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}

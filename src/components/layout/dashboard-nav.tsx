'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Mail,
  BookOpen,
  Users,
  FolderOpen,
  Bot,
  BarChart2,
  Settings,
  LogOut,
} from 'lucide-react';

const mainNavigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Inbox', href: '/inbox', icon: Mail },
  { name: 'Lessons', href: '/lessons', icon: BookOpen },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Content Library', href: '/content-library', icon: FolderOpen },
  { name: 'AI Assistants', href: '/ai-assistants', icon: Bot },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Lead Teacher',
    avatar: '/avatars/sarah.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'Art Specialist',
    avatar: '/avatars/michael.jpg',
  },
  {
    name: 'Emma Davis',
    role: 'Language Expert',
    avatar: '/avatars/emma.jpg',
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="mb-8 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <span className="text-lg font-bold text-primary-foreground">U</span>
        </div>
        <span className="text-lg font-semibold">Ubongo Maarifa</span>
      </div>

      {/* Main Navigation */}
      <div className="space-y-4">
        <div className="px-2 text-xs font-semibold uppercase text-muted-foreground">
          Overview
        </div>
        <nav className="grid gap-1">
          {mainNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Team Section */}
      <div className="mt-8 space-y-4">
        <div className="px-2 text-xs font-semibold uppercase text-muted-foreground">
          Team
        </div>
        <nav className="grid gap-1">
          {team.map((member) => (
            <Link
              key={member.name}
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{member.name}</span>
                <span className="text-xs text-muted-foreground">{member.role}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Settings & Logout */}
      <div className="mt-auto space-y-4">
        <nav className="grid gap-1">
          <Link
            href="/settings"
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
              pathname === '/settings'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-primary/10 hover:text-primary'
            )}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Link>
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-500 transition-colors hover:bg-red-500/10"
            onClick={() => {/* Add logout handler */}}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

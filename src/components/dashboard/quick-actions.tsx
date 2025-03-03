'use client';

import {
  BookOpen,
  FileText,
  Users,
  Video,
  MessageSquare,
  Calendar,
  PlusCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const quickActions = [
  {
    label: 'Create Lesson Plan',
    icon: BookOpen,
    action: () => console.log('Create Lesson Plan'),
  },
  {
    label: 'Add Learning Resource',
    icon: FileText,
    action: () => console.log('Add Learning Resource'),
  },
  {
    label: 'Schedule Class',
    icon: Calendar,
    action: () => console.log('Schedule Class'),
  },
  {
    label: 'Record Video Lesson',
    icon: Video,
    action: () => console.log('Record Video Lesson'),
  },
  {
    label: 'Student Assessment',
    icon: Users,
    action: () => console.log('Student Assessment'),
  },
  {
    label: 'Send Announcement',
    icon: MessageSquare,
    action: () => console.log('Send Announcement'),
  },
];

export function QuickActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Quick Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {quickActions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.action}
            className="flex cursor-pointer items-center gap-2 p-3"
          >
            <action.icon className="h-4 w-4" />
            <span>{action.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

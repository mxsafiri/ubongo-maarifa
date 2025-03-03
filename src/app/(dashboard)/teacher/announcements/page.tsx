'use client';

import { useState } from 'react';
import { CreateAnnouncementModal } from '@/components/teacher/announcement/CreateAnnouncementModal';
import { AnnouncementCard } from '@/components/teacher/announcement/AnnouncementCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

// Mock data
const mockAnnouncements = [
  {
    id: '1',
    title: 'End of Term Assessments',
    content: 'Dear students, our end of term assessments will begin next week. Please ensure you have completed all your assignments and revision materials.',
    author: {
      name: 'Ms. Sarah',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    },
    publishAt: new Date('2024-03-15'),
    createdAt: new Date('2024-03-01'),
    status: 'published' as const,
    targetGroups: ['all'],
    enableComments: true,
    isPinned: true,
    views: 245,
    comments: 18,
  },
  {
    id: '2',
    title: 'Parent-Teacher Meeting',
    content: 'We will be holding our quarterly parent-teacher meeting next Friday. Please inform your parents/guardians about this important event.',
    author: {
      name: 'Mr. John',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    },
    publishAt: new Date('2024-03-20'),
    createdAt: new Date('2024-03-02'),
    status: 'scheduled' as const,
    targetGroups: ['class-1a', 'class-1b'],
    enableComments: false,
    isPinned: false,
    views: 0,
    comments: 0,
  },
];

const mockClassGroups = [
  { id: 'class-1a', name: 'Class 1A' },
  { id: 'class-1b', name: 'Class 1B' },
  { id: 'class-2a', name: 'Class 2A' },
  { id: 'class-2b', name: 'Class 2B' },
];

export default function AnnouncementsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [announcements, setAnnouncements] = useState(mockAnnouncements);

  const handleCreate = (announcementData: any) => {
    // TODO: Implement Firebase integration
    console.log('Creating announcement:', announcementData);
  };

  const handleEdit = (id: string) => {
    // TODO: Implement edit functionality
    console.log('Editing announcement:', id);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Deleting announcement:', id);
  };

  const handleTogglePin = (id: string) => {
    setAnnouncements(prevAnnouncements =>
      prevAnnouncements.map(announcement =>
        announcement.id === id
          ? { ...announcement, isPinned: !announcement.isPinned }
          : announcement
      )
    );
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort announcements: pinned first, then by date
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.publishAt.getTime() - a.publishAt.getTime();
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <CreateAnnouncementModal 
          onAnnouncementCreate={handleCreate}
          classGroups={mockClassGroups}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {sortedAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onTogglePin={handleTogglePin}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

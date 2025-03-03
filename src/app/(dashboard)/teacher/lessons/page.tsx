'use client';

import { useState } from 'react';
import { CreateLessonModal } from '@/components/teacher/lesson/CreateLessonModal';
import { LessonCard } from '@/components/teacher/lesson/LessonCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

// Temporary mock data
const mockLessons = [
  {
    id: '1',
    title: 'Introduction to Numbers',
    description: 'Basic number recognition and counting for early learners',
    schedule: new Date('2024-03-10'),
    status: 'scheduled' as const,
    studentsEnrolled: 15,
    objectives: 'Count numbers 1-10\nRecognize written numbers\nMatch quantities to numbers',
  },
  {
    id: '2',
    title: 'Colors and Shapes',
    description: 'Learning primary colors and basic shapes',
    schedule: new Date('2024-03-12'),
    status: 'draft' as const,
    studentsEnrolled: 12,
    objectives: 'Identify primary colors\nName basic shapes\nSort objects by color and shape',
  },
];

export default function LessonsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleCreateLesson = (lessonData: any) => {
    // TODO: Implement Firebase integration
    console.log('Creating lesson:', lessonData);
  };

  const handleEditLesson = (id: string) => {
    // TODO: Implement edit functionality
    console.log('Editing lesson:', id);
  };

  const handleDeleteLesson = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Deleting lesson:', id);
  };

  const filteredLessons = mockLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lesson.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Lessons</h1>
        <CreateLessonModal onLessonCreate={handleCreateLesson} />
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lessons..."
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
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLessons.map((lesson) => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            onEdit={handleEditLesson}
            onDelete={handleDeleteLesson}
          />
        ))}
      </div>
    </div>
  );
}

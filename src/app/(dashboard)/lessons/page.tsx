'use client';

import { LessonCreator } from '@/components/teacher/lesson/LessonCreator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, Book } from 'lucide-react';

export default function LessonsPage() {
  const stats = [
    { name: 'Total Lessons', value: '156', subtext: 'Active curriculum' },
    { name: 'Active Sessions', value: '42', subtext: 'Currently running' },
    { name: 'Student Engagement', value: '89%', subtext: 'Average participation' },
    { name: 'Completion Rate', value: '78%', subtext: 'Last 30 days' },
  ];

  const lessons = [
    {
      name: 'Introduction to Colors',
      subject: 'Art & Creativity',
      duration: '45 minutes',
      enrolled: '24 students enrolled',
      description: 'Learn about primary and secondary colors through interactive activities.',
      status: 'Active',
      completion: 85,
    },
    {
      name: 'Numbers 1-10',
      subject: 'Mathematics',
      duration: '30 minutes',
      enrolled: '18 students enrolled',
      description: 'Basic number recognition and counting practice for beginners.',
      status: 'Draft',
      completion: 0,
    },
    {
      name: 'Story Time: The Little Red Hen',
      subject: 'Language & Literacy',
      duration: '40 minutes',
      enrolled: '22 students enrolled',
      description: 'Interactive storytelling session with comprehension activities.',
      status: 'Active',
      completion: 65,
    },
  ];

  return (
    <div className="container space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lesson Planning</h1>
          <p className="text-lg text-muted-foreground">
            Create and manage engaging learning experiences
          </p>
        </div>
        <LessonCreator />
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <Input
          type="search"
          placeholder="Search lessons..."
          className="max-w-[400px]"
        />
        <Button variant="outline">Filters</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-card">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{stat.name}</p>
              <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid gap-6">
        {lessons.map((lesson) => (
          <Card key={lesson.name} className="bg-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold">{lesson.name}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      lesson.status === 'Active' 
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {lesson.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{lesson.subject}</p>
                  <p className="text-sm">{lesson.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {lesson.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {lesson.enrolled}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">View Details</Button>
                  {lesson.status === 'Active' && (
                    <Button>Start Session</Button>
                  )}
                </div>
              </div>
              {lesson.completion > 0 && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Completion Rate</span>
                    <span className="text-muted-foreground">{lesson.completion}%</span>
                  </div>
                  <Progress value={lesson.completion} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

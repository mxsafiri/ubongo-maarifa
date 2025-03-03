'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Book, Clock, Users, Video } from 'lucide-react';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { UpcomingTasks } from '@/components/dashboard/upcoming-tasks';
import { StudentEngagement } from '@/components/dashboard/student-engagement';

const courses = [
  {
    id: 1,
    title: 'Basic Numbers',
    description: 'Foundational mathematics concepts for early learners',
    category: 'Mathematics',
    progress: 40,
    totalLessons: 8,
    completedLessons: 2,
    students: 24,
    tag: 'MATHEMATICS',
    tagColor: 'bg-info-light text-info-dark',
  },
  {
    id: 2,
    title: 'Reading Skills',
    description: 'Early literacy and phonics development',
    category: 'Language',
    progress: 60,
    totalLessons: 8,
    completedLessons: 3,
    students: 18,
    tag: 'LANGUAGE',
    tagColor: 'bg-success-light text-success-dark',
  },
  {
    id: 3,
    title: 'Colors & Shapes',
    description: 'Creative exploration of colors and geometric shapes',
    category: 'Art',
    progress: 85,
    totalLessons: 7,
    completedLessons: 6,
    students: 22,
    tag: 'ART',
    tagColor: 'bg-warning-light text-warning-dark',
  },
];

const stats = [
  {
    label: 'Total Students',
    value: '64',
    icon: Users,
    trend: '+12% from last month',
  },
  {
    label: 'Course Progress',
    value: '62%',
    icon: Book,
    trend: '+5% improvement',
  },
  {
    label: 'Teaching Hours',
    value: '24.5',
    icon: Clock,
    trend: '8 hours this week',
  },
  {
    label: 'Video Lessons',
    value: '18',
    icon: Video,
    trend: '3 new this month',
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-heading-lg font-bold tracking-tight">Welcome back, Teacher!</h1>
          <p className="text-body-lg text-muted-foreground">
            Here's an overview of your teaching progress and student engagement.
          </p>
        </div>
        <QuickActions />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="card-hover">
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{stat.label}</span>
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="space-y-1">
                <h4 className="text-heading-md font-bold">{stat.value}</h4>
                <p className="text-sm text-muted-foreground">{stat.trend}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-6">
        {/* Left Column - Course Progress */}
        <div className="space-y-6 lg:col-span-4">
          {/* Active Courses */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-heading-sm font-semibold">Active Courses</h3>
              <button className="button-primary">View All Courses</button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="card-hover overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video overflow-hidden bg-muted">
                      <div className="flex h-full items-center justify-center bg-primary/5">
                        <Book className="h-8 w-8 text-primary/40" />
                      </div>
                    </div>
                    <div className="space-y-4 p-6">
                      <div className="space-y-2">
                        <span className={`badge ${course.tagColor}`}>
                          {course.tag}
                        </span>
                        <h4 className="line-clamp-1 font-semibold">{course.title}</h4>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {course.description}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {course.completedLessons}/{course.totalLessons} Lessons
                          </span>
                          <span className="font-medium text-primary">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} className="h-1" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{course.students} Students</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Student Engagement Section */}
          <StudentEngagement />
        </div>

        {/* Right Column - Tasks & Activities */}
        <div className="space-y-6 lg:col-span-2">
          <UpcomingTasks />
        </div>
      </div>
    </div>
  );
}

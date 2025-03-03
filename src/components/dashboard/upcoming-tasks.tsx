'use client';

import { Calendar, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const upcomingTasks = [
  {
    id: 1,
    title: 'Mathematics Class',
    type: 'class',
    time: '10:00 AM',
    date: 'Today',
    students: 24,
    icon: Users,
  },
  {
    id: 2,
    title: 'Review Student Assignments',
    type: 'task',
    time: '2:30 PM',
    date: 'Today',
    icon: Clock,
  },
  {
    id: 3,
    title: 'Parent-Teacher Meeting',
    type: 'meeting',
    time: '11:00 AM',
    date: 'Tomorrow',
    icon: Calendar,
  },
];

export function UpcomingTasks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-heading-sm">Upcoming Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <div className="rounded-full bg-primary/10 p-2 text-primary">
                <task.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{task.title}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{task.date}</span>
                  <span>•</span>
                  <span>{task.time}</span>
                  {task.students && (
                    <>
                      <span>•</span>
                      <span>{task.students} students</span>
                    </>
                  )}
                </div>
              </div>
              <button className="rounded-full p-2 hover:bg-accent">
                <Clock className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

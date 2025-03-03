'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, BookOpen } from 'lucide-react';

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    schedule: Date;
    status: 'draft' | 'scheduled' | 'active' | 'completed';
    studentsEnrolled: number;
    objectives: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function LessonCard({ lesson, onEdit, onDelete }: LessonCardProps) {
  const statusColors = {
    draft: 'bg-muted text-muted-foreground',
    scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    completed: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{lesson.title}</CardTitle>
            <CardDescription className="mt-2">{lesson.description}</CardDescription>
          </div>
          <Badge className={statusColors[lesson.status]}>
            {lesson.status.charAt(0).toUpperCase() + lesson.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {lesson.schedule.toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4" />
              {lesson.studentsEnrolled} Students
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-1 h-4 w-4" />
              {lesson.objectives.split('\n').length} Objectives
            </div>
          </div>

          <div className="text-sm">
            <strong className="font-medium">Objectives:</strong>
            <ul className="mt-1 list-inside list-disc">
              {lesson.objectives.split('\n').map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button
          variant="ghost"
          onClick={() => onDelete && onDelete(lesson.id)}
        >
          Delete
        </Button>
        <Button
          variant="outline"
          onClick={() => onEdit && onEdit(lesson.id)}
        >
          Edit
        </Button>
        <Button>View Lesson</Button>
      </CardFooter>
    </Card>
  );
}

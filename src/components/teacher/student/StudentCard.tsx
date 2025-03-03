'use client';

import { useState } from 'react';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical, Book, Award, Clock } from 'lucide-react';

interface StudentCardProps {
  student: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage?: string;
    classGroup: string;
    attendance: number;
    performance: number;
    lastActivity: Date;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewProgress?: (id: string) => void;
}

export function StudentCard({ student, onEdit, onDelete, onViewProgress }: StudentCardProps) {
  const getPerformanceBadge = (performance: number) => {
    if (performance >= 80) return <Badge className="bg-success text-success-foreground">Excellent</Badge>;
    if (performance >= 60) return <Badge className="bg-info text-info-foreground">Good</Badge>;
    if (performance >= 40) return <Badge className="bg-warning text-warning-foreground">Fair</Badge>;
    return <Badge className="bg-destructive text-destructive-foreground">Needs Help</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={student.profileImage} />
              <AvatarFallback>
                {student.firstName[0]}
                {student.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{`${student.firstName} ${student.lastName}`}</CardTitle>
              <CardDescription>{student.classGroup}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onViewProgress?.(student.id)}>
                View Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(student.id)}>
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(student.id)}
                className="text-destructive"
              >
                Remove Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Book className="mr-1 h-4 w-4" />
              Performance
            </div>
            {getPerformanceBadge(student.performance)}
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              Attendance
            </div>
            <div className="text-sm font-medium">{student.attendance}%</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Last active: {student.lastActivity.toLocaleDateString()}
      </CardFooter>
    </Card>
  );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Award, TrendingUp, Users } from 'lucide-react';

const engagementMetrics = [
  {
    id: 1,
    student: 'Class 3A',
    attendance: 95,
    participation: 88,
    assignments: 92,
    trend: 'up',
  },
  {
    id: 2,
    student: 'Class 3B',
    attendance: 88,
    participation: 75,
    assignments: 85,
    trend: 'up',
  },
  {
    id: 3,
    student: 'Class 3C',
    attendance: 92,
    participation: 82,
    assignments: 88,
    trend: 'up',
  },
];

export function StudentEngagement() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-heading-sm">Student Engagement</CardTitle>
        <div className="flex items-center gap-4">
          <button className="text-sm text-primary hover:text-primary/80">
            View Details
          </button>
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <Users className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {engagementMetrics.map((metric) => (
            <div key={metric.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{metric.student}</span>
                    {metric.trend === 'up' && (
                      <TrendingUp className="h-4 w-4 text-success" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{metric.attendance}% Attendance</span>
                    <span>•</span>
                    <span>{metric.participation}% Participation</span>
                  </div>
                </div>
                {metric.assignments >= 90 && (
                  <div className="rounded-full bg-success-light p-1.5">
                    <Award className="h-4 w-4 text-success" />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Assignment Completion</span>
                  <span className="font-medium">{metric.assignments}%</span>
                </div>
                <Progress value={metric.assignments} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Calendar, 
  TrendingUp, 
  Users, 
  Clock, 
  Award,
  BookOpen,
  Target,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface ProgressMetric {
  id: string;
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: any;
}

interface SubjectPerformance {
  id: string;
  name: string;
  completionRate: number;
  averageScore: number;
  totalStudents: number;
  trend: 'up' | 'down';
  change: number;
}

const mockProgressMetrics: ProgressMetric[] = [
  {
    id: '1',
    title: 'Active Students',
    value: '248',
    change: 12.5,
    trend: 'up',
    icon: Users
  },
  {
    id: '2',
    title: 'Average Time Spent',
    value: '45.2m',
    change: 8.2,
    trend: 'up',
    icon: Clock
  },
  {
    id: '3',
    title: 'Course Completion',
    value: '72.4%',
    change: -2.1,
    trend: 'down',
    icon: BookOpen
  },
  {
    id: '4',
    title: 'Learning Goals Met',
    value: '84.6%',
    change: 5.8,
    trend: 'up',
    icon: Target
  }
];

const mockSubjectPerformance: SubjectPerformance[] = [
  {
    id: '1',
    name: 'Mathematics',
    completionRate: 78,
    averageScore: 82,
    totalStudents: 156,
    trend: 'up',
    change: 4.2
  },
  {
    id: '2',
    name: 'Science',
    completionRate: 65,
    averageScore: 75,
    totalStudents: 142,
    trend: 'up',
    change: 2.8
  },
  {
    id: '3',
    name: 'Language Arts',
    completionRate: 89,
    averageScore: 88,
    totalStudents: 168,
    trend: 'down',
    change: 1.5
  },
  {
    id: '4',
    name: 'Social Studies',
    completionRate: 71,
    averageScore: 79,
    totalStudents: 134,
    trend: 'up',
    change: 3.6
  }
];

export default function AnalyticsPage() {
  const timeRanges = ['Last 7 days', 'Last 30 days', 'Last 3 months', 'Last year'];

  return (
    <div className="container space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Progress Tracking</h1>
          <p className="text-lg text-muted-foreground">
            Monitor student performance and learning outcomes
          </p>
        </div>
        <Select defaultValue="Last 30 days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map(range => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Progress Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockProgressMetrics.map((metric) => (
          <Card key={metric.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{metric.title}</span>
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <metric.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{metric.value}</p>
                <div className="mt-2 flex items-center gap-2">
                  {metric.trend === 'up' ? (
                    <Badge className="bg-edu-green/10 text-edu-green">
                      <ArrowUp className="mr-1 h-3 w-3" />
                      {metric.change}%
                    </Badge>
                  ) : (
                    <Badge className="bg-edu-red/10 text-edu-red">
                      <ArrowDown className="mr-1 h-3 w-3" />
                      {Math.abs(metric.change)}%
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">vs last period</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Subject Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {mockSubjectPerformance.map((subject) => (
              <div key={subject.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{subject.name}</span>
                      {subject.trend === 'up' ? (
                        <Badge className="bg-edu-green/10 text-edu-green">
                          <ArrowUp className="mr-1 h-3 w-3" />
                          {subject.change}%
                        </Badge>
                      ) : (
                        <Badge className="bg-edu-red/10 text-edu-red">
                          <ArrowDown className="mr-1 h-3 w-3" />
                          {Math.abs(subject.change)}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{subject.totalStudents} students</span>
                      <span>•</span>
                      <span>{subject.averageScore}% avg. score</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{subject.completionRate}%</div>
                    <div className="text-sm text-muted-foreground">completion rate</div>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div 
                    className="h-full rounded-full bg-edu-blue" 
                    style={{ width: `${subject.completionRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

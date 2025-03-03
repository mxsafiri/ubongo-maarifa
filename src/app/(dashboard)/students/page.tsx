'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, Trophy, AlertCircle } from 'lucide-react';
import { AddStudentDialog } from '@/components/students/AddStudentDialog';
import type { Student } from '@/types/student';
import Link from 'next/link';

const mockCourses = [
  { id: 'course1', name: 'Mathematics Fundamentals' },
  { id: 'course2', name: 'Basic Science' },
  { id: 'course3', name: 'Reading & Writing' },
];

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    profilePic: '/avatars/sarah.jpg',
    enrolledCourses: [
      {
        courseId: 'course1',
        level: 'Intermediate',
        progress: 85,
        lastActivity: new Date(),
        achievements: [
          {
            id: 'ach1',
            title: 'Perfect Score',
            description: 'Achieved 100% in weekly assessment',
            earnedAt: new Date(),
            courseId: 'course1',
            type: 'excellence'
          }
        ]
      }
    ],
    createdAt: new Date(),
    lastActive: new Date()
  },
  {
    id: '2',
    name: 'Michael Chen',
    profilePic: '/avatars/michael.jpg',
    enrolledCourses: [
      {
        courseId: 'course2',
        level: 'Beginner',
        progress: 65,
        lastActivity: new Date(),
        achievements: []
      }
    ],
    createdAt: new Date(),
    lastActive: new Date()
  }
];

export default function StudentsPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { 
      name: 'Total Students',
      value: '248',
      subtext: 'Active enrollment',
      icon: Users
    },
    { 
      name: 'Meeting Goals',
      value: '186',
      subtext: '75% of total',
      icon: Trophy
    },
    { 
      name: 'Needs Support',
      value: '62',
      subtext: '25% of total',
      icon: AlertCircle
    },
    { 
      name: 'Course Enrollment',
      value: '312',
      subtext: 'Total enrollments',
      icon: BookOpen
    }
  ];

  const getStatusText = (progress: number) => {
    if (progress >= 85) return 'Excelling';
    if (progress >= 65) return 'On Track';
    return 'Needs Support';
  };

  const filteredStudents = mockStudents
    .filter(student => 
      selectedCourse === 'all' || 
      student.enrolledCourses.some(course => course.courseId === selectedCourse)
    )
    .filter(student =>
      searchQuery === '' ||
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="container space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
          <p className="text-lg text-muted-foreground">
            Track and manage student development milestones
          </p>
        </div>
        <AddStudentDialog />
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Input
          type="search"
          placeholder="Search students..."
          className="max-w-[400px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select value={selectedCourse} onValueChange={setSelectedCourse}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {mockCourses.map(course => (
              <SelectItem key={course.id} value={course.id}>
                {course.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{stat.name}</span>
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.subtext}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Students List */}
      <div className="grid gap-6">
        {filteredStudents.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No students found matching your criteria
            </CardContent>
          </Card>
        ) : (
          filteredStudents.map((student) => (
            <Card key={student.id} className="hover:border-edu-blue/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.profilePic} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        {student.enrolledCourses.map((course) => (
                          <Badge key={course.courseId} variant="outline">
                            Level: {course.level}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{student.enrolledCourses.length} courses enrolled</span>
                        <span>•</span>
                        <span>Last active: {new Date(student.lastActive).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href={`/students/${student.id}`}>View Profile</Link>
                    </Button>
                    <Button>Edit</Button>
                  </div>
                </div>

                {/* Course Progress */}
                <div className="mt-6 grid gap-4">
                  {student.enrolledCourses.map((course) => {
                    const courseInfo = mockCourses.find(c => c.id === course.courseId);
                    return (
                      <div key={course.courseId} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{courseInfo?.name}</p>
                            <p className="text-sm text-muted-foreground">Level: {course.level}</p>
                          </div>
                          <Badge 
                            variant="secondary"
                            className={
                              course.progress >= 85 
                                ? "bg-edu-green/10 text-edu-green" 
                                : course.progress >= 65 
                                  ? "bg-edu-blue/10 text-edu-blue" 
                                  : "bg-edu-orange/10 text-edu-orange"
                            }
                          >
                            {getStatusText(course.progress)}
                          </Badge>
                        </div>
                        <Progress 
                          value={course.progress} 
                          className="h-2"
                          // Add color based on progress
                          style={{
                            backgroundColor: 'var(--muted)',
                            ['--progress-background' as any]: course.progress >= 85 
                              ? 'var(--edu-green)' 
                              : course.progress >= 65 
                                ? 'var(--edu-blue)' 
                                : 'var(--edu-orange)'
                          }}
                        />
                        {course.achievements.length > 0 && (
                          <div className="mt-2 flex items-center gap-2 text-sm">
                            <Trophy className="h-4 w-4 text-edu-purple" />
                            <span>{course.achievements.length} achievements</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

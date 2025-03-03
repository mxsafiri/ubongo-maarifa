'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  User,
  BookOpen,
  Trophy,
  Calendar,
  Clock,
  ChevronLeft,
  FileText,
  Settings,
  Star,
  BarChart
} from 'lucide-react';
import Link from 'next/link';
import type { Student, Achievement } from '@/types/student';

interface StudentProfileClientProps {
  student: Student;
  courses: Array<{ id: string; name: string }>;
  recentActivities: Array<{
    id: string;
    type: string;
    title: string;
    courseId: string;
    timestamp: Date;
    score?: number;
    achievement?: string;
  }>;
}

export default function StudentProfileClient({ 
  student, 
  courses, 
  recentActivities 
}: StudentProfileClientProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Calculate overall progress
  const overallProgress = student.enrolledCourses.reduce(
    (sum, course) => sum + course.progress, 
    0
  ) / student.enrolledCourses.length;
  
  // Get all achievements across all courses
  const allAchievements = student.enrolledCourses.flatMap(
    course => course.achievements
  );
  
  // Get course name by ID
  const getCourseNameById = (courseId: string) => {
    return courses.find(course => course.id === courseId)?.name || 'Unknown Course';
  };
  
  // Format date to relative time
  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString();
  };
  
  // Get badge color based on achievement type
  const getAchievementBadgeColor = (type: Achievement['type']) => {
    switch (type) {
      case 'excellence': return 'bg-edu-purple/10 text-edu-purple';
      case 'milestone': return 'bg-edu-blue/10 text-edu-blue';
      case 'completion': return 'bg-edu-green/10 text-edu-green';
      default: return '';
    }
  };

  return (
    <div className="container space-y-8 py-8">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/students">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Profile</h1>
          <p className="text-lg text-muted-foreground">
            View and manage student information
          </p>
        </div>
      </div>
      
      {/* Profile Header Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={student.profilePic} />
                <AvatarFallback className="text-2xl">{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-edu-blue/10 text-edu-blue">
                    {student.enrolledCourses.length} Courses
                  </Badge>
                  <Badge variant="outline" className="bg-edu-purple/10 text-edu-purple">
                    {allAchievements.length} Achievements
                  </Badge>
                  <Badge variant="outline">
                    Member since {student.createdAt.toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Progress Summary */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Overall Progress</span>
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <BarChart className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{Math.round(overallProgress)}%</p>
                  <Progress value={overallProgress} className="mt-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Courses Enrolled</span>
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <BookOpen className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{student.enrolledCourses.length}</p>
                  <p className="text-sm text-muted-foreground">Active courses</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Achievements</span>
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Trophy className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{allAchievements.length}</p>
                  <p className="text-sm text-muted-foreground">Total earned</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Active</span>
                  <div className="rounded-full bg-primary/10 p-2 text-primary">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{formatRelativeTime(student.lastActive)}</p>
                  <p className="text-sm text-muted-foreground">Active status</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex-shrink-0 rounded-full bg-muted p-2">
                      {activity.type === 'lesson_completed' && <BookOpen className="h-4 w-4" />}
                      {activity.type === 'quiz_taken' && <FileText className="h-4 w-4" />}
                      {activity.type === 'achievement_earned' && <Trophy className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium">{activity.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{getCourseNameById(activity.courseId)}</span>
                        {activity.type === 'quiz_taken' && activity.score !== undefined && (
                          <>
                            <span>•</span>
                            <span>Score: {activity.score}%</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-sm text-muted-foreground">
                      {formatRelativeTime(activity.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid gap-6">
            {student.enrolledCourses.map((enrollment) => {
              const course = courses.find(c => c.id === enrollment.courseId);
              return (
                <Card key={enrollment.courseId}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{course?.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>Level: {enrollment.level}</span>
                          <span>•</span>
                          <span>Last activity: {formatRelativeTime(enrollment.lastActivity)}</span>
                        </div>
                      </div>
                      <Badge 
                        className={enrollment.progress >= 85 
                          ? "bg-edu-green/10 text-edu-green" 
                          : enrollment.progress >= 50 
                            ? "bg-edu-blue/10 text-edu-blue" 
                            : "bg-edu-orange/10 text-edu-orange"
                        }
                      >
                        {enrollment.progress}% Complete
                      </Badge>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">{enrollment.progress}%</span>
                      </div>
                      <Progress value={enrollment.progress} className="h-2" />
                    </div>
                    
                    {enrollment.achievements.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm font-medium">Achievements in this course:</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {enrollment.achievements.map((achievement) => (
                            <Badge 
                              key={achievement.id} 
                              variant="outline"
                              className={getAchievementBadgeColor(achievement.type)}
                            >
                              <Trophy className="mr-1 h-3 w-3" />
                              {achievement.title}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline">View Course Details</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allAchievements.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="p-6 text-center text-muted-foreground">
                  No achievements earned yet
                </CardContent>
              </Card>
            ) : (
              allAchievements.map((achievement) => {
                const course = courses.find(c => c.id === achievement.courseId);
                return (
                  <Card key={achievement.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`rounded-full p-3 ${getAchievementBadgeColor(achievement.type)}`}>
                          <Trophy className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{course?.name}</span>
                            <span>•</span>
                            <span>Earned: {achievement.earnedAt.toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

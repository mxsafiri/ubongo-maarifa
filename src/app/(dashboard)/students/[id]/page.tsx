// This is a server component
import type { Student, Achievement } from '@/types/student';

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  // Return an array of objects with the dynamic params
  // For now, we'll just include our mock student ID
  return [
    { id: '1' },
    // Add more student IDs as needed
  ];
}

// Mock data for a specific student
const mockStudent: Student = {
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
    },
    {
      courseId: 'course2',
      level: 'Beginner',
      progress: 42,
      lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      achievements: []
    },
    {
      courseId: 'course3',
      level: 'Advanced',
      progress: 92,
      lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      achievements: [
        {
          id: 'ach2',
          title: 'Fast Learner',
          description: 'Completed 3 lessons in one day',
          earnedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          courseId: 'course3',
          type: 'milestone'
        },
        {
          id: 'ach3',
          title: 'Reading Champion',
          description: 'Read 10 books this month',
          earnedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
          courseId: 'course3',
          type: 'completion'
        }
      ]
    }
  ],
  createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
  lastActive: new Date()
};

const mockCourses = [
  { id: 'course1', name: 'Mathematics Fundamentals' },
  { id: 'course2', name: 'Basic Science' },
  { id: 'course3', name: 'Reading & Writing' },
];

const mockRecentActivities = [
  { 
    id: 'act1', 
    type: 'lesson_completed', 
    title: 'Completed Lesson: Fractions', 
    courseId: 'course1',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  { 
    id: 'act2', 
    type: 'quiz_taken', 
    title: 'Took Quiz: Basic Science Quiz 3', 
    courseId: 'course2',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  },
  { 
    id: 'act3', 
    type: 'achievement_earned', 
    title: 'Earned Achievement: Reading Champion', 
    courseId: 'course3',
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
  }
];

// Import the client component
import StudentProfileClient from './StudentProfileClient';

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the student data based on the ID
  // For now, we'll just use our mock data
  
  // Pass the data to the client component
  return <StudentProfileClient 
    student={mockStudent} 
    courses={mockCourses} 
    recentActivities={mockRecentActivities} 
  />;
}

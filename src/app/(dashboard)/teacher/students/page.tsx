'use client';

import { useState } from 'react';
import { AddStudentModal } from '@/components/teacher/student/AddStudentModal';
import { StudentCard } from '@/components/teacher/student/StudentCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

// Mock data
const mockClassGroups = [
  { id: 'kg1', name: 'Kindergarten 1' },
  { id: 'kg2', name: 'Kindergarten 2' },
  { id: 'kg3', name: 'Kindergarten 3' },
];

const mockStudents = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    classGroup: 'Kindergarten 1',
    attendance: 95,
    performance: 85,
    lastActivity: new Date('2024-03-01'),
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    classGroup: 'Kindergarten 2',
    attendance: 88,
    performance: 92,
    lastActivity: new Date('2024-03-02'),
  },
];

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const handleAddStudent = (studentData: any) => {
    // TODO: Implement Firebase integration
    console.log('Adding student:', studentData);
  };

  const handleEditStudent = (id: string) => {
    // TODO: Implement edit functionality
    console.log('Editing student:', id);
  };

  const handleDeleteStudent = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Deleting student:', id);
  };

  const handleViewProgress = (id: string) => {
    // TODO: Implement progress view
    console.log('Viewing progress for student:', id);
  };

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = 
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.classGroup === selectedClass;
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'high' && student.performance >= 80) ||
      (activeTab === 'medium' && student.performance >= 60 && student.performance < 80) ||
      (activeTab === 'low' && student.performance < 60);
    
    return matchesSearch && matchesClass && matchesTab;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Students</h1>
        <AddStudentModal
          onStudentAdd={handleAddStudent}
          classGroups={mockClassGroups}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select
            value={selectedClass}
            onValueChange={setSelectedClass}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {mockClassGroups.map((group) => (
                <SelectItem key={group.id} value={group.name}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Students</TabsTrigger>
            <TabsTrigger value="high">High Performers</TabsTrigger>
            <TabsTrigger value="medium">Average Performers</TabsTrigger>
            <TabsTrigger value="low">Needs Support</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredStudents.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  onEdit={handleEditStudent}
                  onDelete={handleDeleteStudent}
                  onViewProgress={handleViewProgress}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

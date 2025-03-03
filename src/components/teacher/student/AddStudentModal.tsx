'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AddStudentModalProps {
  onStudentAdd?: (studentData: any) => void;
  classGroups?: { id: string; name: string }[];
}

export function AddStudentModal({ onStudentAdd, classGroups = [] }: AddStudentModalProps) {
  const [open, setOpen] = useState(false);
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    guardianName: '',
    guardianEmail: '',
    guardianPhone: '',
    classGroup: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Firebase integration
    if (onStudentAdd) {
      onStudentAdd(studentData);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Add a new student to your class. Fill in their details and assign them to a class group.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={studentData.firstName}
                onChange={(e) => setStudentData({ ...studentData, firstName: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={studentData.lastName}
                onChange={(e) => setStudentData({ ...studentData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={studentData.dateOfBirth}
              onChange={(e) => setStudentData({ ...studentData, dateOfBirth: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="guardianName">Guardian Name</Label>
            <Input
              id="guardianName"
              value={studentData.guardianName}
              onChange={(e) => setStudentData({ ...studentData, guardianName: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="guardianEmail">Guardian Email</Label>
            <Input
              id="guardianEmail"
              type="email"
              value={studentData.guardianEmail}
              onChange={(e) => setStudentData({ ...studentData, guardianEmail: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="guardianPhone">Guardian Phone</Label>
            <Input
              id="guardianPhone"
              type="tel"
              value={studentData.guardianPhone}
              onChange={(e) => setStudentData({ ...studentData, guardianPhone: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="classGroup">Class Group</Label>
            <Select
              value={studentData.classGroup}
              onValueChange={(value) => setStudentData({ ...studentData, classGroup: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a class group" />
              </SelectTrigger>
              <SelectContent>
                {classGroups.map((group) => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit">Add Student</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

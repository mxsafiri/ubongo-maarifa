'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import {
  Book,
  Calendar as CalendarIcon,
  FileText,
  Video,
  Users,
  MessageSquare,
  Plus,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MediaUploader } from '@/components/ui/MediaUploader';

export function QuickActionsModal() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTab, setSelectedTab] = useState('lesson');

  // Form states
  const [lessonData, setLessonData] = useState({
    title: '',
    description: '',
    subject: '',
    grade: '',
    duration: '',
    objectives: '',
    materials: '',
  });

  const [resourceData, setResourceData] = useState({
    title: '',
    description: '',
    type: 'document',
    subject: '',
    tags: '',
  });

  const [classData, setClassData] = useState({
    title: '',
    description: '',
    date: null as Date | null,
    startTime: '',
    endTime: '',
    recurring: false,
  });

  const [announcementData, setAnnouncementData] = useState({
    title: '',
    content: '',
    targetGroup: 'all',
  });

  const handleSubmit = (type: string) => {
    // TODO: Implement submission logic based on type
    console.log(`Submitting ${type}:`, {
      lesson: lessonData,
      resource: resourceData,
      class: classData,
      announcement: announcementData,
    }[type]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
          <span className="sr-only">Quick Actions</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Quick Actions</DialogTitle>
          <DialogDescription>
            Create and manage your teaching resources quickly and efficiently.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="lesson" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>Lesson</span>
            </TabsTrigger>
            <TabsTrigger value="resource" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Resource</span>
            </TabsTrigger>
            <TabsTrigger value="class" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Class</span>
            </TabsTrigger>
            <TabsTrigger value="announcement" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Announcement</span>
            </TabsTrigger>
          </TabsList>

          {/* Lesson Plan Tab */}
          <TabsContent value="lesson" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lessonTitle">Lesson Title</Label>
                  <Input
                    id="lessonTitle"
                    value={lessonData.title}
                    onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="lessonSubject">Subject</Label>
                  <Select
                    value={lessonData.subject}
                    onValueChange={(value) => setLessonData({ ...lessonData, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="lessonDescription">Description</Label>
                <Textarea
                  id="lessonDescription"
                  value={lessonData.description}
                  onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="lessonObjectives">Learning Objectives</Label>
                <Textarea
                  id="lessonObjectives"
                  value={lessonData.objectives}
                  onChange={(e) => setLessonData({ ...lessonData, objectives: e.target.value })}
                  placeholder="Enter key learning objectives..."
                />
              </div>
              <Button onClick={() => handleSubmit('lesson')}>Create Lesson Plan</Button>
            </div>
          </TabsContent>

          {/* Resource Tab */}
          <TabsContent value="resource" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="resourceTitle">Resource Title</Label>
                  <Input
                    id="resourceTitle"
                    value={resourceData.title}
                    onChange={(e) => setResourceData({ ...resourceData, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="resourceType">Resource Type</Label>
                  <Select
                    value={resourceData.type}
                    onValueChange={(value) => setResourceData({ ...resourceData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="resourceDescription">Description</Label>
                <Textarea
                  id="resourceDescription"
                  value={resourceData.description}
                  onChange={(e) => setResourceData({ ...resourceData, description: e.target.value })}
                />
              </div>
              <MediaUploader
                onUpload={(files) => console.log('Files uploaded:', files)}
                accept={resourceData.type === 'video' ? 'video/*' : resourceData.type === 'audio' ? 'audio/*' : 'image/*,application/pdf'}
              />
              <Button onClick={() => handleSubmit('resource')}>Upload Resource</Button>
            </div>
          </TabsContent>

          {/* Class Schedule Tab */}
          <TabsContent value="class" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="classTitle">Class Title</Label>
                  <Input
                    id="classTitle"
                    value={classData.title}
                    onChange={(e) => setClassData({ ...classData, title: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Date</Label>
                  <Calendar
                    mode="single"
                    selected={classData.date}
                    onSelect={(date) => setClassData({ ...classData, date })}
                    className="rounded-md border"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={classData.startTime}
                    onChange={(e) => setClassData({ ...classData, startTime: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={classData.endTime}
                    onChange={(e) => setClassData({ ...classData, endTime: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={() => handleSubmit('class')}>Schedule Class</Button>
            </div>
          </TabsContent>

          {/* Announcement Tab */}
          <TabsContent value="announcement" className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="announcementTitle">Announcement Title</Label>
                <Input
                  id="announcementTitle"
                  value={announcementData.title}
                  onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="announcementContent">Content</Label>
                <Textarea
                  id="announcementContent"
                  value={announcementData.content}
                  onChange={(e) => setAnnouncementData({ ...announcementData, content: e.target.value })}
                  className="h-32"
                />
              </div>
              <div>
                <Label htmlFor="targetGroup">Target Group</Label>
                <Select
                  value={announcementData.targetGroup}
                  onValueChange={(value) => setAnnouncementData({ ...announcementData, targetGroup: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="class1">Class 1</SelectItem>
                    <SelectItem value="class2">Class 2</SelectItem>
                    <SelectItem value="parents">Parents</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => handleSubmit('announcement')}>Send Announcement</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

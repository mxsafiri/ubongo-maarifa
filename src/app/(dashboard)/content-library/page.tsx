'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, Video, Image as ImageIcon } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'document' | 'image';
  url: string;
  uploadedBy: string;
  metadata: {
    subject: string;
    thumbnail?: string;
  }
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Introduction to Mathematics',
    type: 'video',
    url: 'https://example.com/videos/math-intro.mp4',
    uploadedBy: 'teacher1',
    metadata: {
      subject: 'Mathematics',
      thumbnail: '/thumbnails/math-intro.jpg'
    }
  },
  {
    id: '2',
    title: 'Basic Science Workbook',
    type: 'document',
    url: 'https://example.com/docs/science-workbook.pdf',
    uploadedBy: 'teacher1',
    metadata: {
      subject: 'Science'
    }
  },
  {
    id: '3',
    title: 'Reading Comprehension Diagrams',
    type: 'image',
    url: 'https://example.com/images/reading-diagrams.jpg',
    uploadedBy: 'teacher1',
    metadata: {
      subject: 'Language Arts',
      thumbnail: '/thumbnails/reading-diagrams.jpg'
    }
  }
];

const subjects = ['All Subjects', 'Mathematics', 'Science', 'Language Arts'];
const types = ['All Types', 'video', 'document', 'image'];

export default function ContentLibraryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedType, setSelectedType] = useState('All Types');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5 text-edu-blue" />;
      case 'document':
        return <FileText className="h-5 w-5 text-edu-orange" />;
      case 'image':
        return <ImageIcon className="h-5 w-5 text-edu-purple" />;
      default:
        return <FileText className="h-5 w-5 text-edu-blue" />;
    }
  };

  const filteredContent = mockResources.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All Subjects' || item.metadata.subject === selectedSubject;
    const matchesType = selectedType === 'All Types' || item.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <div className="container space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
          <p className="text-lg text-muted-foreground">
            Browse and manage educational materials
          </p>
        </div>
        <Button className="gap-2 bg-edu-blue hover:bg-edu-blue/90">
          <Upload className="h-4 w-4" />
          Upload Resource
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Input
          type="search"
          placeholder="Search resources..."
          className="max-w-[400px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(subject => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {types.map(type => (
              <SelectItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Resource Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredContent.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-6 text-center text-muted-foreground">
              No resources found matching your criteria
            </CardContent>
          </Card>
        ) : (
          filteredContent.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:border-edu-blue/50">
              {item.metadata.thumbnail ? (
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={item.metadata.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-video w-full items-center justify-center bg-muted">
                  {getTypeIcon(item.type)}
                </div>
              )}
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  {getTypeIcon(item.type)}
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.metadata.subject}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

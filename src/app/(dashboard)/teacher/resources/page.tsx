'use client';

import { useState } from 'react';
import { ResourceUploadModal } from '@/components/teacher/resource/ResourceUploadModal';
import { ResourceCard } from '@/components/teacher/resource/ResourceCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Grid2X2, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data
const mockResources = [
  {
    id: '1',
    title: 'Numbers 1-10 Learning Video',
    description: 'Engaging video teaching basic number recognition and counting',
    type: 'video' as const,
    subject: 'Mathematics',
    tags: ['numbers', 'counting', 'basic math'],
    uploadedAt: new Date('2024-03-01'),
    downloads: 45,
    views: 120,
    fileUrl: 'https://example.com/video1.mp4',
  },
  {
    id: '2',
    title: 'Colors and Shapes Worksheet',
    description: 'Printable worksheet for practicing colors and shapes',
    type: 'document' as const,
    subject: 'Arts',
    tags: ['colors', 'shapes', 'worksheet'],
    uploadedAt: new Date('2024-03-02'),
    downloads: 78,
    views: 156,
    fileUrl: 'https://example.com/worksheet1.pdf',
  },
];

const SUBJECTS = [
  'All Subjects',
  'Mathematics',
  'Language',
  'Science',
  'Arts',
  'Social Studies',
  'Physical Education',
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleUpload = (resourceData: any) => {
    // TODO: Implement Firebase integration
    console.log('Uploading resource:', resourceData);
  };

  const handleEdit = (id: string) => {
    // TODO: Implement edit functionality
    console.log('Editing resource:', id);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete functionality
    console.log('Deleting resource:', id);
  };

  const handleShare = (id: string) => {
    // TODO: Implement share functionality
    console.log('Sharing resource:', id);
  };

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSubject = selectedSubject === 'All Subjects' || resource.subject === selectedSubject;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Learning Resources</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border rounded-md p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <ResourceUploadModal onResourceUpload={handleUpload} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select
            value={selectedSubject}
            onValueChange={setSelectedSubject}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList>
            <TabsTrigger value="all">All Types</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="document">Documents</TabsTrigger>
            <TabsTrigger value="image">Images</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedType} className="mt-6">
            <div className={`grid gap-6 ${
              viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}>
              {filteredResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onShare={handleShare}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

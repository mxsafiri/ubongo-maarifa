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
import { Textarea } from '@/components/ui/textarea';
import { MediaUploader } from '@/components/ui/MediaUploader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ResourceUploadModalProps {
  onResourceUpload?: (resourceData: any) => void;
}

const RESOURCE_TYPES = [
  { id: 'video', name: 'Video', accept: { 'video/*': ['.mp4', '.webm', '.mov'] } as Record<string, string[]> },
  { id: 'document', name: 'Document', accept: {
    'application/pdf': ['.pdf'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  } as Record<string, string[]> },
  { id: 'image', name: 'Image', accept: { 'image/*': ['.png', '.jpg', '.jpeg'] } as Record<string, string[]> },
  { id: 'audio', name: 'Audio', accept: { 'audio/*': ['.mp3', '.wav'] } as Record<string, string[]> },
];

const SUBJECTS = [
  'Mathematics',
  'Language',
  'Science',
  'Arts',
  'Social Studies',
  'Physical Education',
];

export function ResourceUploadModal({ onResourceUpload }: ResourceUploadModalProps) {
  const [open, setOpen] = useState(false);
  const [resourceType, setResourceType] = useState('');
  const [resourceData, setResourceData] = useState({
    title: '',
    description: '',
    subject: '',
    tags: '',
    files: [] as File[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Firebase integration
    if (onResourceUpload) {
      onResourceUpload({
        ...resourceData,
        type: resourceType,
        uploadedAt: new Date(),
      });
    }
    setOpen(false);
  };

  const selectedTypeConfig = RESOURCE_TYPES.find(type => type.id === resourceType) || RESOURCE_TYPES[0];
  
  // Ensure accept prop is always a valid Record<string, string[]>
  const acceptProp = selectedTypeConfig ? selectedTypeConfig.accept : { 'image/*': ['.png', '.jpg', '.jpeg'] };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Upload Resource</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Upload Learning Resource</DialogTitle>
          <DialogDescription>
            Upload educational materials for your students. Add details to make it easy to find and use.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="resourceType">Resource Type</Label>
              <Select
                value={resourceType}
                onValueChange={setResourceType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  {RESOURCE_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={resourceData.title}
                onChange={(e) => setResourceData({ ...resourceData, title: e.target.value })}
                placeholder="Enter resource title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={resourceData.description}
                onChange={(e) => setResourceData({ ...resourceData, description: e.target.value })}
                placeholder="Describe this resource"
              />
            </div>

            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={resourceData.subject}
                onValueChange={(value) => setResourceData({ ...resourceData, subject: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
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

            <div>
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={resourceData.tags}
                onChange={(e) => setResourceData({ ...resourceData, tags: e.target.value })}
                placeholder="Enter tags separated by commas"
              />
            </div>

            {selectedTypeConfig && (
              <div>
                <Label>Upload Files</Label>
                <MediaUploader
                  onUpload={async (files) => {
                    setResourceData({ ...resourceData, files });
                    return Promise.resolve();
                  }}
                  accept={acceptProp}
                  maxSize={100 * 1024 * 1024} // 100MB
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Upload Resource</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

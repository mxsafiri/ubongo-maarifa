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
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CreateAnnouncementModalProps {
  onAnnouncementCreate?: (announcementData: any) => void;
  classGroups?: { id: string; name: string }[];
}

export function CreateAnnouncementModal({ 
  onAnnouncementCreate,
  classGroups = []
}: CreateAnnouncementModalProps) {
  const [open, setOpen] = useState(false);
  const [publishDate, setPublishDate] = useState<Date>();
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    content: '',
    targetGroups: [] as string[],
    enableComments: true,
    isPinned: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Firebase integration
    if (onAnnouncementCreate) {
      onAnnouncementCreate({
        ...announcementData,
        publishAt: publishDate || new Date(),
        createdAt: new Date(),
        status: publishDate ? 'scheduled' : 'published',
      });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Announcement</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Create Announcement</DialogTitle>
          <DialogDescription>
            Create a new announcement for your students. You can schedule it for later and target specific groups.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Announcement Title</Label>
              <Input
                id="title"
                value={announcementData.title}
                onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value })}
                placeholder="Enter announcement title"
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={announcementData.content}
                onChange={(e) => setAnnouncementData({ ...announcementData, content: e.target.value })}
                placeholder="Write your announcement"
                className="h-32"
              />
            </div>

            <div>
              <Label>Target Groups</Label>
              <Select
                value={announcementData.targetGroups[0]} // For now, single select
                onValueChange={(value) => setAnnouncementData({ 
                  ...announcementData,
                  targetGroups: [value]
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  {classGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Schedule Publication</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {publishDate ? format(publishDate, 'PPP') : <span>Publish immediately</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={publishDate}
                    onSelect={setPublishDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="comments">Enable Comments</Label>
                <div className="text-sm text-muted-foreground">
                  Allow students to comment on this announcement
                </div>
              </div>
              <Switch
                id="comments"
                checked={announcementData.enableComments}
                onCheckedChange={(checked) => 
                  setAnnouncementData({ ...announcementData, enableComments: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pinned">Pin Announcement</Label>
                <div className="text-sm text-muted-foreground">
                  Keep this announcement at the top
                </div>
              </div>
              <Switch
                id="pinned"
                checked={announcementData.isPinned}
                onCheckedChange={(checked) => 
                  setAnnouncementData({ ...announcementData, isPinned: checked })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">
              {publishDate ? 'Schedule Announcement' : 'Publish Now'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

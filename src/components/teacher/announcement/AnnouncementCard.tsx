'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MoreVertical, 
  MessageSquare, 
  Eye,
  Pin,
  Clock,
  Users
} from 'lucide-react';

interface AnnouncementCardProps {
  announcement: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      avatar?: string;
    };
    publishAt: Date;
    createdAt: Date;
    status: 'draft' | 'scheduled' | 'published';
    targetGroups: string[];
    enableComments: boolean;
    isPinned: boolean;
    views: number;
    comments: number;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onTogglePin?: (id: string) => void;
}

export function AnnouncementCard({ 
  announcement,
  onEdit,
  onDelete,
  onTogglePin
}: AnnouncementCardProps) {
  const statusColors = {
    draft: 'bg-muted text-muted-foreground',
    scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  };

  return (
    <Card className={announcement.isPinned ? 'border-primary' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={announcement.author.avatar} />
              <AvatarFallback>
                {announcement.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="flex items-center gap-2">
                {announcement.title}
                {announcement.isPinned && (
                  <Pin className="h-4 w-4 text-primary" />
                )}
              </CardTitle>
              <CardDescription>
                By {announcement.author.name} • {announcement.createdAt.toLocaleDateString()}
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={statusColors[announcement.status]}>
              {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onTogglePin?.(announcement.id)}>
                  {announcement.isPinned ? 'Unpin' : 'Pin'} Announcement
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit?.(announcement.id)}>
                  Edit Announcement
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete?.(announcement.id)}
                  className="text-destructive"
                >
                  Delete Announcement
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap text-sm">{announcement.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {announcement.status === 'scheduled' && (
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              Scheduled for {announcement.publishAt.toLocaleDateString()}
            </div>
          )}
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            {announcement.targetGroups.includes('all') 
              ? 'All Groups'
              : `${announcement.targetGroups.length} Groups`}
          </div>
          <div className="flex items-center">
            <Eye className="mr-1 h-4 w-4" />
            {announcement.views} views
          </div>
          {announcement.enableComments && (
            <div className="flex items-center">
              <MessageSquare className="mr-1 h-4 w-4" />
              {announcement.comments} comments
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

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
import { MoreVertical, FileIcon, Download, Share2, Eye } from 'lucide-react';

interface ResourceCardProps {
  resource: {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'document' | 'image' | 'audio';
    subject: string;
    tags: string[];
    uploadedAt: Date;
    downloads: number;
    views: number;
    fileUrl: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onShare?: (id: string) => void;
}

export function ResourceCard({ resource, onEdit, onDelete, onShare }: ResourceCardProps) {
  const typeColors = {
    video: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    document: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    image: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    audio: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  };

  const handleDownload = () => {
    // TODO: Implement download functionality
    window.open(resource.fileUrl, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileIcon className="h-5 w-5" />
              {resource.title}
            </CardTitle>
            <CardDescription className="mt-2">{resource.description}</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onShare?.(resource.id)}>
                Share Resource
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(resource.id)}>
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(resource.id)}
                className="text-destructive"
              >
                Delete Resource
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge className={typeColors[resource.type]}>
              {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
            </Badge>
            <Badge variant="outline">{resource.subject}</Badge>
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              {resource.views} views
            </div>
            <div className="flex items-center">
              <Download className="mr-1 h-4 w-4" />
              {resource.downloads} downloads
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Uploaded {resource.uploadedAt.toLocaleDateString()}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onShare?.(resource.id)}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            size="sm"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

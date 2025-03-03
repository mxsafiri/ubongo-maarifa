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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MediaUploader } from '@/components/ui/MediaUploader';
import { BookOpen, Video, FileText, Wand2 } from 'lucide-react';

interface CreateLessonModalProps {
  onLessonCreate?: (lessonData: any) => void;
}

export function CreateLessonModal({ onLessonCreate }: CreateLessonModalProps) {
  const [open, setOpen] = useState(false);
  const [lessonData, setLessonData] = useState({
    title: '',
    description: '',
    objectives: '',
    subject: '',
    grade: '',
    resources: [] as File[],
    videoUrl: '',
  });

  const [aiSuggestion, setAiSuggestion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIHelp = async () => {
    setIsGenerating(true);
    // TODO: Implement AI suggestion generation
    // This would connect to an AI service to get lesson suggestions
    const mockSuggestion = `Based on your lesson topic "${lessonData.title}", here are some suggestions:
    
1. Key Learning Objectives:
- Understand basic concepts
- Apply knowledge in practical scenarios
- Develop critical thinking skills

2. Recommended Activities:
- Interactive group discussion
- Hands-on practice
- Quiz and assessment

3. Additional Resources:
- Visual aids and diagrams
- Practice worksheets
- Related video content`;

    setAiSuggestion(mockSuggestion);
    setIsGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onLessonCreate) {
      onLessonCreate(lessonData);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Create Lesson
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Lesson</DialogTitle>
          <DialogDescription>
            Create a lesson plan and add learning resources. Use AI to get suggestions and improvements.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium mb-2">Lesson Title</div>
              <Input
                value={lessonData.title}
                onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                placeholder="Enter lesson title"
              />
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Description</div>
              <Textarea
                value={lessonData.description}
                onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
                placeholder="Describe your lesson"
                className="h-20"
              />
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Learning Objectives</div>
              <Textarea
                value={lessonData.objectives}
                onChange={(e) => setLessonData({ ...lessonData, objectives: e.target.value })}
                placeholder="What will students learn?"
                className="h-20"
              />
              <Button
                type="button"
                variant="outline"
                className="mt-2"
                onClick={handleAIHelp}
                disabled={isGenerating || !lessonData.title}
              >
                <Wand2 className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating Suggestions...' : 'Get AI Suggestions'}
              </Button>
            </div>

            {aiSuggestion && (
              <div className="bg-muted p-4 rounded-md">
                <div className="text-sm font-medium mb-2">AI Suggestions</div>
                <pre className="text-sm whitespace-pre-wrap">{aiSuggestion}</pre>
              </div>
            )}

            <div>
              <div className="text-sm font-medium mb-2">Upload Resources</div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Learning Materials (PDFs, Documents, Images)
                  </div>
                  <MediaUploader
                    onUpload={(files) => setLessonData({ ...lessonData, resources: files })}
                    accept="application/pdf,image/*,.doc,.docx"
                  />
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Video Content (Optional)
                  </div>
                  <MediaUploader
                    onUpload={(files) => {
                      if (files[0]) {
                        // In a real app, you'd upload this to a video hosting service
                        setLessonData({ ...lessonData, videoUrl: URL.createObjectURL(files[0]) });
                      }
                    }}
                    accept="video/*"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Lesson</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

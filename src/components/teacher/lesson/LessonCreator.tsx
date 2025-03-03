'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen, Wand2 } from 'lucide-react';

export function LessonCreator() {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lessonData, setLessonData] = useState({
    title: '',
    description: '',
    objectives: '',
    subject: '',
    resources: [] as File[],
  });
  const [aiSuggestions, setAiSuggestions] = useState('');

  const handleAIHelp = async () => {
    if (!lessonData.title || !lessonData.description) return;
    
    setIsGenerating(true);
    // TODO: Replace with actual AI integration
    setTimeout(() => {
      setAiSuggestions(`Based on your lesson "${lessonData.title}":

Learning Objectives:
1. Understand key concepts of ${lessonData.title}
2. Apply knowledge through practical exercises
3. Develop critical thinking skills

Suggested Activities:
1. Interactive group discussion
2. Hands-on exercises
3. Real-world application examples

Resource Recommendations:
1. Visual aids and diagrams
2. Practice worksheets
3. Video demonstrations`);
      setIsGenerating(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setLessonData(prev => ({
        ...prev,
        resources: [...prev.resources, ...Array.from(e.target.files || [])],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement Firebase integration using the data structure from memory
    console.log('Creating lesson:', lessonData);
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
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Lesson Title"
              value={lessonData.title}
              onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
              className="mb-4"
            />
            
            <Textarea
              placeholder="Lesson Description"
              value={lessonData.description}
              onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
              className="min-h-[100px] mb-4"
            />

            <div className="flex items-center gap-2 mb-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleAIHelp}
                disabled={isGenerating || !lessonData.title || !lessonData.description}
              >
                <Wand2 className="h-4 w-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Get AI Help'}
              </Button>
            </div>

            {aiSuggestions && (
              <div className="bg-muted p-4 rounded-lg mb-4">
                <pre className="text-sm whitespace-pre-wrap">{aiSuggestions}</pre>
              </div>
            )}

            <Textarea
              placeholder="Learning Objectives"
              value={lessonData.objectives}
              onChange={(e) => setLessonData({ ...lessonData, objectives: e.target.value })}
              className="min-h-[100px] mb-4"
            />

            <div className="space-y-2">
              <div className="text-sm font-medium">Upload Resources</div>
              <Input
                type="file"
                multiple
                accept="image/*,video/*,application/pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="mb-2"
              />
              {lessonData.resources.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  {lessonData.resources.length} file(s) selected
                </div>
              )}
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

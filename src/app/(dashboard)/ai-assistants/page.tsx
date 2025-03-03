'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Sparkles, Book, Brain } from 'lucide-react';

interface AITask {
  id: string;
  name: string;
  description: string;
  icon: any;
}

const aiTasks: AITask[] = [
  {
    id: 'quiz',
    name: 'Create Quiz',
    description: 'Generate quiz questions based on your lesson content',
    icon: Brain
  },
  {
    id: 'summary',
    name: 'Summarize Content',
    description: 'Create concise summaries of lesson materials',
    icon: Book
  },
  {
    id: 'lesson-plan',
    name: 'Lesson Planning',
    description: 'Get help creating engaging lesson plans',
    icon: Sparkles
  },
  {
    id: 'assistant',
    name: 'Teaching Assistant',
    description: 'Ask any questions about teaching or content',
    icon: Bot
  }
];

export default function AIAssistantsPage() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // TODO: Implement AI generation logic
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="container space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Teaching Assistant</h1>
        <p className="text-lg text-muted-foreground">
          Get AI help with lesson planning and content creation
        </p>
      </div>

      {/* AI Tasks Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {aiTasks.map((task) => (
          <Card 
            key={task.id}
            className={`cursor-pointer transition-colors hover:bg-accent ${
              selectedTask === task.id ? 'border-primary bg-accent' : ''
            }`}
            onClick={() => setSelectedTask(task.id)}
          >
            <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                <task.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">{task.name}</h3>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Prompt Input */}
      {selectedTask && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <Textarea
              placeholder="Describe what you need help with..."
              className="min-h-[100px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button 
              className="w-full" 
              onClick={handleGenerate}
              disabled={!prompt || isGenerating}
            >
              {isGenerating ? (
                <>
                  <Bot className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

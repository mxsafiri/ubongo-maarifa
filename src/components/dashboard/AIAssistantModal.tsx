"use client"

import { Bot, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const aiConversations = [
  {
    id: 1,
    title: 'Lesson Planning Assistant',
    message: 'Here are some creative ideas for your next art lesson...',
    timestamp: '2h ago',
    type: 'planning',
  },
  {
    id: 2,
    title: 'Content Creator',
    message: 'I have generated the worksheet with the specifications...',
    timestamp: '4h ago',
    type: 'content',
  },
  {
    id: 3,
    title: 'Student Progress Analyzer',
    message: 'Based on the latest assessments, here are the key insights...',
    timestamp: '1d ago',
    type: 'analytics',
  },
]

export function AIAssistantModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Bot className="h-5 w-5" />
          AI Assistant
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle>AI Conversations</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Conversations List */}
          <div className="space-y-4">
            {aiConversations.map((conversation) => (
              <button
                key={conversation.id}
                className="group w-full rounded-lg border bg-card p-4 text-left transition-all hover:border-primary/20 hover:bg-accent"
              >
                <div className="flex gap-4">
                  <div className="mt-1 rounded-full bg-primary/10 p-2 text-primary group-hover:bg-primary/20">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">{conversation.title}</p>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {conversation.message}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{conversation.timestamp}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Start New Conversation Button */}
          <Button className="w-full">
            Start New Conversation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

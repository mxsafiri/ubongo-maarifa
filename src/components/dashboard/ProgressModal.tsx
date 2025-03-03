import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export function ProgressModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <BarChart3 className="h-5 w-5" />
          Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle>Monthly Progress</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">March 2025</h2>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-4xl font-bold">84%</span>
                <div className="p-2 bg-primary/10 rounded-full">
                  <div className="text-primary">🎯</div>
                </div>
              </div>
              <p className="text-muted-foreground">Overall Completion</p>
              <div className="w-full bg-secondary h-2 rounded-full mt-2">
                <div className="bg-primary h-full w-[84%] rounded-full" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <span className="text-2xl font-bold">12</span>
              <p className="text-sm text-muted-foreground">Lessons Created</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold">89</span>
              <p className="text-sm text-muted-foreground">Student Engagement</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold">34</span>
              <p className="text-sm text-muted-foreground">Resources Shared</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">AI Conversations</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex gap-3">
                  <div className="text-primary">🤖</div>
                  <div>
                    <h4 className="font-semibold">Lesson Planning Assistant</h4>
                    <p className="text-sm text-muted-foreground">Here are some creative ideas for your next art...</p>
                    <span className="text-xs text-muted-foreground">2h ago</span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <div className="flex gap-3">
                  <div className="text-primary">🤖</div>
                  <div>
                    <h4 className="font-semibold">Content Creator</h4>
                    <p className="text-sm text-muted-foreground">I have generated the worksheet with the...</p>
                    <span className="text-xs text-muted-foreground">4h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

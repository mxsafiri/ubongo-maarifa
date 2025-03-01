import React from 'react';
import { GlassCard } from '@/components/ui/design-system/GlassCard';

export default function AIAssistantsPage() {
  const assistants = [
    {
      id: 1,
      name: 'Learning Coach',
      description: 'Personalized guidance for your learning journey',
      icon: '👩‍🏫',
    },
    {
      id: 2,
      name: 'Study Buddy',
      description: 'Interactive practice and quizzes',
      icon: '🤝',
    },
    {
      id: 3,
      name: 'Research Assistant',
      description: 'Help with research and content discovery',
      icon: '🔍',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">AI Assistants</h1>
        <button className="rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20">
          Create Custom Assistant
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assistants.map((assistant) => (
          <GlassCard key={assistant.id} variant="hover" className="cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-white/10 p-3 text-2xl">
                {assistant.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">{assistant.name}</h2>
                <p className="mt-2 text-white/80">{assistant.description}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard>
        <h2 className="mb-4 text-xl font-semibold text-white">Recent Interactions</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <div>
                <p className="text-white">Session with Learning Coach</p>
                <p className="text-sm text-white/60">30 minutes ago</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

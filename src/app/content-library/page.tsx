import React from 'react';
import { GlassCard } from '@/components/ui/design-system/GlassCard';

export default function ContentLibraryPage() {
  const courses = [
    { id: 1, title: 'Introduction to AI', category: 'Artificial Intelligence', progress: 60 },
    { id: 2, title: 'Data Science Fundamentals', category: 'Data Science', progress: 30 },
    { id: 3, title: 'Machine Learning Basics', category: 'Machine Learning', progress: 85 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Content Library</h1>
        <button className="rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20">
          Add New Content
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <GlassCard key={course.id} variant="hover" className="group cursor-pointer">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-white">
                  {course.category}
                </span>
                <span className="text-white/80">{course.progress}%</span>
              </div>
              
              <h2 className="text-xl font-semibold text-white">{course.title}</h2>
              
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div 
                  className="h-full bg-white/30 transition-all group-hover:bg-white/40"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

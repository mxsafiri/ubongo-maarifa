import React from 'react';
import { GlassCard } from '@/components/ui/design-system/GlassCard';
import { BookOpenIcon, AcademicCapIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-white">Maarifa Learning Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <GlassCard variant="hover" className="group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-indigo-500/20 p-3">
                <BookOpenIcon className="h-6 w-6 text-indigo-300" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Learning Paths</h2>
                <p className="mt-2 text-gray-300">Explore curated learning paths tailored to your goals</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard variant="hover" className="group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-purple-500/20 p-3">
                <AcademicCapIcon className="h-6 w-6 text-purple-300" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">My Courses</h2>
                <p className="mt-2 text-gray-300">Continue your enrolled courses and track progress</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard variant="hover" className="group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-pink-500/20 p-3">
                <UserGroupIcon className="h-6 w-6 text-pink-300" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Community</h2>
                <p className="mt-2 text-gray-300">Connect with fellow learners and mentors</p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-semibold text-white">Recent Activity</h2>
          <GlassCard>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4 border-b border-white/10 pb-4 last:border-0">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  <div>
                    <p className="text-white">Completed Module {item}</p>
                    <p className="text-sm text-gray-400">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </main>
  );
}

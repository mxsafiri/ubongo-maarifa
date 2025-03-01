import React from 'react';
import { GlassCard } from '@/components/ui/design-system/GlassCard';

export default function AnalyticsPage() {
  const metrics = [
    { id: 1, name: 'Learning Hours', value: '24.5', change: '+12%', icon: '⏱️' },
    { id: 2, name: 'Completed Courses', value: '8', change: '+2', icon: '📚' },
    { id: 3, name: 'Average Score', value: '92%', change: '+5%', icon: '📈' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <div className="flex gap-4">
          <select className="rounded-lg bg-white/10 px-4 py-2 text-white">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
          <button className="rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <GlassCard key={metric.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/60">{metric.name}</p>
                <p className="mt-1 text-3xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-sm text-green-400">{metric.change}</p>
              </div>
              <div className="rounded-lg bg-white/10 p-3 text-2xl">
                {metric.icon}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <h2 className="mb-4 text-xl font-semibold text-white">Learning Progress</h2>
          <div className="h-64 rounded-lg bg-white/5">
            {/* Chart placeholder */}
            <div className="flex h-full items-center justify-center text-white/40">
              Learning Progress Chart
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-4 text-xl font-semibold text-white">Time Distribution</h2>
          <div className="h-64 rounded-lg bg-white/5">
            {/* Chart placeholder */}
            <div className="flex h-full items-center justify-center text-white/40">
              Time Distribution Chart
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

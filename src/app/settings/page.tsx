import React from 'react';
import { GlassCard } from '@/components/ui/design-system/GlassCard';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Settings</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <GlassCard>
          <h2 className="mb-6 text-xl font-semibold text-white">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-white/80">Display Name</label>
              <input
                type="text"
                className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder-white/40"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/80">Email</label>
              <input
                type="email"
                className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder-white/40"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/80">Bio</label>
              <textarea
                className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder-white/40"
                rows={4}
                placeholder="Tell us about yourself"
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-6 text-xl font-semibold text-white">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Email Notifications</p>
                <p className="text-sm text-white/60">Receive updates about your courses</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-white/10 p-1">
                <div className="h-4 w-4 rounded-full bg-white" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">AI Assistant Suggestions</p>
                <p className="text-sm text-white/60">Get personalized learning recommendations</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-white/20 p-1">
                <div className="ml-5 h-4 w-4 rounded-full bg-white" />
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-6 text-xl font-semibold text-white">Learning Goals</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-white/80">Daily Study Goal</label>
              <select className="w-full rounded-lg bg-white/10 px-4 py-2 text-white">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
                <option>4 hours</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-white/80">Focus Areas</label>
              <div className="flex flex-wrap gap-2">
                {['AI', 'Machine Learning', 'Data Science', 'Programming'].map((area) => (
                  <button
                    key={area}
                    className="rounded-full bg-white/10 px-4 py-1 text-sm text-white hover:bg-white/20"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="mb-6 text-xl font-semibold text-white">Account Settings</h2>
          <div className="space-y-4">
            <button className="w-full rounded-lg bg-white/10 px-4 py-2 text-white hover:bg-white/20">
              Change Password
            </button>
            <button className="w-full rounded-lg bg-red-500/20 px-4 py-2 text-red-300 hover:bg-red-500/30">
              Delete Account
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

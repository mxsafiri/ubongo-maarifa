'use client';

import React from 'react';

export default function LessonsPage() {
  const stats = [
    { name: 'Total Lessons', value: '156', subtext: 'Active curriculum' },
    { name: 'Active Sessions', value: '42', subtext: 'Currently running' },
    { name: 'Student Engagement', value: '89%', subtext: 'Average participation' },
    { name: 'Completion Rate', value: '78%', subtext: 'Last 30 days' },
  ];

  const lessons = [
    {
      name: 'Introduction to Colors',
      subject: 'Art & Creativity',
      duration: '45 minutes',
      enrolled: '24 students enrolled',
      description: 'Learn about primary and secondary colors through interactive activities.',
      status: 'Active',
      completion: 85,
    },
    {
      name: 'Numbers 1-10',
      subject: 'Mathematics',
      duration: '30 minutes',
      enrolled: '18 students enrolled',
      description: 'Basic number recognition and counting practice for beginners.',
      status: 'Draft',
      completion: 0,
    },
    {
      name: 'Story Time: The Little Red Hen',
      subject: 'Language & Literacy',
      duration: '40 minutes',
      enrolled: '22 students enrolled',
      description: 'Interactive storytelling session with comprehension activities.',
      status: 'Active',
      completion: 65,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A1017] pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Lesson Planning</h1>
              <p className="mt-2 text-gray-400">Create and manage engaging learning experiences</p>
            </div>
            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Create Lesson
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex gap-4">
          <input
            type="text"
            placeholder="Search lessons..."
            className="flex-1 rounded-lg bg-gray-800/50 px-4 py-2 text-white placeholder-gray-400"
          />
          <button className="rounded-lg bg-gray-800/50 px-4 py-2 text-white hover:bg-gray-700/50">
            Filters
          </button>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="rounded-lg bg-gray-800/50 p-6">
              <p className="text-sm text-gray-400">{stat.name}</p>
              <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-400">{stat.subtext}</p>
            </div>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid gap-6">
          {lessons.map((lesson) => (
            <div key={lesson.name} className="rounded-lg bg-gray-800/50 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-white">{lesson.name}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      lesson.status === 'Active' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {lesson.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">{lesson.subject}</p>
                  <p className="mt-3 text-gray-300">{lesson.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                    <span>⏱ {lesson.duration}</span>
                    <span>👥 {lesson.enrolled}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="rounded bg-gray-700/50 px-4 py-2 text-sm text-white hover:bg-gray-600/50">
                    View Details
                  </button>
                  {lesson.status === 'Active' && (
                    <button className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
                      Start Session
                    </button>
                  )}
                </div>
              </div>
              {lesson.completion > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Completion Rate</span>
                    <span className="text-gray-400">{lesson.completion}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-700">
                    <div 
                      className="h-full bg-blue-500"
                      style={{ width: `${lesson.completion}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

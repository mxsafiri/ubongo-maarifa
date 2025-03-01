'use client';

import React from 'react';

export default function DashboardPage() {
  const stats = [
    { name: 'Active Students', value: '248', subtext: '12 new this week' },
    { name: 'Lessons Today', value: '8', subtext: '3 completed' },
    { name: 'Average Progress', value: '85%', subtext: '+5% from last week' },
    { name: 'Time Engaged', value: '4.2h', subtext: 'Average per student' },
  ];

  const recentActivities = [
    {
      name: 'Colors and Shapes',
      time: '10:00 AM',
      students: '12 students',
      completion: '85% completion',
    },
    {
      name: 'Weekly Progress Goals Met',
      time: '9:30 AM',
      students: '8 students',
      completion: '100% completion',
    },
    {
      name: 'Reading Fundamentals',
      time: 'Yesterday',
      students: '15 students',
      completion: '92% completion',
    },
  ];

  const upcomingLessons = [
    {
      name: 'Numbers Fun',
      time: '2:00 PM',
      enrolled: '18 enrolled',
      subject: 'Mathematics',
    },
    {
      name: 'Story Time',
      time: '3:30 PM',
      enrolled: '22 enrolled',
      subject: 'Language & Literacy',
    },
    {
      name: 'Art Expression',
      time: 'Tomorrow, 10:00 AM',
      enrolled: '16 enrolled',
      subject: 'Art & Creativity',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A1017] pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-gray-400">Your daily overview of student progress and upcoming activities</p>
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

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Recent Activities */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Recent Activities</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">View all</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.name}
                  className="rounded-lg bg-gray-800/50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">{activity.name}</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {activity.time} • {activity.students}
                      </p>
                    </div>
                    <span className="text-sm text-gray-400">{activity.completion}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Lessons */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Upcoming Lessons</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">View all</button>
            </div>
            <div className="space-y-4">
              {upcomingLessons.map((lesson) => (
                <div
                  key={lesson.name}
                  className="rounded-lg bg-gray-800/50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">{lesson.name}</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        {lesson.time} • {lesson.enrolled}
                      </p>
                      <p className="mt-1 text-sm text-gray-400">{lesson.subject}</p>
                    </div>
                    <button className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
                      Start
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

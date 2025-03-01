'use client';

import React from 'react';

export default function StudentsPage() {
  const stats = [
    { name: 'Total Students', value: '248', subtext: 'Active enrollment' },
    { name: 'Meeting Goals', value: '186', subtext: '75% of total' },
    { name: 'Needs Support', value: '62', subtext: '25% of total' },
    { name: 'Recent Milestones', value: '28', subtext: 'Last 7 days' },
  ];

  const students = [
    {
      name: 'Sarah Johnson',
      grade: 'Grade 1',
      progress: 85,
      status: 'On Track',
      statusColor: 'green',
      achievement: 'Completed all weekly assignments',
    },
    {
      name: 'Michael Chen',
      grade: 'Grade 2',
      progress: 65,
      status: 'Needs Support',
      statusColor: 'yellow',
      achievement: 'Improved math test scores by 15%',
    },
    {
      name: 'Emma Davis',
      grade: 'Grade 1',
      progress: 95,
      status: 'Exceeding',
      statusColor: 'blue',
      achievement: 'Achieved perfect attendance this month',
    },
  ];

  return (
    <main className="min-h-screen bg-[#0A1017] pt-20">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white">Student Progress</h1>
              <p className="mt-2 text-gray-400">Track and manage student development milestones</p>
            </div>
            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Add Student
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex gap-4">
          <input
            type="text"
            placeholder="Search students..."
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

        {/* Students Grid */}
        <div className="grid gap-6">
          {students.map((student) => (
            <div key={student.name} className="rounded-lg bg-gray-800/50 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-700"></div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{student.name}</h3>
                      <p className="text-sm text-gray-400">{student.grade}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      student.statusColor === 'green' 
                        ? 'bg-green-500/20 text-green-400'
                        : student.statusColor === 'yellow'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {student.status}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Overall Progress</span>
                      <span className="text-gray-400">{student.progress}%</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-700">
                      <div 
                        className={`h-full ${
                          student.progress >= 90
                            ? 'bg-blue-500'
                            : student.progress >= 70
                            ? 'bg-green-500'
                            : 'bg-yellow-500'
                        }`}
                        style={{ width: `${student.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-white">Recent Achievement</p>
                    <p className="mt-1 text-sm text-gray-400">{student.achievement}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="rounded bg-gray-700/50 px-4 py-2 text-sm text-white hover:bg-gray-600/50">
                    View Progress
                  </button>
                  <button className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

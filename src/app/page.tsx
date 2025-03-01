'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A1017]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            ECD Platform
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            A simple and effective platform for early childhood development educators.
            Manage lessons, track student progress, and create engaging learning experiences.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              href="/dashboard"
              className="rounded-lg bg-blue-500 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-600"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/lessons"
              className="rounded-lg bg-gray-800 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-gray-700"
            >
              View Lessons
            </Link>
          </div>

          {/* Key Features */}
          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-gray-800/50 p-6 text-left">
              <h3 className="text-xl font-semibold text-white">Easy Lesson Planning</h3>
              <p className="mt-2 text-gray-400">
                Create and manage your lessons with our intuitive interface designed for educators.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800/50 p-6 text-left">
              <h3 className="text-xl font-semibold text-white">Student Progress</h3>
              <p className="mt-2 text-gray-400">
                Track individual student development and identify areas needing support.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800/50 p-6 text-left">
              <h3 className="text-xl font-semibold text-white">Learning Resources</h3>
              <p className="mt-2 text-gray-400">
                Access a growing library of educational materials and activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <main className="flex-1">
        <div className="container flex min-h-screen flex-col items-center justify-center gap-4 py-10 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Ubongo Maarifa
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
            Empowering early childhood educators with simple, effective digital tools
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/content-library">Browse Content</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="w-full border-t bg-gray-50/50 py-12 dark:bg-gray-950/50">
        <div className="container grid gap-8 px-4 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Simple Lesson Planning</h3>
            <p className="text-sm text-muted-foreground">
              Create and organize lessons effortlessly with our intuitive tools designed for educators.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Progress Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Monitor student development and identify learning opportunities with ease.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Resource Library</h3>
            <p className="text-sm text-muted-foreground">
              Access a curated collection of educational materials and activities.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">
            2025 Ubongo Maarifa. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

import { motion } from 'framer-motion'
import Head from 'next/head'
import ParallaxHero from '@/components/ui/ParallaxHero'
import FeatureGrid from '@/components/ui/FeatureGrid'
import FloatingNav from '@/components/navigation/FloatingNav'
import Card from '@/components/ui/Card'
import StatsSection from '@/components/sections/StatsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import {
  HomeIcon,
  UserIcon,
  Cog6ToothIcon as CogIcon,
  ArrowRightOnRectangleIcon as LogoutIcon,
  AcademicCapIcon,
  CheckBadgeIcon as BadgeCheckIcon,
  BookOpenIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon as ChatIcon,
  ClockIcon,
  DocumentTextIcon,
  BoltIcon as LightningBoltIcon
} from '@heroicons/react/24/outline'

export default function Home() {
  return (
    <>
      <Head>
        <title>Maarifa AI - Interactive Learning Platform</title>
        <meta
          name="description"
          content="Empowering educators and students through interactive and engaging educational content"
        />
      </Head>

      <ParallaxHero
        title="Inspiring Young Minds Through Education"
        subtitle="Transform your teaching with AI-powered educational resources. Join educators worldwide in bringing engaging learning experiences to life in your classroom."
        image="/images/hero-education.jpg"
      />

      <FeatureGrid />

      <StatsSection />

      <div className="relative py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-primary/5 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/5 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-display font-bold text-gray-900 dark:text-white sm:text-4xl"
            >
              Start your learning journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400"
            >
              Choose your path and begin inspiring the next generation with interactive education
            </motion.p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card
                title="For Teachers"
                subtitle="Access lesson plans, activities, and resources designed for classroom implementation"
                image="/images/teachers.jpg"
                color="blue"
                link="/teachers"
              />
              <Card
                title="For Students"
                subtitle="Engage with interactive content and learn through fun activities"
                image="/images/students.jpg"
                color="green"
                link="/students"
              />
              <Card
                title="For Schools"
                subtitle="Implement educational programs across your entire institution"
                image="/images/schools.jpg"
                color="pink"
                link="/schools"
              />
            </div>
          </div>
        </div>
      </div>

      <TestimonialsSection />

      <FloatingNav />
    </>
  )
}

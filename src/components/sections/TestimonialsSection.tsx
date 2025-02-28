import Carousel from '@/components/ui/Carousel'

const testimonials = [
  {
    id: 1,
    title: 'Transforming Physical Education',
    description: 'See how Olympic values are changing the way we teach sports and physical education.',
    image: '/images/testimonial-1.jpg',
    testimonial:
      'Indaba AI has revolutionized how we teach Olympic values in our PE classes. The interactive resources and AI-powered recommendations have made a huge difference in student engagement.',
    author: 'Sarah Johnson',
    role: 'Physical Education Teacher, International School of Kenya',
  },
  {
    id: 2,
    title: 'Building Character Through Sport',
    description: 'Learn how educators are using Olympic values to develop character and leadership.',
    image: '/images/testimonial-2.jpg',
    testimonial:
      'The platform has helped us create a more inclusive and values-driven sports program. Our students are not just becoming better athletes, but better people.',
    author: 'Michael Chen',
    role: 'Sports Director, Singapore American School',
  },
  {
    id: 3,
    title: 'Connecting Classrooms Globally',
    description: 'Discover how schools are collaborating across borders through Olympic education.',
    image: '/images/testimonial-3.jpg',
    testimonial:
      'Through Indaba AI, our students have connected with peers worldwide, sharing their Olympic journey and learning from different cultures and perspectives.',
    author: 'Maria Garcia',
    role: 'Principal, Barcelona International School',
  },
]

export default function TestimonialsSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Inspiring stories from our community
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Hear from educators around the world who are using Indaba AI to bring Olympic values to
            life in their classrooms.
          </p>
        </div>

        <div className="relative mt-16">
          <Carousel items={testimonials} />
        </div>
      </div>
    </div>
  )
}

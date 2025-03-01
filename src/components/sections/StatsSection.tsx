import AnimatedCounter from '@/components/ui/AnimatedCounter'

const stats = [
  {
    id: 1,
    start: 0,
    end: 600,
    suffix: '+',
    title: 'Activities',
    description: 'Olympic-themed educational resources',
  },
  {
    id: 2,
    start: 0,
    end: 50,
    suffix: '+',
    title: 'Countries',
    description: 'Global community of educators',
  },
  {
    id: 3,
    start: 0,
    end: 12,
    suffix: 'M+',
    title: 'Students',
    description: 'Lives impacted worldwide',
  },
  {
    id: 4,
    start: 0,
    end: 95,
    suffix: '%',
    title: 'Satisfaction',
    description: 'Educator satisfaction rate',
  },
]

export default function StatsSection() {
  return (
    <div className="relative overflow-hidden py-24">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Making a global impact
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Join thousands of educators worldwide who are using Maarifa AI to bring Olympic values to
            their classrooms.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.id}
              start={stat.start}
              end={stat.end}
              suffix={stat.suffix}
              title={stat.title}
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

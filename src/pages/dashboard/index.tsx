import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/design-system/Card'
import { Button } from '@/components/ui/design-system/Button'
import { Input } from '@/components/ui/design-system/Input'
import { Select } from '@/components/ui/design-system/Select'
import { LineChart } from '@/components/ui/charts/LineChart'

export default function Dashboard() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('week')
  const [timePeriod, setTimePeriod] = useState('week')

  const stats = [
    {
      title: 'Active Students',
      value: '2,834',
      change: '+12.5%',
      trend: 'up',
    },
    {
      title: 'Learning Hours',
      value: '12,453',
      change: '+23.1%',
      trend: 'up',
    },
    {
      title: 'Course Completion',
      value: '84%',
      change: '+4.3%',
      trend: 'up',
    },
    {
      title: 'AI Interactions',
      value: '15,234',
      change: '+45.2%',
      trend: 'up',
    },
  ]

  const recentActivities = [
    {
      id: 1,
      user: 'Sarah M.',
      action: 'Completed Python Basics Course',
      time: '2 hours ago',
    },
    {
      id: 2,
      user: 'John D.',
      action: 'Started AI Ethics Module',
      time: '4 hours ago',
    },
    {
      id: 3,
      user: 'Emma W.',
      action: 'Earned Advanced JavaScript Badge',
      time: '5 hours ago',
    },
  ]

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Students',
        data: [65, 59, 80, 81, 56, 55, 70],
        borderColor: 'rgb(14, 165, 233)',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
      },
      {
        label: 'Learning Hours',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgb(217, 70, 239)',
        backgroundColor: 'rgba(217, 70, 239, 0.1)',
        fill: true,
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">Time Period</label>
            <Select
              value={timePeriod}
              onChange={(value) => setTimePeriod(Array.isArray(value) ? value[0] : value)}
              options={[
                { value: 'day', label: 'Last 24 Hours' },
                { value: 'week', label: 'Last Week' },
                { value: 'month', label: 'Last Month' },
                { value: 'year', label: 'Last Year' }
              ]}
            />
          </div>
          <Button>Export Report</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <span
                  className={`text-sm ${
                    stat.trend === 'up'
                      ? 'text-success-500'
                      : 'text-error-500'
                  }`}
                >
                  {stat.change}
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={chartData} height={300} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20">
                <div className="flex flex-col items-center space-y-2">
                  <span role="img" aria-label="create course">📚</span>
                  <span>Create Course</span>
                </div>
              </Button>
              <Button variant="outline" className="h-20">
                <div className="flex flex-col items-center space-y-2">
                  <span role="img" aria-label="add student">👥</span>
                  <span>Add Student</span>
                </div>
              </Button>
              <Button variant="outline" className="h-20">
                <div className="flex flex-col items-center space-y-2">
                  <span role="img" aria-label="generate report">📊</span>
                  <span>Generate Report</span>
                </div>
              </Button>
              <Button variant="outline" className="h-20">
                <div className="flex flex-col items-center space-y-2">
                  <span role="img" aria-label="ai assistant">🤖</span>
                  <span>AI Assistant</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b border-surface-100 pb-4 last:border-0 last:pb-0 dark:border-surface-800"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-sm text-surface-500 dark:text-surface-400">
                      {activity.action}
                    </p>
                  </div>
                  <span className="text-sm text-surface-500 dark:text-surface-400">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

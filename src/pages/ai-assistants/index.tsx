import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/design-system/Card'
import { Button } from '@/components/ui/design-system/Button'
import { Input } from '@/components/ui/design-system/Input'
import { Textarea } from '@/components/ui/design-system/Textarea'
import { Loading } from '@/components/ui/design-system/Loading'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Assistant {
  id: string
  name: string
  avatar: string
  description: string
  expertise: string[]
}

export default function AIAssistants() {
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const assistants: Assistant[] = [
    {
      id: '1',
      name: 'Teacher Assistant',
      avatar: '👩‍🏫',
      description: 'Helps with lesson planning and educational content creation',
      expertise: ['Curriculum Design', 'Assessment Creation', 'Teaching Strategies'],
    },
    {
      id: '2',
      name: 'Student Mentor',
      avatar: '🎓',
      description: 'Provides personalized learning guidance and support',
      expertise: ['Study Skills', 'Goal Setting', 'Academic Support'],
    },
    {
      id: '3',
      name: 'Content Curator',
      avatar: '📚',
      description: 'Helps organize and recommend learning materials',
      expertise: ['Content Organization', 'Resource Recommendations', 'Learning Paths'],
    },
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedAssistant) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a simulated response. In the actual implementation, this would be replaced with the AI model response.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, response])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">AI Assistants</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {assistants.map((assistant) => (
          <Card
            key={assistant.id}
            className={cn(
              'cursor-pointer transition-all hover:shadow-soft-lg',
              selectedAssistant?.id === assistant.id &&
                'ring-2 ring-primary-500 ring-offset-2'
            )}
            onClick={() => setSelectedAssistant(assistant)}
          >
            <CardHeader>
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{assistant.avatar}</span>
                <div>
                  <CardTitle>{assistant.name}</CardTitle>
                  <p className="text-sm text-surface-500">
                    {assistant.description}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {assistant.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAssistant && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-2xl">{selectedAssistant.avatar}</span>
                <CardTitle>{selectedAssistant.name}</CardTitle>
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedAssistant(null)
                  setMessages([])
                }}
              >
                Change Assistant
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] space-y-4 overflow-y-auto p-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      'flex w-full space-x-2',
                      message.role === 'assistant' ? 'justify-start' : 'justify-end'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg px-4 py-2',
                        message.role === 'assistant'
                          ? 'bg-surface-100 dark:bg-surface-800'
                          : 'bg-primary-500 text-white'
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="mt-1 text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <div className="flex justify-center">
                  <Loading />
                </div>
              )}
            </div>

            <div className="mt-4 flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

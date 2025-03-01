import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface QuizGenerationParams {
  subject: string
  topic: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  numberOfQuestions: number
  languagePreference: string
}

export interface LessonPlanParams {
  subject: string
  topic: string
  gradeLevel: string
  duration: string
  learningObjectives: string[]
}

export interface TutoringParams {
  subject: string
  topic: string
  studentLevel: string
  specificQuestion: string
  languagePreference: string
}

export const aiService = {
  async generateQuiz(params: QuizGenerationParams) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an educational expert specializing in creating engaging and age-appropriate quizzes.
          Create a quiz that:
          - Is suitable for the specified difficulty level
          - Includes a mix of question types (multiple choice, true/false, short answer)
          - Provides clear and concise questions
          - Includes correct answers and explanations
          - Uses appropriate language for the target audience`,
        },
        {
          role: 'user',
          content: `Please create a quiz with the following parameters:
          Subject: ${params.subject}
          Topic: ${params.topic}
          Difficulty: ${params.difficulty}
          Number of Questions: ${params.numberOfQuestions}
          Language: ${params.languagePreference}`,
        },
      ],
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content
  },

  async generateLessonPlan(params: LessonPlanParams) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an experienced teacher specializing in creating effective lesson plans.
          Create a lesson plan that:
          - Aligns with the specified learning objectives
          - Includes engaging activities and materials
          - Provides clear instructions and timing
          - Incorporates assessment strategies
          - Suggests differentiation options for various learning needs`,
        },
        {
          role: 'user',
          content: `Please create a lesson plan with the following parameters:
          Subject: ${params.subject}
          Topic: ${params.topic}
          Grade Level: ${params.gradeLevel}
          Duration: ${params.duration}
          Learning Objectives: ${params.learningObjectives.join(', ')}`,
        },
      ],
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content
  },

  async provideTutoring(params: TutoringParams) {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a patient and knowledgeable tutor specializing in ${params.subject}.
          Provide assistance that:
          - Is appropriate for the student's level
          - Explains concepts clearly and simply
          - Uses relevant examples
          - Encourages critical thinking
          - Provides step-by-step guidance when needed`,
        },
        {
          role: 'user',
          content: `Please help with the following question:
          Subject: ${params.subject}
          Topic: ${params.topic}
          Student Level: ${params.studentLevel}
          Question: ${params.specificQuestion}
          Language: ${params.languagePreference}`,
        },
      ],
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content
  },
}

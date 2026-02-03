export type QuestionType = 'multiple' | 'boolean'
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Category {
  id: number
  name: string
  icon: string
}

export interface Question {
  id: string
  type: QuestionType
  difficulty: Difficulty
  category: string
  question: string
  correctAnswer: string
  incorrectAnswers: string[]
  allAnswers: string[] // Shuffled answers
  correctIndex: number // Index of correct answer in allAnswers
}

export interface Answer {
  questionId: string
  selectedAnswer: string | null
  isCorrect: boolean
  timeSpent: number
}

export interface QuizConfig {
  category: Category
  difficulty: Difficulty
  questionCount: number
}

export interface QuizState {
  quizId: string
  userId: string
  config: QuizConfig
  questions: Question[]
  currentIndex: number
  answers: Answer[]
  timeRemaining: number // in seconds
  startTime: number // timestamp
  lastUpdated: number // timestamp
  isActive: boolean
  isCompleted: boolean
}

export interface QuizResults {
  quizId: string
  totalQuestions: number
  answeredCount: number
  correctCount: number
  incorrectCount: number
  unansweredCount: number
  scorePercentage: number
  timeTaken: number // in seconds
  category: string
  difficulty: Difficulty
}

export interface OpenTDBResponse {
  response_code: number
  results: OpenTDBQuestion[]
}

export interface OpenTDBQuestion {
  type: string
  difficulty: string
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

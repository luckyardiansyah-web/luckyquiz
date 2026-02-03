export interface QuizHistory {
  quizId: string
  userId: string
  category: string
  categoryIcon: string
  difficulty: string
  totalQuestions: number
  correctCount: number
  incorrectCount: number
  unansweredCount: number
  scorePercentage: number
  completedAt: number // timestamp
  timeTaken: number // in seconds
}

export interface LeaderboardEntry {
  username: string
  userId: string
  averageScore: number
  totalQuizzes: number
  bestScore: number
  totalCorrect: number
  level: number
}

import type { QuizHistory, LeaderboardEntry } from '@/types/history'
import storage from '@/utils/localStorage'
import { STORAGE_KEYS } from '@/utils/constants'

export const historyService = {
  saveQuizResult(quizResult: QuizHistory): void {
    const history = this.getHistory()

    // Check if this quiz result already exists (prevent duplicates)
    const exists = history.some(item => item.quizId === quizResult.quizId)
    if (exists) {
      console.warn('Quiz result already saved, skipping duplicate:', quizResult.quizId)
      return
    }

    history.push(quizResult)
    storage.set(STORAGE_KEYS.QUIZ_HISTORY, history)
  },

  getHistory(): QuizHistory[] {
    return storage.get<QuizHistory[]>(STORAGE_KEYS.QUIZ_HISTORY) || []
  },

  getUserHistory(userId: string): QuizHistory[] {
    const history = this.getHistory()
    return history.filter(item => item.userId === userId)
  },

  calculateLeaderboard(): LeaderboardEntry[] {
    const history = this.getHistory()

    // Group by userId
    const userStats = new Map<string, {
      username: string
      scores: number[]
      totalCorrect: number
      level: number
    }>()

    history.forEach(quiz => {
      const existing = userStats.get(quiz.userId) || {
        username: quiz.userId,
        scores: [],
        totalCorrect: 0,
        level: 1,
      }

      existing.scores.push(quiz.scorePercentage)
      existing.totalCorrect += quiz.correctCount

      userStats.set(quiz.userId, existing)
    })

    // Calculate leaderboard
    const leaderboard: LeaderboardEntry[] = Array.from(userStats.entries()).map(([userId, stats]) => ({
      userId,
      username: stats.username,
      averageScore: stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length,
      totalQuizzes: stats.scores.length,
      bestScore: Math.max(...stats.scores),
      totalCorrect: stats.totalCorrect,
      level: stats.level,
    }))

    // Sort by average score descending
    return leaderboard.sort((a, b) => b.averageScore - a.averageScore)
  },

  clearHistory(): void {
    storage.remove(STORAGE_KEYS.QUIZ_HISTORY)
  },
}

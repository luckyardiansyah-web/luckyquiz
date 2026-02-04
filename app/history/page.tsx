'use client'

import { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import Header from '@/components/Header'
import QuizHistoryCard from '@/components/QuizHistoryCard'
import { historyService } from '@/services/historyService'
import { useAuth } from '@/hooks/useAuth'
import type { QuizHistory } from '@/types/history'
import { useRouter } from 'next/navigation'

export default function HistoryPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [history, setHistory] = useState<QuizHistory[]>([])

  useEffect(() => {
    if (user) {
      const userHistory = historyService.getUserHistory(user.id)
      // Sort by most recent first
      setHistory(userHistory.sort((a, b) => b.completedAt - a.completedAt))
    }
  }, [user])

  return (
    <ProtectedRoute>
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden font-display text-gray-900 dark:text-white">
        <Header />

        <main className="flex-1 px-4 md:px-40 py-8">
          <div className="max-w-[960px] mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-black tracking-tight mb-2">Quiz History</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                View all your completed quizzes
              </p>
            </div>

            {/* History List */}
            {history.length === 0 ? (
              <div className="text-center py-16">
                <div className="size-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-gray-400 text-[48px]">history_edu</span>
                </div>
                <h3 className="text-xl font-bold mb-2">No quizzes completed yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start a quiz to see your results here
                </p>
                <button
                  onClick={() => router.push('/config')}
                  className="px-8 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-full transition-colors"
                >
                  Start a Quiz
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((quiz, index) => (
                  <QuizHistoryCard key={`${quiz.quizId}-${index}`} quiz={quiz} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

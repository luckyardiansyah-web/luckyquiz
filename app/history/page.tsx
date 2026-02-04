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
      <div className="relative min-h-screen w-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-fixed bg-center font-display text-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-indigo-50 z-0"></div>

        <Header />

        <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-[960px] mx-auto">
            {/* Header */}
            <div className="mb-8 text-center animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-slate-900 flex items-center justify-center gap-3">
                <span className="hero-text-gradient">Quiz History</span>
                <span className="material-symbols-outlined text-4xl md:text-5xl text-primary">auto_stories</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium">
                View all your completed quizzes
              </p>
            </div>

            {/* History List */}
            {history.length === 0 ? (
              <div className="text-center py-16 animate-slide-up">
                <div className="size-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-primary text-[48px]">history_edu</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">No quizzes completed yet</h3>
                <p className="text-slate-500 mb-6">
                  Start a quiz to see your results here
                </p>
                <button
                  onClick={() => router.push('/config')}
                  className="px-8 py-4 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
                >
                  Start a Quiz
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {history.map((quiz, index) => (
                  <div
                    key={`${quiz.quizId}-${index}`}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <QuizHistoryCard quiz={quiz} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
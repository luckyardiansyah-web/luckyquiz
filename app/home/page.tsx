'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import Header from '@/components/Header'
import { useQuiz } from '@/context/QuizContext'
import { useQuizResume } from '@/hooks/useQuizResume'
import ResumeQuizModal from '@/components/ResumeQuizModal'

export default function Home() {
  const router = useRouter()
  const { hasResumableQuiz, resumableQuiz } = useQuizResume()

  return (
    <ProtectedRoute>
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden font-display text-gray-900 dark:text-white">
        <Header />

        {hasResumableQuiz && resumableQuiz && <ResumeQuizModal quiz={resumableQuiz} />}

        <main className="flex-1 flex flex-col items-center px-4 py-12">
          <div className="max-w-6xl w-full">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                Welcome to LuckyQuiz
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Challenge yourself with quizzes across multiple categories
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Start New Quiz Card */}
              <button
                onClick={() => router.push('/config')}
                className="group flex flex-col items-center gap-6 p-8 rounded-2xl border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <div className="size-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-white text-[40px]">play_arrow</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Start New Quiz</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Begin a new quiz challenge
                  </p>
                </div>
              </button>

              {/* View History Card */}
              <button
                onClick={() => router.push('/history')}
                className="group flex flex-col items-center gap-6 p-8 rounded-2xl border border-gray-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="size-16 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 group-hover:text-primary text-[40px]">
                    history
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">View History</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    See your past quiz results
                  </p>
                </div>
              </button>

              {/* Leaderboard Card */}
              <button
                onClick={() => router.push('/leaderboard')}
                className="group flex flex-col items-center gap-6 p-8 rounded-2xl border border-gray-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="size-16 bg-gray-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 group-hover:text-primary text-[40px]">
                    emoji_events
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">Leaderboard</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Top quiz performers
                  </p>
                </div>
              </button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import Header from '@/components/Header'
import ResultsSummary from '@/components/ResultsSummary'
import { useQuiz } from '@/context/QuizContext'
import type { QuizResults } from '@/types/quiz'

export default function ResultsPage() {
  const router = useRouter()
  const { quizState, endQuiz } = useQuiz()
  const [results, setResults] = useState<QuizResults | null>(null)
  const hasProcessedRef = useRef(false)

  useEffect(() => {
    // Prevent double execution in React Strict Mode
    if (hasProcessedRef.current) return

    if (quizState && quizState.isCompleted) {
      hasProcessedRef.current = true
      const quizResults = endQuiz()
      setResults(quizResults)
    } else if (!quizState && !results) {
      // No quiz state and no results yet, redirect to home
      router.push('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array - only run once on mount

  if (!results) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Calculating results...</p>
        </div>
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-br from-white via-purple-50 to-indigo-50 text-gray-900 font-display antialiased selection:bg-primary/20 selection:text-gray-900 overflow-x-hidden">
        <Header />

        <main className="flex-grow flex flex-col items-center justify-center p-4 py-8 sm:p-8 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

          <div className="layout-content-container flex flex-col w-full max-w-[580px] z-10">
            <ResultsSummary results={results} />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full mt-8">
              <button
                onClick={() => router.push('/config')}
                className="flex-1 h-14 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold rounded-full flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transform hover:scale-[1.02]"
              >
                <span className="material-symbols-outlined">replay</span>
                Restart Quiz
              </button>
              <button
                onClick={() => router.push('/home')}
                className="flex-1 h-14 bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-bold rounded-full flex items-center justify-center gap-2 transition-all hover:border-primary/30 transform hover:scale-[1.02] shadow-sm"
              >
                <span className="material-symbols-outlined">home</span>
                Back to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
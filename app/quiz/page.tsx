'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import Header from '@/components/Header'
import Timer from '@/components/Timer'
import ProgressBar from '@/components/ProgressBar'
import QuestionCard from '@/components/QuestionCard'
import { useQuiz } from '@/context/QuizContext'

export default function QuizPage() {
  const router = useRouter()
  const { quizState, answerQuestion, skipQuestion, endQuiz } = useQuiz()

  useEffect(() => {
    if (!quizState || !quizState.isActive) {
      router.push('/home')
    }
  }, [quizState, router])

  const handleTimerExpire = () => {
    // Timer expired - end quiz and go to results
    endQuiz()
    router.push('/results')
  }

  if (!quizState || !quizState.isActive) {
    return (
      <div className="bg-background-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading quiz...</p>
        </div>
      </div>
    )
  }

  const currentQuestion = quizState.questions[quizState.currentIndex]
  const isResumed = quizState.currentIndex > 0 && quizState.answers.length === quizState.currentIndex

  return (
    <ProtectedRoute>
      <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white transition-colors duration-200 min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-6 py-8">
          {/* Top Bar */}
          <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              {isResumed && (
                <div className="flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400">
                  <span className="material-symbols-outlined text-[18px]">history</span>
                  <span className="text-sm font-bold">Resumed</span>
                </div>
              )}
              <div className="flex items-center gap-2 pl-3 pr-4 py-1.5 rounded-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-slate-700 shadow-sm">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  {quizState.config.category.icon}
                </span>
                <span className="text-sm font-medium">{quizState.config.category.name}</span>
              </div>
            </div>

            <Timer initialSeconds={quizState.timeRemaining} onExpire={handleTimerExpire} />
          </div>

          {/* Progress Bar */}
          <ProgressBar current={quizState.currentIndex + 1} total={quizState.questions.length} />

          {/* Question Card */}
          <QuestionCard
            question={currentQuestion}
            questionNumber={quizState.currentIndex + 1}
            onAnswer={answerQuestion}
            onSkip={skipQuestion}
          />
        </main>
      </div>
    </ProtectedRoute>
  )
}

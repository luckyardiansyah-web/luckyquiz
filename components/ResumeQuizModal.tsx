'use client'

import { useRouter } from 'next/navigation'
import type { QuizState } from '@/types/quiz'
import { useQuiz } from '@/context/QuizContext'

interface ResumeQuizModalProps {
  quiz: QuizState
}

export default function ResumeQuizModal({ quiz }: ResumeQuizModalProps) {
  const router = useRouter()
  const { clearQuiz } = useQuiz()

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const handleResume = () => {
    router.push('/quiz')
  }

  const handleStartNew = () => {
    clearQuiz()
    router.push('/config')
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl p-8 shadow-2xl animate-fade-in">
        <div className="flex flex-col items-center gap-6">
          <div className="size-16 bg-orange-500/20 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-orange-500 text-[40px]">history</span>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Quiz?</h2>
            <p className="text-gray-600 text-sm">
              You have an incomplete quiz. Would you like to continue where you left off?
            </p>
          </div>

          <div className="w-full space-y-3 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Category:</span>
              <span className="text-gray-900 font-semibold">{quiz.config.category.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Difficulty:</span>
              <span className="text-gray-900 font-semibold capitalize">{quiz.config.difficulty}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress:</span>
              <span className="text-gray-900 font-semibold">
                {quiz.currentIndex + 1} of {quiz.questions.length}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Time Remaining:</span>
              <span className="text-gray-900 font-semibold">{formatTime(quiz.timeRemaining)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={handleResume}
              className="flex-1 h-12 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:shadow-primary/30"
            >
              <span className="material-symbols-outlined">play_arrow</span>
              Resume Quiz
            </button>
            <button
              onClick={handleStartNew}
              className="flex-1 h-12 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-900 font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:border-primary/30"
            >
              <span className="material-symbols-outlined">refresh</span>
              Start New
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
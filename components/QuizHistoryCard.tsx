'use client'

import type { QuizHistory } from '@/types/history'

interface QuizHistoryCardProps {
  quiz: QuizHistory
}

export default function QuizHistoryCard({ quiz }: QuizHistoryCardProps) {
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 rounded-2xl border border-gray-200 bg-white hover:border-primary/50 hover:shadow-lg transition-all duration-200">
      {/* Category Icon */}
      <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
        <span className="material-symbols-outlined text-primary text-[36px]">{quiz.categoryIcon}</span>
      </div>

      {/* Quiz Info */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{quiz.category}</h3>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-gray-600">
          <span className="capitalize">{quiz.difficulty}</span>
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
          <span>{formatDate(quiz.completedAt)}</span>
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
          <span>{formatTime(quiz.timeTaken)}</span>
        </div>
      </div>

      {/* Score */}
      <div className="flex items-center gap-6">
        <div className="relative size-20">
          <svg className="size-full -rotate-90" viewBox="0 0 36 36">
            <circle
              className="text-gray-200"
              cx="18"
              cy="18"
              fill="none"
              r="16"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle
              className="text-primary"
              cx="18"
              cy="18"
              fill="none"
              r="16"
              stroke="currentColor"
              strokeDasharray={`${quiz.scorePercentage}, 100`}
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900">{quiz.scorePercentage}%</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-500 text-[16px]">check_circle</span>
            <span className="text-gray-900 font-semibold">{quiz.correctCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-red-500 text-[16px]">cancel</span>
            <span className="text-gray-900 font-semibold">{quiz.incorrectCount}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
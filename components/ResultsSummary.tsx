'use client'

import type { QuizResults } from '@/types/quiz'

interface ResultsSummaryProps {
  results: QuizResults
}

export default function ResultsSummary({ results }: ResultsSummaryProps) {
  const getResultBadge = () => {
    if (results.scorePercentage >= 80) return { text: 'Excellent!', emoji: '🎉' }
    if (results.scorePercentage >= 60) return { text: 'Great Job!', emoji: '👏' }
    return { text: 'Keep Trying!', emoji: '💪' }
  }

  const getResultColor = () => {
    if (results.scorePercentage >= 80) return 'text-primary'
    if (results.scorePercentage >= 60) return 'text-accent'
    return 'text-primary-light'
  }

  const circleProgress = (results.scorePercentage / 100) * 263.89 // Circle circumference

  return (
    <div className="bg-white rounded-3xl overflow-hidden relative shadow-card-hover border-2 border-gray-100 animate-slide-up">
      <div className="h-2 w-full gradient-primary"></div>

      <div className="p-8 sm:p-10 flex flex-col items-center">
        {/* Result Badge */}
        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center justify-center px-5 py-2 rounded-full gradient-primary mb-4 shadow-glow">
            <span className="text-sm font-bold text-white uppercase tracking-widest">
              {getResultBadge().text} {getResultBadge().emoji}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Quiz Selesai!
          </h1>
          <p className="text-text-secondary-light text-lg">Kamu hebat! Terus tingkatkan kemampuanmu! 🚀</p>
        </div>

        {/* Circular Progress */}
        <div className="relative size-52 sm:size-60 mb-12">
          <svg className="size-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              className="text-gray-200"
              cx="50"
              cy="50"
              fill="none"
              r="42"
              stroke="currentColor"
              strokeWidth="8"
            />
            <circle
              className={`${results.scorePercentage >= 80 ? 'text-primary' : results.scorePercentage >= 60 ? 'text-accent' : 'text-primary-light'} drop-shadow-lg`}
              cx="50"
              cy="50"
              fill="none"
              r="42"
              stroke="currentColor"
              strokeDasharray="263.89"
              strokeDashoffset={263.89 - circleProgress}
              strokeLinecap="round"
              strokeWidth="8"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl sm:text-7xl font-black tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {results.scorePercentage}%
            </span>
            <span className={`text-sm font-bold ${getResultColor()} mt-1 uppercase tracking-widest`}>
              Accuracy
            </span>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-4 w-full mb-10">
          {/* Correct */}
          <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-primary/10 border-2 border-primary/20 transition-all hover:-translate-y-2 hover:shadow-lg duration-300">
            <div className="text-5xl">✅</div>
            <div className="text-center">
              <p className="text-3xl font-bold leading-none text-primary mb-1">{results.correctCount}</p>
              <p className="text-xs font-bold text-primary-dark uppercase tracking-wider">Correct</p>
            </div>
          </div>

          {/* Incorrect */}
          <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-danger/10 border-2 border-danger/20 transition-all hover:-translate-y-2 hover:shadow-lg duration-300">
            <div className="text-5xl">❌</div>
            <div className="text-center">
              <p className="text-3xl font-bold leading-none text-danger mb-1">{results.incorrectCount}</p>
              <p className="text-xs font-bold text-danger-dark uppercase tracking-wider">Incorrect</p>
            </div>
          </div>

          {/* Total */}
          <div className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-accent/10 border-2 border-accent/20 transition-all hover:-translate-y-2 hover:shadow-lg duration-300">
            <div className="text-5xl">📝</div>
            <div className="text-center">
              <p className="text-3xl font-bold leading-none text-accent mb-1">{results.totalQuestions}</p>
              <p className="text-xs font-bold text-accent-dark uppercase tracking-wider">Total</p>
            </div>
          </div>
        </div>

        {/* Quiz Info */}
        <div className="text-center px-4">
          <div className="inline-flex items-center gap-4 text-sm text-text-secondary bg-gray-100 px-6 py-3 rounded-full border border-gray-200">
            <span>
              Category: <span className="text-primary font-semibold ml-1">{results.category}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
            <span>
              Difficulty: <span className="text-accent font-semibold ml-1 capitalize">{results.difficulty}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

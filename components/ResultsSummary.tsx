'use client'

import type { QuizResults } from '@/types/quiz'

interface ResultsSummaryProps {
  results: QuizResults
}

export default function ResultsSummary({ results }: ResultsSummaryProps) {
  const getResultBadge = () => {
    if (results.scorePercentage >= 80) return 'Excellent Result'
    if (results.scorePercentage >= 60) return 'Good Job'
    return 'Keep Trying'
  }

  const getResultColor = () => {
    if (results.scorePercentage >= 80) return 'text-emerald-accent'
    if (results.scorePercentage >= 60) return 'text-primary'
    return 'text-orange-500'
  }

  const circleProgress = (results.scorePercentage / 100) * 263.89 // Circle circumference

  return (
    <div className="glass-panel rounded-[2.5rem] overflow-hidden relative group bg-surface-dark border border-white/10">
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-accent via-primary to-indigo-500 shadow-[0_0_15px_rgba(19,127,236,0.6)]"></div>
      
      <div className="p-8 sm:p-10 flex flex-col items-center">
        {/* Result Badge */}
        <div className="text-center mb-8 relative">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
            <span className={`text-xs font-bold ${getResultColor()} uppercase tracking-widest`}>
              {getResultBadge()}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3 text-white drop-shadow-lg">
            Quiz Completed!
          </h1>
          <p className="text-gray-400 text-lg font-light">You&apos;re a trivia enthusiast! Great job.</p>
        </div>

        {/* Circular Progress */}
        <div className="relative size-52 sm:size-60 mb-12">
          <svg className="size-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              className="text-slate-700/50"
              cx="50"
              cy="50"
              fill="none"
              r="42"
              stroke="currentColor"
              strokeWidth="6"
            />
            <circle
              className="text-emerald-accent drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]"
              cx="50"
              cy="50"
              fill="none"
              r="42"
              stroke="currentColor"
              strokeDasharray="263.89"
              strokeDashoffset={263.89 - circleProgress}
              strokeLinecap="round"
              strokeWidth="6"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-6xl sm:text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {results.scorePercentage}%
            </span>
            <span className="text-sm font-bold text-emerald-accent mt-1 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
              Accuracy
            </span>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-3 gap-4 w-full mb-10">
          {/* Correct */}
          <div className="flex flex-col items-center gap-3 p-5 rounded-3xl bg-emerald-accent/10 border border-emerald-accent/20 backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300">
            <div className="size-12 rounded-full bg-emerald-accent text-white flex items-center justify-center shadow-lg shadow-emerald-accent/40">
              <span className="material-symbols-outlined font-bold text-2xl">check</span>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold leading-none text-white mb-1">{results.correctCount}</p>
              <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Correct</p>
            </div>
          </div>

          {/* Incorrect */}
          <div className="flex flex-col items-center gap-3 p-5 rounded-3xl bg-crimson-accent/10 border border-crimson-accent/20 backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300">
            <div className="size-12 rounded-full bg-crimson-accent text-white flex items-center justify-center shadow-lg shadow-crimson-accent/40">
              <span className="material-symbols-outlined font-bold text-2xl">close</span>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold leading-none text-white mb-1">{results.incorrectCount}</p>
              <p className="text-xs font-bold text-red-400 uppercase tracking-wider">Incorrect</p>
            </div>
          </div>

          {/* Total */}
          <div className="flex flex-col items-center gap-3 p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm transition-transform hover:-translate-y-1 duration-300">
            <div className="size-12 rounded-full bg-slate-700 text-white flex items-center justify-center shadow-lg shadow-black/30">
              <span className="material-symbols-outlined font-bold text-2xl">format_list_numbered</span>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold leading-none text-white mb-1">{results.totalQuestions}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total</p>
            </div>
          </div>
        </div>

        {/* Quiz Info */}
        <div className="text-center px-4">
          <div className="inline-flex items-center gap-4 text-sm text-gray-500 bg-black/20 px-6 py-3 rounded-full border border-white/5 backdrop-blur-md">
            <span>
              Category: <span className="text-gray-300 font-semibold ml-1">{results.category}</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span>
              Difficulty: <span className="text-emerald-400 font-semibold ml-1 capitalize">{results.difficulty}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

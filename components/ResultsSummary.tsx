'use client'

import { useState } from 'react'
import type { QuizResults } from '@/types/quiz'

interface ResultsSummaryProps {
  results: QuizResults
}

export default function ResultsSummary({ results }: ResultsSummaryProps) {
  const [showDetails, setShowDetails] = useState(false)

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

  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea')
    txt.innerHTML = html
    return txt.value
  }

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

        {/* Toggle Details Button */}
        {results.questions && results.answers && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-primary bg-primary/10 hover:bg-primary/20 transition-all transform hover:scale-105 active:scale-95 ripple-effect"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showDetails ? 'expand_less' : 'expand_more'}
            </span>
            {showDetails ? 'Hide Details' : 'Show Question Details'}
          </button>
        )}
      </div>

      {/* Question Details Section */}
      {showDetails && results.questions && results.answers && (
        <div className="px-8 pb-8 animate-slide-up">
          <div className="border-t-2 border-gray-200 pt-6">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Question Review</h2>
            <div className="space-y-4">
              {results.questions.map((question, index) => {
                const answer = results.answers?.find(a => a.questionId === question.id)
                const isCorrect = answer?.isCorrect
                const isSkipped = answer?.selectedAnswer === null

                return (
                  <div
                    key={question.id}
                    className={`p-5 rounded-xl border-2 transition-all ${
                      isSkipped
                        ? 'bg-gray-50 border-gray-300'
                        : isCorrect
                        ? 'bg-primary/5 border-primary/30'
                        : 'bg-danger/5 border-danger/30'
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 flex items-center justify-center size-8 rounded-lg bg-white font-bold text-sm text-primary border-2 border-primary/20">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-text-primary leading-relaxed">
                          {decodeHtml(question.question)}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        {isSkipped ? (
                          <span className="text-3xl">⏭️</span>
                        ) : isCorrect ? (
                          <span className="text-3xl">✅</span>
                        ) : (
                          <span className="text-3xl">❌</span>
                        )}
                      </div>
                    </div>

                    {/* Answers */}
                    <div className="ml-11 space-y-2">
                      {/* User's Answer */}
                      {!isSkipped && (
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-sm text-text-secondary min-w-[100px]">
                            Your answer:
                          </span>
                          <span
                            className={`font-medium text-sm ${
                              isCorrect ? 'text-primary' : 'text-danger'
                            }`}
                          >
                            {decodeHtml(answer?.selectedAnswer || '')}
                          </span>
                        </div>
                      )}

                      {/* Skipped Message */}
                      {isSkipped && (
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-sm text-text-secondary min-w-[100px]">
                            Status:
                          </span>
                          <span className="font-medium text-sm text-gray-500">
                            Question was skipped
                          </span>
                        </div>
                      )}

                      {/* Correct Answer */}
                      {!isCorrect && (
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-sm text-text-secondary min-w-[100px]">
                            Correct answer:
                          </span>
                          <span className="font-medium text-sm text-primary">
                            {decodeHtml(question.correctAnswer)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

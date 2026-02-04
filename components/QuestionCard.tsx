'use client'

import { useState, useEffect } from 'react'
import type { Question } from '@/types/quiz'

interface QuestionCardProps {
  question: Question
  questionNumber: number
  onAnswer: (answer: string) => void
  onSkip: () => void
}

export default function QuestionCard({ question, questionNumber, onAnswer, onSkip }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null)
    setIsSubmitting(false)
  }, [question.id])

  const handleSelect = (answer: string) => {
    if (isSubmitting) return

    setSelectedAnswer(answer)
    setIsSubmitting(true)

    // Visual feedback delay before advancing
    setTimeout(() => {
      onAnswer(answer)
    }, 300)
  }

  const handleSkip = () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    onSkip()
  }

  const answerLabels = ['A', 'B', 'C', 'D']

  return (
    <div className="flex-1 flex flex-col justify-center">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
          {question.question}
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
          Select the correct answer from the options below.
        </p>
      </div>

      <div
        className={`grid gap-4 md:gap-6 mb-12 ${question.type === 'boolean' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'
          }`}
      >
        {question.allAnswers.map((answer, index) => {
          const isSelected = selectedAnswer === answer
          const label = question.type === 'boolean' ? answer : answerLabels[index]

          return (
            <button
              key={index}
              onClick={() => handleSelect(answer)}
              disabled={isSubmitting}
              className={`group relative flex items-center p-4 md:p-6 rounded-xl border-2 text-left transition-all duration-200 disabled:cursor-not-allowed ${isSelected
                ? 'border-primary bg-primary shadow-lg shadow-primary/20 scale-[1.01]'
                : 'border-gray-200 dark:border-slate-700 bg-surface-light dark:bg-surface-dark hover:border-primary/50 hover:shadow-lg dark:hover:shadow-primary/5'
                }`}
            >
              {isSelected && (
                <div className="absolute -top-3 -right-3 flex items-center justify-center size-8 bg-white dark:bg-slate-900 rounded-full border-2 border-primary shadow-sm z-10">
                  <span className="material-symbols-outlined text-primary text-sm font-bold">check</span>
                </div>
              )}

              <div
                className={`flex items-center justify-center size-10 md:size-12 rounded-lg font-bold text-lg mr-4 md:mr-6 transition-colors ${isSelected
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 group-hover:bg-primary/10 group-hover:text-primary'
                  }`}
              >
                {label}
              </div>

              <span
                className={`text-lg md:text-xl font-medium transition-colors ${isSelected
                  ? 'text-white font-bold'
                  : 'text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white'
                  }`}
              >
                {answer}
              </span>
            </button>
          )
        })}
      </div>

      <footer className="mt-auto pt-6 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between">
        <button
          onClick={handleSkip}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-gray-500 dark:text-gray-400 font-bold hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Skip Question
        </button>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {isSubmitting && 'Moving to next question...'}
        </div>
      </footer>
    </div>
  )
}

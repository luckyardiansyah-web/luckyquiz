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
    <div className="flex-1 flex flex-col justify-center animate-slide-up">
      <div className="mb-10 text-center md:text-left">
        <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
          <span className="text-primary font-bold text-sm">Question #{questionNumber}</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-[40px] font-bold leading-tight tracking-tight text-text-primary">
          {question.question}
        </h1>
        <p className="mt-4 text-text-secondary text-lg">
          Choose the correct answer! 🤔
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
              className={`group relative flex items-center p-4 md:p-6 rounded-2xl border-2 text-left transition-all duration-300 disabled:cursor-not-allowed transform hover:-translate-y-1 ${isSelected
                ? 'gradient-primary border-primary shadow-glow scale-[1.02]'
                : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-card'
                }`}
            >
              {isSelected && (
                <div className="absolute -top-3 -right-3 flex items-center justify-center size-10 bg-white rounded-full border-2 border-white shadow-lg z-10 animate-bounce-slow">
                  <span className="text-2xl">✅</span>
                </div>
              )}

              <div
                className={`flex items-center justify-center size-10 md:size-12 rounded-xl font-bold text-lg mr-4 md:mr-6 transition-all duration-300 ${isSelected
                  ? 'bg-white/30 text-white scale-110'
                  : 'bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110'
                  }`}
              >
                {label}
              </div>

              <span
                className={`text-lg md:text-xl font-medium transition-colors ${isSelected
                  ? 'text-white font-bold'
                  : 'text-text-primary group-hover:text-primary'
                  }`}
              >
                {answer}
              </span>
            </button>
          )
        })}
      </div>

      <footer className="mt-auto pt-6 border-t border-gray-200 flex items-center justify-between">
        <button
          onClick={handleSkip}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-text-secondary font-bold hover:bg-accent/10 hover:text-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          <span className="material-symbols-outlined text-[20px]">skip_next</span>
          Skip
        </button>

        <div className="text-sm text-text-secondary font-medium">
          {isSubmitting && (
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined animate-spin text-primary">progress_activity</span>
              Processing...
            </span>
          )}
        </div>
      </footer>
    </div>
  )
}

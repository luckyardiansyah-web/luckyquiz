'use client'

import { useState, useEffect } from 'react'
import type { Question } from '@/types/quiz'

interface QuestionCardProps {
  question: Question
  questionNumber: number
  onAnswer: (answer: string) => void
  onSkip: () => void
  onBack?: () => void
  canGoBack?: boolean
  previousAnswer?: string | null
}

export default function QuestionCard({ question, questionNumber, onAnswer, onSkip, onBack, canGoBack = false, previousAnswer }: QuestionCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (previousAnswer !== undefined) {
      setSelectedAnswer(previousAnswer)
    } else {
      setSelectedAnswer(null)
    }
    setIsAnimating(false)
  }, [question.id, previousAnswer])

  const handleSelect = (answer: string) => {
    if (isAnimating) return
    setSelectedAnswer(answer)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handleNext = () => {
    if (selectedAnswer && !isAnimating) {
      setIsAnimating(true)
      onAnswer(selectedAnswer)
    }
  }

  const handleSkip = () => {
    if (isAnimating) return
    onSkip()
  }

  const handleBack = () => {
    if (isAnimating || !onBack) return
    onBack()
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
            <div key={index} className="relative">
              {isSelected && (
                <div className="absolute -top-3 -right-3 flex items-center justify-center size-10 bg-white rounded-full border-2 border-white shadow-lg z-20 animate-bounce-in">
                  <span className="text-2xl">✅</span>
                </div>
              )}
              <button
                onClick={() => handleSelect(answer)}
                disabled={isAnimating}
                className={`w-full group flex items-center p-4 md:p-6 rounded-2xl border-2 text-left transition-all duration-500 transform hover:-translate-y-1 ripple-effect ${
                  isSelected
                    ? 'gradient-primary border-primary shadow-glow scale-[1.02] animate-pulse-glow'
                    : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-card'
                } ${isAnimating ? 'pointer-events-none' : ''}`}
              >

              <div
                className={`flex items-center justify-center size-10 md:size-12 rounded-xl font-bold text-lg mr-4 md:mr-6 transition-all duration-500 ${
                  isSelected
                    ? 'bg-white/30 text-white scale-110 rotate-[360deg]'
                    : 'bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-12'
                }`}
              >
                {label}
              </div>

              <span
                className={`text-lg md:text-xl font-medium transition-all duration-300 ${
                  isSelected
                    ? 'text-white font-bold'
                    : 'text-text-primary group-hover:text-primary'
                }`}
              >
                {answer}
              </span>
            </button>
          </div>
          )
        })}
      </div>

      <footer className="mt-auto pt-6 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {canGoBack && onBack && (
            <button
              onClick={handleBack}
              disabled={isAnimating}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-text-secondary font-bold hover:bg-primary/10 hover:text-primary transition-all transform hover:scale-105 active:scale-95 ripple-effect disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Back
            </button>
          )}
          <button
            onClick={handleSkip}
            disabled={isAnimating}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-text-secondary font-bold hover:bg-accent/10 hover:text-accent transition-all transform hover:scale-105 active:scale-95 ripple-effect disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span className="material-symbols-outlined text-[20px]">skip_next</span>
            Skip
          </button>
        </div>

        {selectedAnswer ? (
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="flex items-center gap-2 px-8 py-3 rounded-full font-bold gradient-primary text-white shadow-glow hover:shadow-glow-lg transition-all transform hover:scale-105 active:scale-95 shimmer-effect ripple-effect animate-slide-in-bottom disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            Next Question
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        ) : (
          <button
            disabled
            className="flex items-center gap-2 px-8 py-3 rounded-full font-bold bg-gray-200 text-gray-400 cursor-not-allowed transition-all"
          >
            Select an answer
            <span className="material-symbols-outlined text-[20px]">radio_button_unchecked</span>
          </button>
        )}
      </footer>
    </div>
  )
}

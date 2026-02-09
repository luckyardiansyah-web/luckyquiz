'use client'

import { useEffect } from 'react'
import ResultsSummary from './ResultsSummary'
import type { QuizResults } from '@/types/quiz'

interface QuizResultModalProps {
  isOpen: boolean
  onClose: () => void
  results: QuizResults
}

export default function QuizResultModal({ isOpen, onClose, results }: QuizResultModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[600px] max-h-[90vh] overflow-y-auto bg-transparent animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center size-10 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-lg transition-all hover:scale-110 active:scale-95"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        <ResultsSummary results={results} />
      </div>
    </div>
  )
}

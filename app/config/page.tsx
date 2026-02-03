'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import Header from '@/components/Header'
import CategorySelector from '@/components/CategorySelector'
import DifficultySelector from '@/components/DifficultySelector'
import { useQuiz } from '@/context/QuizContext'
import { CATEGORIES, QUESTION_COUNT } from '@/utils/constants'
import type { Category, Difficulty } from '@/types/quiz'

export default function ConfigPage() {
  const router = useRouter()
  const { startQuiz, isLoading, error } = useQuiz()
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('medium')

  const handleStartQuiz = async () => {
    if (!selectedCategory) {
      alert('Please select a category')
      return
    }

    await startQuiz({
      category: selectedCategory,
      difficulty: selectedDifficulty,
      questionCount: QUESTION_COUNT,
    })
  }

  return (
    <ProtectedRoute>
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden font-display text-gray-900 dark:text-white">
        <Header />

        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 px-4 py-2 mb-2">
              <a
                className="text-gray-600 dark:text-gray-400 text-base font-medium leading-normal hover:text-primary transition-colors cursor-pointer"
                onClick={() => router.push('/home')}
              >
                Home
              </a>
              <span className="text-gray-600 dark:text-gray-400 text-base font-medium leading-normal">/</span>
              <span className="text-gray-900 dark:text-white text-base font-medium leading-normal">Quiz Config</span>
            </div>

            {/* Header */}
            <div className="flex flex-wrap justify-between gap-3 px-4 mb-6">
              <div className="flex min-w-72 flex-col gap-2">
                <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Configure Your Quiz
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
                  Customize your session settings below to start playing.
                </p>
              </div>
            </div>

            {/* Category Selection */}
            <CategorySelector
              categories={CATEGORIES}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />

            {/* Difficulty and Question Count */}
            <div className="flex flex-col md:flex-row gap-8 mb-8 px-4">
              <DifficultySelector selectedDifficulty={selectedDifficulty} onSelect={setSelectedDifficulty} />

              <div className="flex-1">
                <h3 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-4">
                  3. Number of Questions
                </h3>
                <div className="rounded-xl border border-gray-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark p-6 h-auto md:h-[110px] flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Questions</span>
                    <span className="text-3xl font-black text-gray-900 dark:text-white">{QUESTION_COUNT}</span>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>
                      quiz
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mx-4 mb-4 bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Start Button */}
            <div className="px-4 py-8 flex justify-center md:justify-end">
              <button
                onClick={handleStartQuiz}
                disabled={isLoading || !selectedCategory}
                className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 bg-primary hover:bg-blue-600 transition-colors text-white gap-3 text-lg font-bold leading-normal tracking-[0.015em] px-8 shadow-xl shadow-blue-500/20 dark:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Start Quiz</span>
                    <span className="material-symbols-outlined">play_arrow</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}

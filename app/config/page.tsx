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
      <div className="relative min-h-screen w-full bg-[#F8F9FF] font-display text-gray-900">
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
            <a onClick={() => router.push('/home')} className="hover:text-primary transition-colors cursor-pointer">
              Home
            </a>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="font-medium text-primary">Quiz Config</span>
          </div>

          <header className="mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
              Configure Your Quiz
            </h1>
            <p className="text-gray-500 text-lg">
              Customize your session settings below to start playing.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-3">
              <CategorySelector
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </section>

            <section className="lg:col-span-1">
              <DifficultySelector selectedDifficulty={selectedDifficulty} onSelect={setSelectedDifficulty} />
            </section>

            <section className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">3</span>
                <h2 className="text-xl font-bold text-gray-800">Number of Questions</h2>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-gray-100 flex items-center justify-between min-h-[218px]">
                <div>
                  <p className="text-gray-500 font-medium mb-2 uppercase tracking-wider text-xs">
                    Total Questions
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-black text-gray-900">{QUESTION_COUNT}</span>
                    <span className="text-gray-400 font-medium">Questions</span>
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-center justify-center p-6 border-l border-gray-100 ml-8">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-2">
                    <span className="material-symbols-outlined text-3xl">quiz</span>
                  </div>
                  <p className="text-sm font-medium text-gray-500 text-center">
                    Standard<br />Session
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-8 bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-600 text-sm flex items-center gap-2">
              <span className="material-symbols-outlined">error</span>
              <span className="font-bold">Error:</span> {error}
            </div>
          )}

          {/* Start Button */}
          <div className="mt-16 flex justify-center">
            <button
              onClick={handleStartQuiz}
              disabled={isLoading || !selectedCategory}
              className="group relative px-12 py-5 bg-primary text-white text-xl font-bold rounded-full shadow-2xl shadow-primary/40 hover:scale-105 transition-all duration-300 flex items-center gap-4 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Start Quiz Now</span>
                  <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">
                    play_arrow
                  </span>
                </>
              )}
            </button>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
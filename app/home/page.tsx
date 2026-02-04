'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import Header from '@/components/Header'
import { useQuiz } from '@/context/QuizContext'
import { useQuizResume } from '@/hooks/useQuizResume'
import ResumeQuizModal from '@/components/ResumeQuizModal'

export default function Home() {
  const router = useRouter()
  const { hasResumableQuiz, resumableQuiz } = useQuizResume()

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen w-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-fixed bg-center font-display text-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-indigo-50 z-0"></div>

        <Header />

        {hasResumableQuiz && resumableQuiz && <ResumeQuizModal quiz={resumableQuiz} />}

        <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="text-center mb-16 max-w-3xl animate-slide-up">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight flex items-center justify-center gap-4 flex-wrap">
              <span className="hero-text-gradient">Welcome to LuckyQuiz!</span>
              <span className="material-symbols-outlined text-5xl md:text-6xl text-primary transform -rotate-12">
                celebration
              </span>
            </h1>
            <p className="text-slate-500 text-xl font-medium">
              Challenge yourself with fun quizzes across multiple categories!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            {/* Start New Quiz Card */}
            <button
              onClick={() => router.push('/config')}
              className="group relative bg-white p-8 md:p-10 rounded-[2.5rem] border border-purple-100 custom-shadow hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center animate-slide-up"
            >
              <div className="w-24 h-24 mb-6 bg-purple-700 rounded-3xl icon-container-gradient flex items-center justify-center text-white shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-5xl">rocket_launch</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                Start New Quiz
              </h2>
              <p className="text-slate-500 text-sm font-medium">Begin a new quiz adventure now!</p>
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent group-hover:border-primary/10 pointer-events-none transition-colors duration-300"></div>
            </button>

            {/* View History Card */}
            <button
              onClick={() => router.push('/history')}
              className="group relative bg-white p-8 md:p-10 rounded-[2.5rem] border border-purple-100 custom-shadow hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center animate-slide-up"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="w-24 h-24 mb-6 bg-purple-700 rounded-3xl icon-container-gradient flex items-center justify-center text-white shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-5xl">auto_stories</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                View History
              </h2>
              <p className="text-slate-500 text-sm font-medium">Check your previous quiz results</p>
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent group-hover:border-primary/10 pointer-events-none transition-colors duration-300"></div>
            </button>

            {/* Leaderboard Card */}
            <button
              onClick={() => router.push('/leaderboard')}
              className="group relative bg-white p-8 md:p-10 rounded-[2.5rem] border border-purple-100 custom-shadow hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center animate-slide-up"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-24 h-24 mb-6 bg-purple-700 rounded-3xl icon-container-gradient flex items-center justify-center text-white shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-5xl">trophy</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                Leaderboard
              </h2>
              <p className="text-slate-500 text-sm font-medium">View top performers</p>
              <div className="absolute inset-0 rounded-[2.5rem] border-2 border-transparent group-hover:border-primary/10 pointer-events-none transition-colors duration-300"></div>
            </button>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
'use client'

import { useEffect, useState } from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import Header from '@/components/Header'
import { historyService } from '@/services/historyService'
import type { LeaderboardEntry } from '@/types/history'

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const data = historyService.calculateLeaderboard()
    setLeaderboard(data)
  }, [])

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `#${rank}`
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500'
    if (rank === 2) return 'text-gray-400'
    if (rank === 3) return 'text-orange-600'
    return 'text-slate-500'
  }

  return (
    <ProtectedRoute>
      <div className="relative min-h-screen w-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-fixed bg-center font-display text-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-indigo-50 z-0"></div>

        <Header />

        <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-[960px] mx-auto">
            {/* Header */}
            <div className="mb-8 text-center animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-slate-900 flex items-center justify-center gap-3">
                <span className="hero-text-gradient">Leaderboard</span>
                <span className="material-symbols-outlined text-4xl md:text-5xl text-primary">emoji_events</span>
              </h1>
              <p className="text-slate-500 text-lg md:text-xl font-medium">
                Top quiz performers
              </p>
            </div>

            {/* Leaderboard List */}
            {leaderboard.length === 0 ? (
              <div className="text-center py-16 animate-slide-up">
                <div className="size-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-primary text-[48px]">emoji_events</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">No rankings yet</h3>
                <p className="text-slate-500">
                  Complete quizzes to appear on the leaderboard
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {leaderboard.map((entry, index) => {
                  const rank = index + 1
                  return (
                    <div
                      key={entry.userId}
                      className={`group flex items-center gap-4 md:gap-6 p-6 rounded-[2rem] border transition-all duration-300 animate-slide-up ${rank <= 3
                        ? 'border-purple-200 bg-white custom-shadow hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1'
                        : 'border-purple-100 bg-white custom-shadow hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1'
                        }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      {/* Rank */}
                      <div className={`text-3xl md:text-4xl font-black ${getRankColor(rank)} w-12 md:w-16 text-center flex-shrink-0`}>
                        {getRankIcon(rank)}
                      </div>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 truncate">
                          {entry.username}
                        </h3>
                        <p className="text-sm text-slate-500">Level {entry.level}</p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 md:gap-8">
                        <div className="text-center">
                          <p className="text-xl md:text-2xl font-bold text-primary">{Math.round(entry.averageScore)}%</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wide hidden md:block">Avg Score</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wide md:hidden">Avg</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl md:text-2xl font-bold text-slate-900">{entry.totalQuizzes}</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wide hidden md:block">Quizzes</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wide md:hidden">Quiz</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xl md:text-2xl font-bold text-emerald-500">{entry.bestScore}%</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wide">Best</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
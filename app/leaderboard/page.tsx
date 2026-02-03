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
    return 'text-gray-500'
  }

  return (
    <ProtectedRoute>
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden font-display text-gray-900 dark:text-white">
        <Header />

        <main className="flex-1 px-4 md:px-40 py-8">
          <div className="max-w-[960px] mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-black tracking-tight mb-2">Leaderboard</h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Top quiz performers
              </p>
            </div>

            {/* Leaderboard List */}
            {leaderboard.length === 0 ? (
              <div className="text-center py-16">
                <div className="size-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-gray-400 text-[48px]">emoji_events</span>
                </div>
                <h3 className="text-xl font-bold mb-2">No rankings yet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Complete quizzes to appear on the leaderboard
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((entry, index) => {
                  const rank = index + 1
                  return (
                    <div
                      key={entry.userId}
                      className={`flex items-center gap-6 p-6 rounded-2xl border transition-all duration-200 ${
                        rank <= 3
                          ? 'border-primary bg-primary/5 shadow-lg'
                          : 'border-gray-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark'
                      }`}
                    >
                      {/* Rank */}
                      <div className={`text-4xl font-black ${getRankColor(rank)} w-16 text-center`}>
                        {getRankIcon(rank)}
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{entry.username}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Level {entry.level}</p>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">{Math.round(entry.averageScore)}%</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Avg Score</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">{entry.totalQuizzes}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Quizzes</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-emerald-accent">{entry.bestScore}%</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Best</p>
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

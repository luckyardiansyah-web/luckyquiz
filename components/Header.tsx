'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-slate-800 px-6 md:px-10 py-3 bg-surface-light dark:bg-surface-dark sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="size-8 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
            bolt
          </span>
        </div>
        <h2 className="text-gray-900 dark:text-white text-xl font-black leading-tight tracking-[-0.015em]">
          LuckyQuiz
        </h2>
      </div>

      <div className="flex flex-1 justify-end gap-8">
        <div className="hidden md:flex items-center gap-9">
          <Link
            className={`text-sm font-medium leading-normal transition-colors ${
              isActive('/home')
                ? 'text-primary'
                : 'text-gray-900 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
            href="/home"
          >
            Home
          </Link>
          <Link
            className={`text-sm font-medium leading-normal transition-colors ${
              isActive('/leaderboard')
                ? 'text-primary'
                : 'text-gray-900 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
            href="/leaderboard"
          >
            Leaderboard
          </Link>
          <Link
            className={`text-sm font-medium leading-normal transition-colors ${
              isActive('/history')
                ? 'text-primary'
                : 'text-gray-900 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
            }`}
            href="/history"
          >
            History
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center rounded-full size-10 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-gray-900 dark:text-white">
            <span className="material-symbols-outlined">notifications</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-gray-200 dark:border-slate-800"
              style={{
                backgroundImage:
                  'url("https://ui-avatars.com/api/?name=' + (user?.username || 'User') + '&background=137fec&color=fff")',
              }}
            />

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-dark border border-gray-200 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Level {user?.level}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

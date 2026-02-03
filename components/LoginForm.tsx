'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function LoginForm() {
  const router = useRouter()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Please enter both username and password')
      return
    }

    setIsLoading(true)

    try {
      const result = await login({ username, password })

      if (result.success) {
        router.push('/home')
      } else {
        setError(result.message || 'Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-text-primary text-sm font-semibold ml-1" htmlFor="username">
          Username or Email
        </label>
        <div className="input-group flex w-full items-center rounded-xl bg-deep-navy/50 border border-charcoal-lighter transition-all duration-200">
          <input
            autoComplete="username"
            className="flex-1 bg-transparent border-none text-white placeholder:text-text-secondary/60 h-12 px-4 rounded-l-xl focus:ring-0 text-sm md:text-base font-body"
            id="username"
            placeholder="name@example.com"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <div className="px-4 text-text-secondary">
            <span className="material-symbols-outlined text-[20px]">person</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center ml-1 mr-1">
          <label className="text-text-primary text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <a className="text-electric-blue text-xs font-medium hover:text-blue-400 transition-colors" href="#">
            Forgot Password?
          </a>
        </div>
        <div className="input-group flex w-full items-center rounded-xl bg-deep-navy/50 border border-charcoal-lighter transition-all duration-200">
          <input
            autoComplete="current-password"
            className="flex-1 bg-transparent border-none text-white placeholder:text-text-secondary/60 h-12 px-4 rounded-l-xl focus:ring-0 text-sm md:text-base font-body"
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <div className="px-4 text-text-secondary">
            <span className="material-symbols-outlined text-[20px]">lock</span>
          </div>
        </div>
      </div>

      <button
        className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-electric-blue hover:bg-electric-blue-hover text-white text-sm md:text-base font-bold tracking-wide transition-all shadow-lg hover:shadow-electric-blue/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Start Quiz'}
      </button>
    </form>
  )
}

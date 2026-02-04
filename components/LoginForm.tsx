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
        <div className="bg-danger/10 border border-danger/50 rounded-xl p-4 text-danger-dark text-sm animate-slide-up">
          <span className="material-symbols-outlined text-[18px] inline mr-2 align-middle">error</span>
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label className="text-text-primary text-sm font-semibold ml-1" htmlFor="username">
          Username or Email
        </label>
        <div className="input-group flex w-full items-center rounded-xl bg-white border-2 border-gray-200 hover:border-primary/50 transition-all duration-200">
          <input
            autoComplete="username"
            className="flex-1 bg-transparent border-none text-text-primary placeholder:text-text-secondary h-12 px-4 rounded-l-xl focus:ring-0 text-sm md:text-base font-body"
            id="username"
            placeholder="ex: cintaayuamelia@gmail.com"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
          <div className="px-4 text-primary">
            <span className="material-symbols-outlined text-[20px]">person</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center ml-1 mr-1">
          <label className="text-text-primary text-sm font-semibold" htmlFor="password">
            Password
          </label>
          <a className="text-primary text-xs font-medium hover:text-primary-dark transition-colors" href="#">
            Forgot Password?
          </a>
        </div>
        <div className="input-group flex w-full items-center rounded-xl bg-white border-2 border-gray-200 hover:border-primary/50 transition-all duration-200">
          <input
            autoComplete="current-password"
            className="flex-1 bg-transparent border-none text-text-primary placeholder:text-text-secondary h-12 px-4 rounded-l-xl focus:ring-0 text-sm md:text-base font-body"
            id="password"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <div className="px-4 text-primary">
            <span className="material-symbols-outlined text-[20px]">lock</span>
          </div>
        </div>
      </div>

      <button
        className="mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 gradient-primary hover:shadow-glow text-white text-sm md:text-base font-bold tracking-wide transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
            Signing in...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined mr-2">rocket_launch</span>
            Start Quiz
          </>
        )}
      </button>
    </form>
  )
}

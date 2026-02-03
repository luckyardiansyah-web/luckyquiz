'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { User, AuthState, LoginCredentials } from '@/types/auth'
import { authService } from '@/services/authService'
import storage from '@/utils/localStorage'
import { STORAGE_KEYS } from '@/utils/constants'

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  })

  // Load user from localStorage on mount
  useEffect(() => {
    const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN)
    const user = storage.get<User>(STORAGE_KEYS.USER_DATA)

    if (token && user) {
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      })
    } else {
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials)

      if (response.success && response.token && response.user) {
        // Save to localStorage
        storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token)
        storage.set(STORAGE_KEYS.USER_DATA, response.user)

        // Update state
        setState({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          isLoading: false,
        })

        return { success: true }
      }

      return { success: false, message: response.message || 'Login failed' }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, message: 'An error occurred during login' }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear localStorage
      storage.remove(STORAGE_KEYS.AUTH_TOKEN)
      storage.remove(STORAGE_KEYS.USER_DATA)
      storage.remove(STORAGE_KEYS.QUIZ_STATE)

      // Update state
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      })

      // Redirect to login
      router.push('/login')
    }
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

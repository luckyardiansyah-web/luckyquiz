import type { LoginCredentials, LoginResponse, User } from '@/types/auth'

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    const data: LoginResponse = await response.json()
    return data
  },

  async logout(): Promise<void> {
    await fetch('/api/auth/logout', {
      method: 'POST',
    })
  },

  async getCurrentUser(token: string): Promise<User | null> {
    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      return data.user
    } catch (error) {
      console.error('Error fetching current user:', error)
      return null
    }
  },
}

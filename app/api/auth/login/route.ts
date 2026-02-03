import { NextResponse } from 'next/server'
import type { LoginCredentials, LoginResponse } from '@/types/auth'

// Mock user database
const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'admin',
}

export async function POST(request: Request) {
  try {
    const body: LoginCredentials = await request.json()
    const { username, password } = body

    // Validate credentials
    if (username === VALID_CREDENTIALS.username && password === VALID_CREDENTIALS.password) {
      // Generate mock token
      const token = `mock-jwt-token-${Date.now()}`
      
      // Create user object
      const user = {
        id: '1',
        username: 'admin',
        level: 12,
      }

      const response: LoginResponse = {
        success: true,
        token,
        user,
      }

      return NextResponse.json(response)
    }

    // Invalid credentials
    const response: LoginResponse = {
      success: false,
      message: 'Invalid username or password',
    }

    return NextResponse.json(response, { status: 401 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

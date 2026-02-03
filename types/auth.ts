export interface User {
  id: string
  username: string
  level: number
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  success: boolean
  token?: string
  user?: User
  message?: string
}

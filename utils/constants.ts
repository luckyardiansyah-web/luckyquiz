import { Category } from '@/types/quiz'

export const QUIZ_DURATION = 900 // 15 minutes in seconds
export const TIMER_WARNING_THRESHOLD = 120 // 2 minutes in seconds
export const QUESTION_COUNT = 10

export const CATEGORIES: Category[] = [
  { id: 18, name: 'Computers', icon: 'computer' },
  { id: 23, name: 'History', icon: 'menu_book' },
  { id: 21, name: 'Sports', icon: 'emoji_events' },
  { id: 22, name: 'Geography', icon: 'public' },
  { id: 11, name: 'Film', icon: 'movie' },
  { id: 17, name: 'Science', icon: 'science' },
  { id: 25, name: 'Art', icon: 'palette' },
  { id: 27, name: 'Animals', icon: 'pets' },
  { id: 12, name: 'Music', icon: 'music_note' },
  { id: 15, name: 'Games', icon: 'stadia_controller' },
]

export const DIFFICULTY_LABELS: Record<string, { label: string; stars: number; color: string }> = {
  easy: { label: 'Easy', stars: 1, color: 'text-green-500' },
  medium: { label: 'Medium', stars: 2, color: 'text-yellow-500' },
  hard: { label: 'Hard', stars: 3, color: 'text-red-500' },
}

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  QUIZ_STATE: 'quiz_state',
  QUIZ_HISTORY: 'quiz_history',
}

export const QUIZ_STATE_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

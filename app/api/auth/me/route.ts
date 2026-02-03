import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // In a real app, you would verify the JWT token from the Authorization header
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Mock user response
  const user = {
    id: '1',
    username: 'admin',
    level: 12,
  }

  return NextResponse.json({ success: true, user })
}

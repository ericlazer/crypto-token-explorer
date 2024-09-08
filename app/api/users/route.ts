import { NextResponse } from 'next/server'
import type { User } from '@/types'

// Mock data
const users: User[] = [
  {
    id: '1',
    username: 'cryptoking',
    avatar: '/placeholder.svg?height=50&width=50',
    walletAddress: '0x1234...5678',
    heldTokens: [],
    createdTokens: [],
    followers: [],
    following: [],
    likesReceived: 100,
    mentionsReceived: 50,
    bio: 'Crypto enthusiast and investor',
    replies: [],
    notifications: []
  },
  // Add more mock users here
]

export async function GET(request: Request) {
  // Get the username from the query string
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (username) {
    const user = users.find(u => u.username === username)
    if (user) {
      return NextResponse.json(user)
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
  }

  // If no username provided, return all users
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  // Here you would typically validate the input and create a new user in the database
  // For this example, we'll just return the received data
  const newUser: User = {
    id: (users.length + 1).toString(),
    ...body,
    heldTokens: [],
    createdTokens: [],
    followers: [],
    following: [],
    likesReceived: 0,
    mentionsReceived: 0,
    replies: [],
    notifications: []
  }

  users.push(newUser)

  return NextResponse.json(newUser, { status: 201 })
}
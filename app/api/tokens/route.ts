import { NextResponse } from 'next/server'
import type { Token, User } from '@/types'

// Mock data
const tokens: Token[] = [
  {
    id: '1',
    name: 'Ethereum',
    ticker: 'ETH',
    image: '/placeholder.svg?height=50&width=50',
    creator: {
      id: '1',
      username: 'vitalik',
      avatar: '/placeholder.svg?height=50&width=50',
      walletAddress: '0x123...456',
      heldTokens: [],
      createdTokens: [],
      followers: [],
      following: [],
      likesReceived: 0,
      mentionsReceived: 0,
      bio: '',
      replies: [],
      notifications: []
    },
    marketCap: 200000000000,
    replies: 1000,
    description: 'Decentralized platform for smart contracts',
    isFeatured: true
  },
  // Add more mock tokens here
]

export async function GET(request: Request) {
  // Get the token ID from the query string
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const token = tokens.find(t => t.id === id)
    if (token) {
      return NextResponse.json(token)
    } else {
      return NextResponse.json({ error: 'Token not found' }, { status: 404 })
    }
  }

  // If no ID provided, return all tokens
  return NextResponse.json(tokens)
}

export async function POST(request: Request) {
  const body = await request.json()
  
  // Here you would typically validate the input and create a new token in the database
  // For this example, we'll just return the received data
  const newToken: Token = {
    id: (tokens.length + 1).toString(),
    ...body,
    replies: 0,
    isFeatured: false
  }

  tokens.push(newToken)

  return NextResponse.json(newToken, { status: 201 })
}
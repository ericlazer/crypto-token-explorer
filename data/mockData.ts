import { User, Token, Reply, Notification, Action } from '@/types'

export const mockUsers: User[] = [
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
  {
    id: '2',
    username: 'tokenguru',
    avatar: '/placeholder.svg?height=50&width=50',
    walletAddress: '0x5678...9012',
    heldTokens: [],
    createdTokens: [],
    followers: [],
    following: [],
    likesReceived: 75,
    mentionsReceived: 30,
    bio: 'Blockchain developer and token creator',
    replies: [],
    notifications: []
  }
]

export const mockTokens: Token[] = [
  {
    id: '1',
    name: 'Ethereum',
    ticker: 'ETH',
    image: '/placeholder.svg?height=50&width=50',
    creator: mockUsers[0],
    marketCap: 200000000000,
    replies: 1000,
    description: 'Decentralized platform for smart contracts',
    isFeatured: true
  },
  {
    id: '2',
    name: 'Bitcoin',
    ticker: 'BTC',
    image: '/placeholder.svg?height=50&width=50',
    creator: mockUsers[1],
    marketCap: 500000000000,
    replies: 2000,
    description: 'Digital gold and store of value',
    isFeatured: false
  }
]

export const mockReplies: Reply[] = [
  {
    id: '1',
    content: 'Great project!',
    timestamp: new Date('2023-06-01'),
    likes: 5
  },
  {
    id: '2',
    content: 'Looking forward to the next update',
    timestamp: new Date('2023-06-02'),
    likes: 3
  }
]

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    from: mockUsers[0],
    timestamp: new Date('2023-06-03')
  },
  {
    id: '2',
    type: 'mention',
    from: mockUsers[1],
    timestamp: new Date('2023-06-04')
  }
]

export const mockActions: Action[] = [
  {
    user: mockUsers[0],
    action: 'bought',
    token: mockTokens[0],
    amount: 1.5,
    timestamp: new Date('2023-06-05')
  },
  {
    user: mockUsers[1],
    action: 'sold',
    token: mockTokens[1],
    amount: 0.5,
    timestamp: new Date('2023-06-06')
  }
]
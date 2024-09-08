'use client'

import React, { useState, useEffect } from 'react'
import { MessageSquare, Wallet, X, ChevronDown, Heart, Send, Search } from 'lucide-react'
import { createChart, ColorType } from 'lightweight-charts'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Token, Reply, Notification, Action } from '@/types'

// Sample data
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
  {
    id: '2',
    name: 'Bitcoin',
    ticker: 'BTC',
    image: '/placeholder.svg?height=50&width=50',
    creator: {
      id: '2',
      username: 'satoshi',
      avatar: '/placeholder.svg?height=50&width=50',
      walletAddress: '1A1z...Qe7c',
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
    marketCap: 500000000000,
    replies: 2000,
    description: 'Digital gold and store of value'
  }
]

// Components
const WalletConnectionModal: React.FC<{ isOpen: boolean; onClose: () => void; onConnect: (wallet: string) => void }> = ({ isOpen, onClose, onConnect }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Button onClick={() => onConnect('Phantom')}>Phantom</Button>
          <Button onClick={() => onConnect('MetaMask')}>MetaMask</Button>
          <Button onClick={() => onConnect('WalletConnect')}>WalletConnect</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const ConfirmWalletModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Wallet Connection</DialogTitle>
        </DialogHeader>
        <p>Please confirm the wallet connection in your wallet application.</p>
        <Button onClick={onConfirm}>I've Confirmed</Button>
      </DialogContent>
    </Dialog>
  )
}

const SignMessageModal: React.FC<{ isOpen: boolean; onClose: () => void; onSign: () => void }> = ({ isOpen, onClose, onSign }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign Message</DialogTitle>
        </DialogHeader>
        <p>Please sign the message in your wallet to complete the connection.</p>
        <Button onClick={onSign}>I've Signed</Button>
      </DialogContent>
    </Dialog>
  )
}

const ProfileModal: React.FC<{ user: User; isOpen: boolean; onClose: () => void; onDisconnect: () => void }> = ({ user, isOpen, onClose, onDisconnect }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <div className="flex items-center mb-4">
          <img src={user.avatar} alt={user.username} className="w-16 h-16 rounded-full mr-4" />
          <div>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="text-sm text-muted-foreground">{user.walletAddress}</p>
          </div>
        </div>
        <p>{user.bio}</p>
        <div className="mt-4">
          <p>Followers: {user.followers.length}</p>
          <p>Following: {user.following.length}</p>
          <p>Likes received: {user.likesReceived}</p>
          <p>Mentions received: {user.mentionsReceived}</p>
        </div>
        <Button onClick={onDisconnect} className="mt-4">Disconnect Wallet</Button>
      </DialogContent>
    </Dialog>
  )
}

const TradingViewChart: React.FC = () => {
  const chartContainerRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        layout: {
          background: { type: ColorType.Solid, color: 'transparent' },
          textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
          vertLines: { color: 'rgba(197, 203, 206, 0.2)' },
          horzLines: { color: 'rgba(197, 203, 206, 0.2)' },
        },
      })

      const lineSeries = chart.addLineSeries({ color: '#2962FF' })
      lineSeries.setData([
        { time: '2023-01-01', value: 100 },
        { time: '2023-02-01', value: 120 },
        { time: '2023-03-01', value: 110 },
        { time: '2023-04-01', value: 130 },
        { time: '2023-05-01', value: 150 },
      ])

      chart.timeScale().fitContent()

      return () => {
        chart.remove()
      }
    }
  }, [])

  return <div ref={chartContainerRef} />
}

const HolderDistributionChart: React.FC = () => {
  const data = [
    { name: 'Whales', value: 30 },
    { name: 'Institutions', value: 40 },
    { name: 'Retail', value: 30 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

const CommentSection: React.FC = () => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <div className="space-y-4">
        {/* Sample comments */}
        <div className="bg-secondary p-3 rounded">
          <p className="font-semibold">User123</p>
          <p>Great project! Looking forward to seeing more developments.</p>
        </div>
        <div className="bg-secondary p-3 rounded">
          <p className="font-semibold">CryptoFan</p>
          <p>Interesting concept, but I have some concerns about scalability.</p>
        </div>
      </div>
      <div className="mt-4">
        <Textarea
          placeholder="Add a comment..."
          value={comment}
          onChange={handleCommentChange}
          className="mb-2"
        />
        <Button>Post Comment</Button>
      </div>
    </div>
  )
}

const TokenDetail: React.FC<{ token: Token; onClose: () => void }> = ({ token, onClose }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <img src={token.image} alt={token.name} className="w-8 h-8 rounded-full mr-2" />
            {token.name} ({token.ticker})
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-lg font-semibold">Market Cap: ${token.marketCap.toLocaleString()}</p>
            <p className="text-muted-foreground">Created by: {token.creator.username}</p>
            <p className="mt-2">{token.description}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Price Chart</h3>
              <TradingViewChart />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Holder Distribution</h3>
            <HolderDistributionChart />
            <div className="mt-4 flex space-x-2">
              <Button>
                <Heart className="mr-2 h-4 w-4" /> Like
              </Button>
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" /> Comment
              </Button>
              <Button>
                <Send className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
            <CommentSection />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const TerminalView: React.FC<{ user: User | null, actions: Action[] }> = ({ user, actions }) => {
  const [sortBy, setSortBy] = useState('bump order')
  const [sortOrder, setSortOrder] = useState('desc')
  const [showAnimations, setShowAnimations] = useState(true)
  const [includeNSFW, setIncludeNSFW] = useState(false)
  const [showSortOptions, setShowSortOptions] = useState(false)

  const sortedActions = [...actions].sort((a, b) => {
    if (sortBy === 'bump order')
      return sortOrder === 'desc' ? b.timestamp.getTime() - a.timestamp.getTime() : a.timestamp.getTime() - b.timestamp.getTime()
    // Add more sorting options here
    return 0
  })

  return (
    <div className="bg-background text-foreground p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            {sortBy} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
          {showSortOptions && (
            <Card className="absolute mt-2 w-48 z-10">
              <CardContent className="p-0">
                {['bump order', 'featured', 'creation time', 'last reply', 'currently live', 'market cap'].map((option) => (
                  <Button
                    key={option}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => { setSortBy(option); setShowSortOptions(false); }}
                  >
                    sort: {option}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
        >
          order: {sortOrder}
        </Button>
        <div>
          <Label className="mr-4 flex items-center">
            <Checkbox
              checked={showAnimations}
              onCheckedChange={() => setShowAnimations(!showAnimations)}
              className="mr-2"
            />
            <span>Show animations</span>
          </Label>
          <Label className="flex items-center">
            <Checkbox
              checked={includeNSFW}
              onCheckedChange={() => setIncludeNSFW(!includeNSFW)}
              className="mr-2"
            />
            <span>Include NSFW</span>
          </Label>
        </div>
      </div>
      <div className="space-y-4">
        {sortedActions.map((action, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <img src={action.user.avatar} alt={action.user.username} className="w-8 h-8 rounded-full mr-2" />
                <span className="font-bold">{action.user.username}</span>
                <span className="ml-2">{action.action}</span>
                <span className="ml-2">{action.amount} {action.token.ticker}</span>
              </div>
              <p>{action.token.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const PeopleYouMayKnow: React.FC<{ users: User[], onFollow: (user: User) => void }> = ({ users, onFollow }) => {
  return (
    <Card className="mt-6">
      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-4">People you may know</h3>
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full mr-2" />
                <div>
                  <p className="font-bold">{user.username}</p>
                  <p className="text-sm text-muted-foreground">{user.followers.length} followers</p>
                </div>
              </div>
              <Button onClick={() => onFollow(user)}>
                Follow
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function Component() {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [isSignMessageModalOpen, setIsSignMessageModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [view, setView] = useState<'following' | 'terminal'>('terminal')
  const [actions, setActions] = useState<Action[]>([])
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([])

  const handleWalletConnect = (wallet: string) => {
    setConnectedWallet(wallet)
    setIsWalletModalOpen(false)
    setIsConfirmModalOpen(true)
  }

  const handleWalletConfirm = () => {
    setIsConfirmModalOpen(false)
    setIsSignMessageModalOpen(true)
  }

  const handleSignMessage = () => {
    setIsSignMessageModalOpen(false)
    setUser({
      id: '1',
      username: 'billgate69',
      avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-smWbnqlQ8j9sokZZI6Cqe6R8v9aj1h.png',
      walletAddress: '9SXBpir5TBurFxr4xYvKkdzdCXRYokyE9gZJ2NNjYcvN',
      heldTokens: [],
      createdTokens: [],
      followers: [],
      following: [],
      likesReceived: 1,
      mentionsReceived: 0,
      bio: 'Crypto enthusiast and developer',
      replies: [
        {
          id: '1',
          content: 'sister tate make us rich',
          timestamp: new Date('2024-06-07T18:58:41'),
          likes: 1
        }
      ],
      notifications: []
    })
  }

  const handleDisconnect = () => {
    setConnectedWallet(null)
    setUser(null)
    setIsProfileModalOpen(false)
  }

  const handleFollow = (userToFollow: User) => {
    if (user) {
      setUser({
        ...user,
        following: [...user.following, userToFollow]
      })
      // You would typically make an API call here to update the follow status
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const kingOfTheHill = tokens.find(token => token.isFeatured)

  useEffect(() => {
    // Simulating fetching actions and suggested users
    setActions([
      {
        user: { id: '2', username: 'UNRWA', avatar: '/placeholder.svg?height=50&width=50', walletAddress: '', heldTokens: [], createdTokens: [], followers: [], following: [], likesReceived: 0, mentionsReceived: 0, bio: '', replies: [], notifications: [] },
        action: 'sold',
        token: { ...tokens[0], name: 'Book Of Neuralink', ticker: 'BON' },
        amount: 0.3210,
        timestamp: new Date()
      },
      {
        user: { id: '3', username: 'UNRWA', avatar: '/placeholder.svg?height=50&width=50', walletAddress: '', heldTokens: [], createdTokens: [], followers: [], following: [], likesReceived: 0, mentionsReceived: 0, bio: '', replies: [], notifications: [] },
        action: 'sold',
        token: { ...tokens[0], name: 'Neurabinance', ticker: 'NEURANA' },
        amount: 0.2685,
        timestamp: new Date()
      },
    ])

    setSuggestedUsers([
      { id: '3', username: 'spasticys', avatar: '/placeholder.svg?height=50&width=50', followers: Array(896), following: [], heldTokens: [], createdTokens: [], likesReceived: 0, mentionsReceived: 0, bio: '', replies: [], notifications: [], walletAddress: '' },
      { id: '4', username: '89zyOK', avatar: '/placeholder.svg?height=50&width=50', followers: Array(888), following: [], heldTokens: [], createdTokens: [], likesReceived: 0, mentionsReceived: 0, bio: '', replies: [], notifications: [], walletAddress: '' },
      { id: '5', username: 'alphapepe', avatar: '/placeholder.svg?height=50&width=50', followers: Array(887), following: [], heldTokens: [], createdTokens: [], likesReceived: 0, mentionsReceived: 0, bio: '', replies: [], notifications: [], walletAddress: '' },
      { id: '6', username: '4UYK7C', avatar: '/placeholder.svg?height=50&width=50', followers: Array(882), following: [], heldTokens: [], createdTokens: [], likesReceived: 0, mentionsReceived: 0, bio: '', replies: [], notifications: [], walletAddress: '' },
      { id: '7', username: 'Ingyhib55', avatar: '/placeholder.svg?height=50&width=50', followers: Array(877), following: [], heldTokens: [], createdTokens: [], likesReceived: 0, mentionsReceived: 0, bio: '', replies: [], notifications: [], walletAddress: '' },
    ])
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Crypto Token Explorer</h1>
        {user ? (
          <div className="flex items-center">
            <span className="mr-4">{user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}</span>
            <Button 
              variant="outline"
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center"
            >
              <img src={user.avatar} alt={user.username} className="w-6 h-6 rounded-full mr-2" />
              {user.username} ▼
            </Button>
          </div>
        ) : (
          <Button 
            onClick={() => setIsWalletModalOpen(true)}
            className="flex items-center"
          >
            <Wallet className="mr-2" />
            Connect Wallet
          </Button>
        )}
      </header>

      {kingOfTheHill && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="text-2xl font-bold text-center text-yellow-400 mb-4">King of the Movement</h2>
            <div className="flex items-center">
              <img src={kingOfTheHill.image} alt={kingOfTheHill.name} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h3 className="text-xl font-semibold">{kingOfTheHill.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Created by{' '}
                  <Button variant="link" className="p-0" onClick={() => {/* Open creator profile */}}>
                    {kingOfTheHill.creator.username}
                  </Button>
                </p>
                <p className="text-green-400">Market cap: ${kingOfTheHill.marketCap.toLocaleString()}</p>
                <p className="text-muted-foreground">Replies: {kingOfTheHill.replies}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for token"
            className="pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Button className="absolute right-2 top-2" size="sm">
            Search
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <Button
          variant={view === 'following' ? 'default' : 'ghost'}
          onClick={() => setView('following')}
          className="mr-4"
        >
          Following
        </Button>
        <Button
          variant={view === 'terminal' ? 'default' : 'ghost'}
          onClick={() => setView('terminal')}
        >
          Terminal
        </Button>
      </div>

      {view === 'following' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTokens.map((token) => (
            <Card key={token.id} className="cursor-pointer" onClick={() => setSelectedToken(token)}>
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <img src={token.image} alt={token.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold">{token.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Created by{' '}
                      <Button variant="link" className="p-0" onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        /* Open creator profile */
                      }}>
                        {token.creator.username}
                      </Button>
                    </p>
                  </div>
                </div>
                <p className="text-green-400">Market cap: ${token.marketCap.toLocaleString()}</p>
                <p className="text-muted-foreground">Replies: {token.replies}</p>
                <p className="text-muted-foreground mt-2">{token.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <TerminalView user={user} actions={actions} />
      )}

      <PeopleYouMayKnow users={suggestedUsers} onFollow={handleFollow} />

      {selectedToken && (
        <TokenDetail token={selectedToken} onClose={() => setSelectedToken(null)} />
      )}

      <WalletConnectionModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />

      <ConfirmWalletModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleWalletConfirm}
      />

      <SignMessageModal
        isOpen={isSignMessageModalOpen}
        onClose={() => setIsSignMessageModalOpen(false)}
        onSign={handleSignMessage}
      />

      {user && (
        <ProfileModal
          user={user}
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onDisconnect={handleDisconnect}
        />
      )}
    </div>
  )
}

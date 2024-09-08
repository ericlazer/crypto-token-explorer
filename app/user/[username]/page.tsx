'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, Heart, MessageSquare, RefreshCw, Wallet, ChevronDown, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User } from '@/types'

interface UserProfile {
  username: string
  avatar: string
  followers: number
  walletAddress: string
  likesReceived: number
  mentionsReceived: number
  bio: string
  coinsHeld: Array<{
    name: string
    amount: number
    value: number
  }>
  coinsCreated: Array<{
    name: string
    ticker: string
    marketCap: number
  }>
  following: Array<{
    username: string
    avatar: string
  }>
  comments: Array<{
    content: string
    timestamp: string
    likes: number
  }>
}

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
        <Button onClick={onDisconnect} className="mt-4">Disconnect Wallet</Button>
      </DialogContent>
    </Dialog>
  )
}

export default function UserProfilePage() {
  const params = useParams()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [activeTab, setActiveTab] = useState('coins-held')
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [connectedUser, setConnectedUser] = useState<User | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // In a real application, you would fetch the user data from an API
    // For this example, we'll use mock data
    const mockUser: UserProfile = {
      username: params.username as string,
      avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-smWbnqlQ8j9sokZZI6Cqe6R8v9aj1h.png',
      followers: 10009,
      walletAddress: 'FC3nyVqdufVfrgXiRJEqgST1JdJSEBEz6a9KoBfFP7c4',
      likesReceived: 212,
      mentionsReceived: 40,
      bio: 'https://t.me/psykocall',
      coinsHeld: [
        { name: '$AC', amount: 8529190, value: 0.1846 },
        { name: '$michi', amount: 80, value: 0.0633 },
        { name: '$MILF', amount: 1047902, value: 0.0312 },
        { name: 'BCAT', amount: 100000, value: 0.0028 },
        { name: '$croc', amount: 1, value: 0.0000 },
      ],
      coinsCreated: [
        { name: 'PsykoCoin', ticker: 'PSY', marketCap: 1000000 },
      ],
      following: [
        { username: 'cryptoking', avatar: '/placeholder.svg?height=50&width=50' },
        { username: 'tokenguru', avatar: '/placeholder.svg?height=50&width=50' },
      ],
      comments: [
        { content: 'Great project!', timestamp: '2023-06-01', likes: 5 },
        { content: 'Looking forward to the next update', timestamp: '2023-06-02', likes: 3 },
      ],
    }
    setUser(mockUser)
  }, [params.username])

  const handleWalletConnect = (wallet: string) => {
    setIsWalletModalOpen(false)
    setConnectedUser({
      id: '1',
      username: 'connectedUser',
      avatar: '/placeholder.svg?height=32&width=32',
      walletAddress: '0x1234...5678',
      heldTokens: [],
      createdTokens: [],
      followers: [],
      following: [],
      likesReceived: 0,
      mentionsReceived: 0,
      bio: '',
      replies: [],
      notifications: []
    })
  }

  const handleDisconnect = () => {
    setConnectedUser(null)
    setIsProfileModalOpen(false)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between items-center p-4 border-b">
        <Link href="/" className="text-2xl font-bold text-primary">Crypto Token Explorer</Link>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for token"
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          {connectedUser ? (
            <Button 
              variant="outline"
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center"
            >
              <img src={connectedUser.avatar} alt={connectedUser.username} className="w-6 h-6 rounded-full mr-2" />
              {connectedUser.username} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              onClick={() => setIsWalletModalOpen(true)}
              className="flex items-center"
            >
              <Wallet className="mr-2" />
              Connect Wallet
            </Button>
          )}
        </div>
      </header>

      <div className="container mx-auto p-4">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Image
                  src={user.avatar}
                  alt={user.username}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
                <div>
                  <h1 className="text-2xl font-bold">@{user.username}</h1>
                  <p className="text-sm text-muted-foreground">{user.followers} followers</p>
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                </div>
              </div>
              <Button>Follow</Button>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <Link 
                href={`https://explorer.solana.com/address/${user.walletAddress}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline flex items-center"
              >
                {user.walletAddress}
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                <span className="mr-4">{user.likesReceived}</span>
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>{user.mentionsReceived}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="coins-held">Coins Held</TabsTrigger>
            <TabsTrigger value="coins-created">Coins Created</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          <TabsContent value="coins-held">
            <Card>
              <CardContent className="p-4">
                {user.coinsHeld.map((coin, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center">
                      <Image
                        src={`/placeholder.svg?height=32&width=32&text=${coin.name}`}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="rounded-full mr-2"
                      />
                      <div>
                        <Link href={`/coin/${coin.name}`} className="font-semibold hover:underline">
                          {coin.amount.toLocaleString()} {coin.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">{coin.value.toFixed(4)} SOL</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm" className="mr-2">
                        <RefreshCw className="w-4 h-4 mr-1" />
                        Refresh
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="coins-created">
            <Card>
              <CardContent className="p-4">
                {user.coinsCreated.map((coin, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div>
                      <Link href={`/coin/${coin.ticker}`} className="font-semibold hover:underline">
                        {coin.name} ({coin.ticker})
                      </Link>
                      <p className="text-sm text-muted-foreground">Market Cap: ${coin.marketCap.toLocaleString()}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowUpRight className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="following">
            <Card>
              <CardContent className="p-4">
                {user.following.map((followedUser, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center">
                      <Image
                        src={followedUser.avatar}
                        alt={followedUser.username}
                        width={32}
                        height={32}
                        className="rounded-full mr-2"
                      />
                      <Link href={`/user/${followedUser.username}`} className="font-semibold hover:underline">
                        @{followedUser.username}
                      </Link>
                    </div>
                    <Button variant="ghost" size="sm">Unfollow</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comments">
            <Card>
              <CardContent className="p-4">
                {user.comments.map((comment, index) => (
                  <div key={index} className="py-2 border-b last:border-b-0">
                    <p>{comment.content}</p>
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                      <span>{comment.timestamp}</span>
                      <div className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        <span>{comment.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <WalletConnectionModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnect}
      />

      {connectedUser && (
        <ProfileModal
          user={connectedUser}
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onDisconnect={handleDisconnect}
        />
      )}
    </div>
  )
}
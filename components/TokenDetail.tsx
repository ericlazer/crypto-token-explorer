import React from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Token } from '@/types'
import { Heart, MessageSquare, Send } from 'lucide-react'
import TradingViewChart from './TradingViewChart'
import HolderDistributionChart from './HolderDistributionChart'
import CommentSection from './CommentSection'

interface TokenDetailProps {
  token: Token
  onClose: () => void
}

const TokenDetail: React.FC<TokenDetailProps> = ({ token, onClose }) => {
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

export default TokenDetail
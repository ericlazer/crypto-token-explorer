import React from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User } from '@/types'

interface ProfileModalProps {
  user: User
  isOpen: boolean
  onClose: () => void
  onDisconnect: () => void
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, isOpen, onClose, onDisconnect }) => {
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

export default ProfileModal
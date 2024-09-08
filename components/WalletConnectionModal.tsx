import React from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (wallet: string) => void
}

const WalletConnectionModal: React.FC<WalletConnectionModalProps> = ({ isOpen, onClose, onConnect }) => {
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

export default WalletConnectionModal
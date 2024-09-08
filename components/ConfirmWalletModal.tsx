import React from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ConfirmWalletModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const ConfirmWalletModal: React.FC<ConfirmWalletModalProps> = ({ isOpen, onClose, onConfirm }) => {
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

export default ConfirmWalletModal
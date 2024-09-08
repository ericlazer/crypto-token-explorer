import React from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SignMessageModalProps {
  isOpen: boolean
  onClose: () => void
  onSign: () => void
}

const SignMessageModal: React.FC<SignMessageModalProps> = ({ isOpen, onClose, onSign }) => {
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

export default SignMessageModal
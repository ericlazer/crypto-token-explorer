import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown } from 'lucide-react'
import { User, Action } from '@/types'

interface TerminalViewProps {
  user: User | null
  actions: Action[]
}

const TerminalView: React.FC<TerminalViewProps> = ({ user, actions }) => {
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

export default TerminalView
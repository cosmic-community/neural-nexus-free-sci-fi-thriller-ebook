'use client'

import { BookDetails } from '@/lib/cosmic'
import { Heart, Coffee, CreditCard } from 'lucide-react'
import { useState } from 'react'

interface DonateButtonProps {
  bookDetails: BookDetails | null
}

export function DonateButton({ bookDetails }: DonateButtonProps) {
  const [showOptions, setShowOptions] = useState(false)
  
  const hasDonationOptions = bookDetails?.metadata?.donation_url || bookDetails?.metadata?.stripe_url
  
  if (!hasDonationOptions) {
    return null
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 btn-hover"
      >
        <Heart size={16} />
        Support
      </button>
      
      {showOptions && (
        <div className="absolute right-0 top-12 bg-card border rounded-lg shadow-lg p-2 min-w-48 z-10 glass-effect">
          {bookDetails?.metadata?.donation_url && (
            <a
              href={bookDetails.metadata.donation_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors w-full text-left"
            >
              <Coffee size={18} />
              <div>
                <div className="font-medium">Buy Me a Coffee</div>
                <div className="text-sm text-muted-foreground">Support via Coffee</div>
              </div>
            </a>
          )}
          
          {bookDetails?.metadata?.stripe_url && (
            <a
              href={bookDetails.metadata.stripe_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors w-full text-left"
            >
              <CreditCard size={18} />
              <div>
                <div className="font-medium">Donate via Stripe</div>
                <div className="text-sm text-muted-foreground">Secure payment</div>
              </div>
            </a>
          )}
        </div>
      )}
      
      {showOptions && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  )
}
'use client'

import { BookDetails } from '@/lib/cosmic'
import { Heart, Coffee, CreditCard, Gift } from 'lucide-react'
import { useState } from 'react'

interface DonateButtonProps {
  bookDetails: BookDetails | null
}

export function DonateButton({ bookDetails }: DonateButtonProps) {
  const [showOptions, setShowOptions] = useState(false)
  
  // Check if any donation options are available
  const hasDonationOptions = bookDetails?.metadata?.donation_url || bookDetails?.metadata?.stripe_url
  
  if (!hasDonationOptions) {
    return (
      <div className="flex items-center gap-2 px-6 py-3 bg-muted/50 rounded-xl">
        <Heart className="w-5 h-5 text-muted-foreground" />
        <span className="font-medium text-muted-foreground">Support Coming Soon</span>
      </div>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-300 btn-hover shadow-lg"
      >
        <Heart className="w-5 h-5" />
        <span className="font-medium">Support Author</span>
      </button>
      
      {showOptions && (
        <div className="absolute right-0 top-14 bg-card border rounded-xl shadow-xl p-3 min-w-72 z-50 glass-effect">
          <div className="mb-3">
            <h3 className="font-semibold text-lg mb-1">Support the Author</h3>
            <p className="text-sm text-muted-foreground">
              Help create more amazing sci-fi stories
            </p>
          </div>
          
          <div className="space-y-2">
            {bookDetails?.metadata?.donation_url && (
              <a
                href={bookDetails.metadata.donation_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-accent transition-colors w-full text-left border border-orange-200 hover:border-orange-300"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Buy Me a Coffee</div>
                  <div className="text-sm text-muted-foreground">Quick $5 support</div>
                </div>
              </a>
            )}
            
            {bookDetails?.metadata?.stripe_url && (
              <a
                href={bookDetails.metadata.stripe_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-accent transition-colors w-full text-left border border-blue-200 hover:border-blue-300"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Custom Donation</div>
                  <div className="text-sm text-muted-foreground">Choose your amount</div>
                </div>
              </a>
            )}
          </div>
          
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gift className="w-4 h-4" />
              <span>100% goes to the author</span>
            </div>
          </div>
        </div>
      )}
      
      {showOptions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  )
}
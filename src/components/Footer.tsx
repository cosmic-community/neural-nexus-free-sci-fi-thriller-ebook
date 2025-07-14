import { BookDetails, SiteSettings } from '@/lib/cosmic'
import { Heart, Book, Coffee } from 'lucide-react'

interface FooterProps {
  bookDetails: BookDetails | null
  siteSettings: SiteSettings | null
}

export function Footer({ bookDetails, siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="mt-16 pt-8 border-t border-border/50">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Book size={20} />
          <span className="text-lg font-medium">
            {bookDetails?.metadata?.title || 'Neural Nexus'}
          </span>
        </div>
        
        <p className="text-muted-foreground">
          A free sci-fi thriller by {bookDetails?.metadata?.author || 'Your Name'}
        </p>
        
        {(bookDetails?.metadata?.donation_url || bookDetails?.metadata?.stripe_url) && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Heart size={16} />
            <span>Enjoying the story? Consider supporting the author</span>
          </div>
        )}
        
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>© {currentYear} {bookDetails?.metadata?.author || 'Your Name'}</span>
          <span>•</span>
          <span>Made with ❤️ using Cosmic</span>
        </div>
      </div>
    </footer>
  )
}
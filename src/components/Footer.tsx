import { BookDetails, SiteSettings } from '@/lib/cosmic'
import { Heart, Github, Twitter, Mail } from 'lucide-react'

interface FooterProps {
  bookDetails: BookDetails | null
  siteSettings: SiteSettings | null
}

export function Footer({ bookDetails, siteSettings }: FooterProps) {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold gradient-text">
              {bookDetails?.metadata?.title || 'Neural Nexus'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {bookDetails?.metadata?.description || 'A thrilling sci-fi adventure exploring the boundaries of consciousness and technology.'}
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="space-y-2">
              <a href="#chapters" className="block text-sm hover:text-primary transition-colors">
                Read Chapters
              </a>
              <a href="/about" className="block text-sm hover:text-primary transition-colors">
                About
              </a>
              <a href="/support" className="block text-sm hover:text-primary transition-colors">
                Support
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {bookDetails?.metadata?.author || 'Neural Nexus'}. Made with <Heart className="w-4 h-4 inline text-red-500" /> using Cosmic CMS.
          </p>
        </div>
      </div>
    </footer>
  )
}
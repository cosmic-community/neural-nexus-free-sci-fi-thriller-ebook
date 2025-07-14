import { BookDetails, SiteSettings } from '@/lib/cosmic'
import { Clock, BookOpen, Volume2, Download } from 'lucide-react'

interface HeroProps {
  bookDetails: BookDetails | null
  siteSettings: SiteSettings | null
}

export function Hero({ bookDetails, siteSettings }: HeroProps) {
  const primaryColor = siteSettings?.metadata?.primary_color || '#00ffff'
  
  // Use the cover image from bookDetails or fallback to default
  const coverImageUrl = bookDetails?.metadata?.cover_image?.imgix_url || 
                        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=2000&auto=format,compress'
  
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-primary font-medium">Free Sci-Fi Thriller</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">
                {bookDetails?.metadata?.title || 'Neural Nexus'}
              </span>
            </h1>
            
            {bookDetails?.metadata?.subtitle && (
              <p className="text-2xl lg:text-3xl text-muted-foreground mb-6">
                {bookDetails.metadata.subtitle}
              </p>
            )}
            
            <div className="prose prose-lg prose-invert max-w-none mb-8">
              <div dangerouslySetInnerHTML={{ 
                __html: bookDetails?.metadata?.description || 
                '<p>In the year 2087, neural interfaces have revolutionized human consciousness. Dr. Maya Chen discovers that her groundbreaking brain-computer interface technology has been secretly weaponized by the powerful Nexus Corporation.</p>' 
              }} />
            </div>
            
            {/* Book Stats */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>12 chapters</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{bookDetails?.metadata?.reading_time || '90+ min'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <span>Audio enabled</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#chapters"
                className="btn btn-primary btn-lg group"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Reading
                <div className="ml-2 transform group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </a>
              
              <a
                href="#support"
                className="btn btn-outline btn-lg group"
              >
                <Download className="w-5 h-5 mr-2" />
                Support the Author
              </a>
            </div>
          </div>
          
          {/* Book Cover */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl transform rotate-6" />
              <img
                src={`${coverImageUrl}?w=600&h=800&fit=crop&auto=format,compress`}
                alt={`${bookDetails?.metadata?.title || 'Neural Nexus'} book cover`}
                className="relative w-80 h-auto rounded-2xl shadow-2xl border border-primary/20"
                width={320}
                height={480}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
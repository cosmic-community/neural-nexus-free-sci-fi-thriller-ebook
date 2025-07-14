import { BookDetails, SiteSettings } from '@/lib/cosmic'
import { ThemeToggle } from './ThemeToggle'
import { DonateButton } from './DonateButton'

interface BookHeaderProps {
  bookDetails: BookDetails | null
  siteSettings: SiteSettings | null
}

export function BookHeader({ bookDetails, siteSettings }: BookHeaderProps) {
  const primaryColor = siteSettings?.metadata?.primary_color || '#00ffff'
  
  return (
    <header className="mb-12">
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            {bookDetails?.metadata?.title || 'Neural Nexus'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-3">
            {bookDetails?.metadata?.subtitle || 'A Sci-Fi Thriller'}
          </p>
          <p className="text-lg md:text-xl text-muted-foreground">
            by {bookDetails?.metadata?.author || 'Your Name'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <DonateButton bookDetails={bookDetails} />
          {siteSettings?.metadata?.enable_dark_mode && <ThemeToggle />}
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {bookDetails?.metadata?.cover_image && (
          <div className="order-2 md:order-1">
            <img 
              src={`${bookDetails.metadata.cover_image.imgix_url}?w=600&h=800&fit=crop&auto=format,compress`}
              alt={bookDetails.metadata.title}
              className="w-full max-w-sm mx-auto md:mx-0 rounded-2xl shadow-2xl card-hover"
            />
          </div>
        )}
        
        <div className="order-1 md:order-2">
          <div className="prose prose-lg max-w-none text-foreground mb-6">
            <div dangerouslySetInnerHTML={{ __html: bookDetails?.metadata?.description || '' }} />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {bookDetails?.metadata?.genre && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-card border">
                <span className="text-muted-foreground">Genre:</span>
                <span className="font-medium">{bookDetails.metadata.genre}</span>
              </div>
            )}
            {bookDetails?.metadata?.reading_time && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-card border">
                <span className="text-muted-foreground">Reading Time:</span>
                <span className="font-medium">{bookDetails.metadata.reading_time}</span>
              </div>
            )}
            {bookDetails?.metadata?.publication_date && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-card border">
                <span className="text-muted-foreground">Published:</span>
                <span className="font-medium">{new Date(bookDetails.metadata.publication_date).toLocaleDateString()}</span>
              </div>
            )}
            {bookDetails?.metadata?.enable_tts && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-card border">
                <span className="text-muted-foreground">🔊 Audio:</span>
                <span className="font-medium">Available</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
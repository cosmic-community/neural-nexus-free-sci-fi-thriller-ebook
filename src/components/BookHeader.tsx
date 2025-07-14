import { BookDetails, SiteSettings } from '@/lib/cosmic'
import { Moon, Sun } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

interface BookHeaderProps {
  bookDetails: BookDetails | null
  siteSettings: SiteSettings | null
}

export function BookHeader({ bookDetails, siteSettings }: BookHeaderProps) {
  const primaryColor = siteSettings?.metadata?.primary_color || '#00ffff'
  
  return (
    <header className="mb-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
            {bookDetails?.metadata?.title || 'Neural Nexus'}
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            {bookDetails?.metadata?.subtitle || 'A Sci-Fi Thriller'}
          </p>
          <p className="text-lg text-muted-foreground">
            by {bookDetails?.metadata?.author || 'Your Name'}
          </p>
        </div>
        {siteSettings?.metadata?.enable_dark_mode && <ThemeToggle />}
      </div>
      
      {bookDetails?.metadata?.cover_image && (
        <div className="mb-6">
          <img 
            src={`${bookDetails.metadata.cover_image.imgix_url}?w=400&h=600&fit=crop&auto=format,compress`}
            alt={bookDetails.metadata.title}
            className="w-48 h-72 object-cover rounded-lg shadow-lg"
          />
        </div>
      )}
      
      <div className="prose prose-lg max-w-none text-foreground">
        <div dangerouslySetInnerHTML={{ __html: bookDetails?.metadata?.description || '' }} />
      </div>
      
      <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
        {bookDetails?.metadata?.genre && (
          <span>Genre: {bookDetails.metadata.genre}</span>
        )}
        {bookDetails?.metadata?.reading_time && (
          <span>Reading Time: {bookDetails.metadata.reading_time}</span>
        )}
        {bookDetails?.metadata?.publication_date && (
          <span>Published: {new Date(bookDetails.metadata.publication_date).toLocaleDateString()}</span>
        )}
      </div>
    </header>
  )
}
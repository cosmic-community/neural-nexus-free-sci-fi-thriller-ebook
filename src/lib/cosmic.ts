import { createBucketClient } from '@cosmicjs/sdk'

// Initialize Cosmic client
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
  readKey: process.env.COSMIC_READ_KEY!,
  writeKey: process.env.COSMIC_WRITE_KEY,
})

// Export the cosmic client
export { cosmic }

// TypeScript interfaces
export interface SiteSettings {
  id: string
  title: string
  slug: string
  metadata: {
    site_title: string
    site_description: string
    default_theme: {
      key: string
      value: string
    }
    primary_color: string
    font_family: {
      key: string
      value: string
    }
    enable_dark_mode: boolean
    show_progress: boolean
    enable_navigation: boolean
  }
}

export interface BookDetails {
  id: string
  title: string
  slug: string
  metadata: {
    title: string
    subtitle?: string
    author: string
    description: string
    cover_image?: {
      url: string
      imgix_url: string
    }
    genre?: string
    publication_date?: string
    reading_time?: string
    donation_url?: string
    stripe_url?: string
    enable_tts: boolean
    default_voice?: {
      key: string
      value: string
    }
  }
}

export interface Chapter {
  id: string
  title: string
  slug: string
  metadata: {
    chapter_number: number
    chapter_title: string
    content: string
    word_count?: number
    reading_time?: string
    enable_audio: boolean
    summary?: string
  }
}

// Fetch functions with proper error handling
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'site-settings',
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.object as SiteSettings
  } catch (error) {
    console.error('Error fetching site settings:', error)
    // Return default site settings if none found
    return {
      id: 'default-site-settings',
      title: 'Neural Nexus - Site Settings',
      slug: 'neural-nexus-site-settings',
      metadata: {
        site_title: 'Neural Nexus - Free Sci-Fi Thriller Ebook',
        site_description: 'Read Neural Nexus, a gripping sci-fi thriller about neural interfaces, corporate espionage, and digital consciousness. Free online ebook with text-to-speech functionality.',
        default_theme: { key: 'dark', value: 'Dark' },
        primary_color: '#00ffff',
        font_family: { key: 'inter', value: 'Inter' },
        enable_dark_mode: true,
        show_progress: true,
        enable_navigation: true
      }
    }
  }
}

export async function getBookDetails(): Promise<BookDetails | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'book-details',
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.object as BookDetails
  } catch (error) {
    console.error('Error fetching book details:', error)
    // Return default book details if none found
    return {
      id: 'default-book-details',
      title: 'Neural Nexus - Book Details',
      slug: 'neural-nexus-book-details',
      metadata: {
        title: 'Neural Nexus',
        subtitle: 'A Sci-Fi Thriller',
        author: 'AI Generated Story',
        description: '<p>In the year 2087, neural interfaces have revolutionized human consciousness. Dr. Maya Chen, a brilliant neuroscientist, discovers that her groundbreaking brain-computer interface technology has been secretly weaponized by the powerful Nexus Corporation.</p><p>When she attempts to expose the truth, Maya becomes the target of digital assassins who can hack human minds directly. Racing against time through a world where the line between human consciousness and artificial intelligence has been dangerously blurred, she must navigate corporate espionage, mind-hacking, and her own augmented reality to survive.</p><p>A fast-paced thriller that explores the dark side of technological advancement and the price of human enhancement.</p>',
        cover_image: {
          url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=2000&auto=format,compress',
          imgix_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=2000&auto=format,compress'
        },
        genre: 'Sci-Fi Thriller',
        publication_date: '2024',
        reading_time: '2-3 hours',
        donation_url: 'https://buymeacoffee.com/yourname',
        stripe_url: 'https://donate.stripe.com/your-link',
        enable_tts: true,
        default_voice: { key: 'female', value: 'Female' }
      }
    }
  }
}

export async function getChapters(): Promise<Chapter[]> {
  try {
    // Fetch all chapters without limit
    const response = await cosmic.objects.find({
      type: 'chapters',
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    if (response.objects && response.objects.length > 0) {
      const chapters = response.objects as Chapter[]
      
      // Sort chapters by chapter_number to ensure correct order
      return chapters.sort((a, b) => {
        const aNum = a.metadata?.chapter_number || 0
        const bNum = b.metadata?.chapter_number || 0
        return aNum - bNum
      })
    }
    
    // Return empty array if no chapters found
    return []
  } catch (error) {
    console.error('Error fetching chapters:', error)
    
    // Return empty array if error occurs
    return []
  }
}

export async function getChapterBySlug(slug: string): Promise<Chapter | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'chapters',
      slug: slug,
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    if (response.object) {
      return response.object as Chapter
    }
    
    return null
  } catch (error) {
    console.error('Error fetching chapter:', error)
    return null
  }
}

export async function getAllChaptersForStaticGeneration(): Promise<Chapter[]> {
  try {
    // Fetch all chapters without any limits for static generation
    const response = await cosmic.objects.find({
      type: 'chapters',
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    if (response.objects && response.objects.length > 0) {
      const chapters = response.objects as Chapter[]
      
      // Sort chapters by chapter_number to ensure correct order
      return chapters.sort((a, b) => {
        const aNum = a.metadata?.chapter_number || 0
        const bNum = b.metadata?.chapter_number || 0
        return aNum - bNum
      })
    }
    
    return []
  } catch (error) {
    console.error('Error fetching chapters for static generation:', error)
    return []
  }
}
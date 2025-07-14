import { createBucketClient } from '@cosmicjs/sdk'

// Initialize Cosmic client
const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
  readKey: process.env.COSMIC_READ_KEY!,
  writeKey: process.env.COSMIC_WRITE_KEY,
  apiEnvironment: "staging"
})

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

// Fetch functions
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'site-settings',
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.object as SiteSettings
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
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
    return null
  }
}

export async function getChapters(): Promise<Chapter[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'chapters',
    }).props(['id', 'title', 'slug', 'metadata']).depth(1).sort('metadata.chapter_number')
    
    return response.objects as Chapter[]
  } catch (error) {
    console.error('Error fetching chapters:', error)
    return []
  }
}

export async function getChapterBySlug(slug: string): Promise<Chapter | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'chapters',
      slug: slug,
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.object as Chapter
  } catch (error) {
    console.error('Error fetching chapter:', error)
    return null
  }
}
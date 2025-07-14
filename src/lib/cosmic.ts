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
      id: '',
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
      id: '',
      title: 'Neural Nexus - Book Details',
      slug: 'neural-nexus-book-details',
      metadata: {
        title: 'Neural Nexus',
        subtitle: 'A Sci-Fi Thriller',
        author: 'Your Name',
        description: '<p>In the year 2087, neural interfaces have revolutionized human consciousness. Dr. Maya Chen, a brilliant neuroscientist, discovers that her groundbreaking brain-computer interface technology has been secretly weaponized by the powerful Nexus Corporation.</p><p>When she attempts to expose the truth, Maya becomes the target of digital assassins who can hack human minds directly. Racing against time through a world where the line between human consciousness and artificial intelligence has been dangerously blurred, she must navigate corporate espionage, mind-hacking, and her own augmented reality to survive.</p><p>A fast-paced thriller that explores the dark side of technological advancement and the price of human enhancement.</p>',
        genre: 'Sci-Fi Thriller',
        reading_time: '2-3 hours',
        enable_tts: true,
        default_voice: { key: 'female', value: 'Female' }
      }
    }
  }
}

export async function getChapters(): Promise<Chapter[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'chapters',
    }).props(['id', 'title', 'slug', 'metadata']).depth(1).sort('metadata.chapter_number')
    
    const chapters = response.objects as Chapter[]
    
    // Sort chapters by chapter_number to ensure correct order
    return chapters.sort((a, b) => {
      const aNum = a.metadata?.chapter_number || 0
      const bNum = b.metadata?.chapter_number || 0
      return aNum - bNum
    })
  } catch (error) {
    console.error('Error fetching chapters:', error)
    
    // Return demo chapters if none found in Cosmic
    return [
      {
        id: 'demo-chapter-1',
        title: 'Chapter 1: The Discovery',
        slug: 'the-discovery',
        metadata: {
          chapter_number: 1,
          chapter_title: 'The Discovery',
          content: '<p>Dr. Maya Chen stood in her laboratory, staring at the neural interface prototype that would change everything. The soft blue glow of the quantum processors cast shadows across her face as she prepared for the most important test of her career.</p><p>"Are you ready for this?" her assistant Jake asked, nervously adjusting his glasses.</p><p>Maya nodded, her fingers trembling slightly as she reached for the neural crown. She had spent five years developing this technology, and now the moment of truth had arrived.</p><p>As the device activated, Maya felt her consciousness expand beyond the boundaries of her physical form. The digital realm opened before her like a vast ocean of data and possibility. But something was wrong—there were other presences in the network, dark shapes moving through the code like predators.</p><p>"Maya!" Jake\'s voice seemed to come from a great distance. "Your vitals are spiking!"</p><p>She tried to disconnect, but the neural interface held her fast. The shadowy figures drew closer, and Maya realized with growing horror that they weren\'t just programs—they were something else entirely.</p>',
          word_count: 180,
          reading_time: '2 min',
          enable_audio: true,
          summary: 'Dr. Maya Chen tests her revolutionary neural interface technology for the first time, but discovers something sinister lurking in the digital realm.'
        }
      },
      {
        id: 'demo-chapter-2',
        title: 'Chapter 2: The Hunters',
        slug: 'the-hunters',
        metadata: {
          chapter_number: 2,
          chapter_title: 'The Hunters',
          content: '<p>The emergency protocols kicked in, flooding Maya\'s system with neural stabilizers. She gasped as her consciousness snapped back to her physical body, the laboratory spinning around her.</p><p>"What happened in there?" Jake demanded, helping her to a chair.</p><p>Maya\'s hands shook as she removed the neural crown. "There were... things. In the network. They were hunting."</p><p>Before Jake could respond, the laboratory\'s security system activated. Red lights flashed as automated locks sealed the exits.</p><p>"Dr. Chen," a cold voice echoed through the speakers, "you have accessed restricted neural pathways. Please remain calm while we verify your clearance."</p><p>Maya\'s blood turned to ice. That voice belonged to Marcus Sterling, the CEO of Nexus Corporation—her former employer and the man who had tried to steal her research.</p><p>"How did you get into my system?" she whispered.</p><p>"The same way we\'ve been watching you for months," Sterling replied. "Your neural interface is more valuable than you realize, Maya. And now it belongs to us."</p>',
          word_count: 195,
          reading_time: '2 min',
          enable_audio: true,
          summary: 'Maya discovers that her neural interface has been compromised by the Nexus Corporation, led by her former employer Marcus Sterling.'
        }
      }
    ]
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
    
    // Return demo chapter if not found in Cosmic
    const demoChapters = await getChapters()
    return demoChapters.find(chapter => chapter.slug === slug) || null
  }
}
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_TRACKING_ID || '', {
      page_path: url,
    })
  }
}

export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Book-specific events
export const trackChapterRead = (chapterNumber: number, chapterTitle: string) => {
  event({
    action: 'chapter_read',
    category: 'reading',
    label: `Chapter ${chapterNumber}: ${chapterTitle}`,
    value: chapterNumber
  })
}

export const trackAudioPlay = (chapterNumber: number) => {
  event({
    action: 'audio_play',
    category: 'engagement',
    label: `Chapter ${chapterNumber}`,
    value: chapterNumber
  })
}

export const trackDonation = (platform: string) => {
  event({
    action: 'donation_click',
    category: 'support',
    label: platform
  })
}

export const trackNewsletterSignup = () => {
  event({
    action: 'newsletter_signup',
    category: 'engagement'
  })
}
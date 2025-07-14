import Link from 'next/link'
import { Chapter, SiteSettings } from '@/lib/cosmic'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ChapterNavigationProps {
  currentChapter: Chapter
  allChapters: Chapter[]
  siteSettings?: SiteSettings | null
  previousChapter?: Chapter | null
  nextChapter?: Chapter | null
}

export function ChapterNavigation({ currentChapter, allChapters, siteSettings, previousChapter, nextChapter }: ChapterNavigationProps) {
  // Use the passed props if available, otherwise calculate them
  const currentIndex = allChapters.findIndex(chapter => chapter.id === currentChapter.id)
  const prevChapter = previousChapter !== undefined ? previousChapter : (currentIndex > 0 ? allChapters[currentIndex - 1] : null)
  const nextChap = nextChapter !== undefined ? nextChapter : (currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null)
  
  const primaryColor = siteSettings?.metadata?.primary_color || '#00ffff'

  return (
    <nav className="flex justify-between items-center mt-12 pt-8 border-t border-border/50">
      <div className="flex-1">
        {prevChapter && (
          <Link
            href={`/chapters/${prevChapter.slug}`}
            className="group flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-all duration-300 card-hover max-w-sm"
          >
            <ChevronLeft size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            <div>
              <div className="text-sm text-muted-foreground">Previous</div>
              <div className="font-medium group-hover:text-primary transition-colors">
                Chapter {prevChapter.metadata.chapter_number}: {prevChapter.metadata.chapter_title}
              </div>
            </div>
          </Link>
        )}
      </div>
      
      <div className="flex-1 flex justify-end">
        {nextChap && (
          <Link
            href={`/chapters/${nextChap.slug}`}
            className="group flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-all duration-300 card-hover max-w-sm text-right"
          >
            <div>
              <div className="text-sm text-muted-foreground">Next</div>
              <div className="font-medium group-hover:text-primary transition-colors">
                Chapter {nextChap.metadata.chapter_number}: {nextChap.metadata.chapter_title}
              </div>
            </div>
            <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        )}
      </div>
    </nav>
  )
}
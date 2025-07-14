import Link from 'next/link'
import { Chapter, SiteSettings } from '@/lib/cosmic'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ChapterNavigationProps {
  currentChapter: Chapter
  allChapters: Chapter[]
  siteSettings: SiteSettings | null
}

export function ChapterNavigation({ currentChapter, allChapters, siteSettings }: ChapterNavigationProps) {
  const currentIndex = allChapters.findIndex(chapter => chapter.id === currentChapter.id)
  const previousChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null
  const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null
  
  const primaryColor = siteSettings?.metadata?.primary_color || '#00ffff'

  return (
    <nav className="flex justify-between items-center mt-12 pt-8 border-t border-border/50">
      <div className="flex-1">
        {previousChapter && (
          <Link
            href={`/chapters/${previousChapter.slug}`}
            className="group flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-all duration-300 card-hover max-w-sm"
          >
            <ChevronLeft size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
            <div>
              <div className="text-sm text-muted-foreground">Previous</div>
              <div className="font-medium group-hover:text-primary transition-colors">
                Chapter {previousChapter.metadata.chapter_number}: {previousChapter.metadata.chapter_title}
              </div>
            </div>
          </Link>
        )}
      </div>
      
      <div className="flex-1 flex justify-end">
        {nextChapter && (
          <Link
            href={`/chapters/${nextChapter.slug}`}
            className="group flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent transition-all duration-300 card-hover max-w-sm text-right"
          >
            <div>
              <div className="text-sm text-muted-foreground">Next</div>
              <div className="font-medium group-hover:text-primary transition-colors">
                Chapter {nextChapter.metadata.chapter_number}: {nextChapter.metadata.chapter_title}
              </div>
            </div>
            <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        )}
      </div>
    </nav>
  )
}
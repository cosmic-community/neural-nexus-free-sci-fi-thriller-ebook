import Link from 'next/link'
import { Chapter } from '@/lib/cosmic'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ChapterNavigationProps {
  previousChapter: Chapter | null
  nextChapter: Chapter | null
}

export function ChapterNavigation({ previousChapter, nextChapter }: ChapterNavigationProps) {
  return (
    <nav className="flex justify-between items-center mt-12 pt-8 border-t">
      <div className="flex-1">
        {previousChapter && (
          <Link
            href={`/chapters/${previousChapter.slug}`}
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <ChevronLeft size={16} />
            <div>
              <div className="text-sm text-muted-foreground">Previous</div>
              <div>Chapter {previousChapter.metadata.chapter_number}: {previousChapter.metadata.chapter_title}</div>
            </div>
          </Link>
        )}
      </div>
      
      <div className="flex-1 text-center">
        <Link
          href="/"
          className="px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
        >
          Back to Chapters
        </Link>
      </div>
      
      <div className="flex-1 text-right">
        {nextChapter && (
          <Link
            href={`/chapters/${nextChapter.slug}`}
            className="flex items-center gap-2 text-primary hover:underline justify-end"
          >
            <div>
              <div className="text-sm text-muted-foreground">Next</div>
              <div>Chapter {nextChapter.metadata.chapter_number}: {nextChapter.metadata.chapter_title}</div>
            </div>
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
    </nav>
  )
}
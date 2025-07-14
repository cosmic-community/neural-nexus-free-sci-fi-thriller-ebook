import Link from 'next/link'
import { Chapter, SiteSettings } from '@/lib/cosmic'

interface ChapterListProps {
  chapters: Chapter[]
  siteSettings: SiteSettings | null
}

export function ChapterList({ chapters, siteSettings }: ChapterListProps) {
  const primaryColor = siteSettings?.metadata?.primary_color || '#00ffff'
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6" style={{ color: primaryColor }}>
        Chapters
      </h2>
      
      <div className="grid gap-4">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/chapters/${chapter.slug}`}
            className="block p-6 border rounded-lg hover:shadow-lg transition-shadow bg-card hover:bg-accent"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  Chapter {chapter.metadata.chapter_number}: {chapter.metadata.chapter_title}
                </h3>
                {chapter.metadata.summary && (
                  <p className="text-muted-foreground mb-2">
                    {chapter.metadata.summary}
                  </p>
                )}
                <div className="flex gap-4 text-sm text-muted-foreground">
                  {chapter.metadata.reading_time && (
                    <span>⏱️ {chapter.metadata.reading_time}</span>
                  )}
                  {chapter.metadata.word_count && (
                    <span>📝 {chapter.metadata.word_count} words</span>
                  )}
                  {chapter.metadata.enable_audio && (
                    <span>🔊 Audio available</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
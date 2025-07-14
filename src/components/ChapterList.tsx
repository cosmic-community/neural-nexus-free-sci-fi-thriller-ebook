import Link from 'next/link'
import { Chapter, SiteSettings } from '@/lib/cosmic'
import { Clock, BookOpen, Volume2 } from 'lucide-react'

interface ChapterListProps {
  chapters: Chapter[]
  siteSettings: SiteSettings | null
}

export function ChapterList({ chapters, siteSettings }: ChapterListProps) {
  const primaryColor = siteSettings?.metadata?.primary_color || '#00ffff'
  
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-8 gradient-text">
        Chapters
      </h2>
      
      <div className="grid gap-6">
        {chapters.map((chapter) => (
          <Link
            key={chapter.id}
            href={`/chapters/${chapter.slug}`}
            className="group block"
          >
            <div className="p-6 border rounded-2xl bg-card hover:bg-accent transition-all duration-300 card-hover glass-effect">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    Chapter {chapter.metadata.chapter_number}: {chapter.metadata.chapter_title}
                  </h3>
                  
                  {chapter.metadata.summary && (
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {chapter.metadata.summary}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {chapter.metadata.reading_time && (
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{chapter.metadata.reading_time}</span>
                      </div>
                    )}
                    {chapter.metadata.word_count && (
                      <div className="flex items-center gap-1">
                        <BookOpen size={16} />
                        <span>{chapter.metadata.word_count} words</span>
                      </div>
                    )}
                    {chapter.metadata.enable_audio && (
                      <div className="flex items-center gap-1">
                        <Volume2 size={16} />
                        <span>Audio available</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
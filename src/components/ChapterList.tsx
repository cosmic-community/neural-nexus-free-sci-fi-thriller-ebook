import Link from 'next/link'
import { Chapter, SiteSettings } from '@/lib/cosmic'
import { Clock, BookOpen, Volume2, ArrowRight } from 'lucide-react'

interface ChapterListProps {
  chapters: Chapter[]
  siteSettings: SiteSettings | null
}

export function ChapterList({ chapters, siteSettings }: ChapterListProps) {
  const primaryColor = siteSettings?.metadata?.primary_color || '#00ffff'
  
  return (
    <section id="chapters" className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          <span className="gradient-text">Read the Story</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Follow Dr. Maya Chen's journey through a world where consciousness and technology collide
        </p>
        <div className="mt-4 text-lg text-muted-foreground">
          <span className="font-semibold text-primary">{chapters.length}</span> chapters available
        </div>
      </div>
      
      {chapters.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">No chapters available yet</p>
            <p className="text-sm">Check back soon for new content!</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:gap-8">
          {chapters.map((chapter, index) => (
            <Link
              key={chapter.id}
              href={`/chapters/${chapter.slug}`}
              className="group block"
            >
              <div className="relative p-8 border rounded-3xl bg-card hover:bg-accent transition-all duration-500 card-hover glass-effect overflow-hidden">
                {/* Chapter Number Badge */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">
                    {chapter.metadata?.chapter_number || index + 1}
                  </span>
                </div>
                
                {/* Audio Badge */}
                {chapter.metadata?.enable_audio && (
                  <div className="absolute top-6 right-6 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-primary" />
                  </div>
                )}
                
                {/* Content */}
                <div className="pl-16 pr-12">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {chapter.metadata?.chapter_title || chapter.title}
                  </h3>
                  
                  {chapter.metadata?.summary && (
                    <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                      {chapter.metadata.summary}
                    </p>
                  )}
                  
                  {/* Chapter Stats */}
                  <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-4">
                    {chapter.metadata?.reading_time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{chapter.metadata.reading_time}</span>
                      </div>
                    )}
                    {chapter.metadata?.word_count && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{chapter.metadata.word_count.toLocaleString()} words</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Read Button */}
                  <div className="flex items-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Read Chapter</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                  <div 
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${((index + 1) / chapters.length) * 100}%` }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      {/* Reading Stats */}
      {chapters.length > 0 && (
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>{chapters.length} chapters</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>
                {chapters.reduce((total, chapter) => {
                  const time = chapter.metadata?.reading_time || '0 min'
                  const minutes = parseInt(time.split(' ')[0]) || 0
                  return total + minutes
                }, 0)} min total
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <span>Audio enabled</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
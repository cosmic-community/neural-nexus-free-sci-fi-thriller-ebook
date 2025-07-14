import { BookDetails, Chapter } from '@/lib/cosmic'
import { Book, Clock, FileText, Headphones } from 'lucide-react'

interface BookStatsProps {
  bookDetails: BookDetails | null
  chapters: Chapter[]
}

export function BookStats({ bookDetails, chapters }: BookStatsProps) {
  const totalWordCount = chapters.reduce((sum, chapter) => 
    sum + (chapter.metadata.word_count || 0), 0
  )
  
  const totalReadingTime = chapters.reduce((sum, chapter) => {
    const time = chapter.metadata.reading_time || '0 min'
    const minutes = parseInt(time.split(' ')[0]) || 0
    return sum + minutes
  }, 0)
  
  const audioEnabledChapters = chapters.filter(chapter => 
    chapter.metadata.enable_audio
  ).length

  const stats = [
    {
      icon: Book,
      label: 'Chapters',
      value: chapters.length.toString(),
      color: 'text-blue-400'
    },
    {
      icon: FileText,
      label: 'Words',
      value: totalWordCount.toLocaleString(),
      color: 'text-green-400'
    },
    {
      icon: Clock,
      label: 'Reading Time',
      value: `${Math.round(totalReadingTime)} min`,
      color: 'text-purple-400'
    },
    {
      icon: Headphones,
      label: 'Audio Chapters',
      value: audioEnabledChapters.toString(),
      color: 'text-orange-400'
    }
  ]

  return (
    <section className="mb-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-6 border rounded-2xl bg-card glass-effect">
            <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
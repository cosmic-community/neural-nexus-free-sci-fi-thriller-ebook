import { BookDetails, Chapter } from '@/lib/cosmic'
import { BookOpen, Clock, Volume2, Users, Star, Download } from 'lucide-react'

interface BookStatsProps {
  bookDetails: BookDetails | null
  chapters: Chapter[]
}

export function BookStats({ bookDetails, chapters }: BookStatsProps) {
  const totalWords = chapters.reduce((sum, chapter) => {
    return sum + (chapter.metadata.word_count || 0)
  }, 0)

  const audioChapters = chapters.filter(chapter => chapter.metadata.enable_audio).length

  const stats = [
    {
      icon: BookOpen,
      label: 'Chapters',
      value: chapters.length.toString(),
      color: 'text-blue-500'
    },
    {
      icon: Clock,
      label: 'Reading Time',
      value: bookDetails?.metadata?.reading_time || '2-3 hours',
      color: 'text-green-500'
    },
    {
      icon: BookOpen,
      label: 'Words',
      value: totalWords.toLocaleString(),
      color: 'text-purple-500'
    },
    {
      icon: Volume2,
      label: 'Audio Chapters',
      value: audioChapters.toString(),
      color: 'text-orange-500'
    },
    {
      icon: Users,
      label: 'Readers',
      value: '1,247',
      color: 'text-pink-500'
    },
    {
      icon: Star,
      label: 'Rating',
      value: '4.8/5',
      color: 'text-yellow-500'
    }
  ]

  return (
    <section className="mb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="p-6 bg-card border rounded-2xl text-center hover:shadow-lg transition-all duration-300 card-hover glass-effect"
          >
            <div className="flex justify-center mb-3">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
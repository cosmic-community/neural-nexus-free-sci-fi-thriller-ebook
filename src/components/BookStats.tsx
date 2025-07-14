import { BookDetails, Chapter } from '@/lib/cosmic'
import { BookOpen, Clock, Volume2, Users, Star, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface BookStatsProps {
  bookDetails: BookDetails | null
  chapters: Chapter[]
  className?: string
}

export function BookStats({ bookDetails, chapters, className }: BookStatsProps) {
  const totalWords = chapters.reduce((sum, chapter) => 
    sum + (chapter.metadata?.word_count || 0), 0
  )
  
  const totalReadingTime = chapters.reduce((total, chapter) => {
    const time = chapter.metadata?.reading_time || '0 min'
    const minutes = parseInt(time.split(' ')[0]) || 0
    return total + minutes
  }, 0)

  const audioChapters = chapters.filter(chapter => chapter.metadata?.enable_audio).length
  
  const stats = [
    {
      icon: BookOpen,
      label: 'Chapters',
      value: chapters.length.toString(),
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: Clock,
      label: 'Reading Time',
      value: `${Math.round(totalReadingTime)} min`,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: Volume2,
      label: 'Audio Chapters',
      value: `${audioChapters}/${chapters.length}`,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: Users,
      label: 'Words',
      value: totalWords.toLocaleString(),
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    }
  ]

  return (
    <section className={className}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center mx-auto mb-3`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Book Info */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Book Information</h3>
              <div className="space-y-3">
                {bookDetails?.metadata?.genre && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Genre</span>
                    <Badge variant="secondary">{bookDetails.metadata.genre}</Badge>
                  </div>
                )}
                {bookDetails?.metadata?.author && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Author</span>
                    <span className="font-medium">{bookDetails.metadata.author}</span>
                  </div>
                )}
                {bookDetails?.metadata?.publication_date && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Published</span>
                    <span className="font-medium">
                      {new Date(bookDetails.metadata.publication_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Features</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Free to Read</span>
                  <Badge variant="success">✓ Yes</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Audio Support</span>
                  <Badge variant={bookDetails?.metadata?.enable_tts ? "success" : "secondary"}>
                    {bookDetails?.metadata?.enable_tts ? "✓ Available" : "Coming Soon"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Mobile Friendly</span>
                  <Badge variant="success">✓ Yes</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Progress Tracking</span>
                  <Badge variant="success">✓ Yes</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
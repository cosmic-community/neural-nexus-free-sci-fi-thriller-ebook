import { BookDetails, SiteSettings } from '@/lib/cosmic'
import { ThemeToggle } from './ThemeToggle'
import { DonateButton } from './DonateButton'
import { SocialShare } from './SocialShare'
import { Download, Star, Users, Clock, BookOpen, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

interface HeroProps {
  bookDetails: BookDetails | null
  siteSettings: SiteSettings | null
}

export function Hero({ bookDetails, siteSettings }: HeroProps) {
  const primaryColor = siteSettings?.metadata?.primary_color || '#00ffff'
  
  return (
    <section className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">N</span>
            </div>
            <span className="font-semibold text-lg">Neural Nexus</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-sm hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/support" className="text-sm hover:text-primary transition-colors">
              Support
            </Link>
            <DonateButton bookDetails={bookDetails} />
            {siteSettings?.metadata?.enable_dark_mode && <ThemeToggle />}
          </div>
        </nav>

        {/* Main Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Book Cover */}
          <div className="relative lg:order-1 order-2">
            <div className="relative group max-w-md mx-auto lg:mx-0">
              {/* Book Cover with 3D Effect */}
              <div className="relative">
                {/* Book Shadow */}
                <div className="absolute inset-0 bg-black/20 rounded-2xl blur-xl transform rotate-2 scale-105"></div>
                
                {/* Book Cover */}
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-1 shadow-2xl">
                  <img 
                    src="/api/placeholder/600/800"
                    alt={bookDetails?.metadata?.title || 'Neural Nexus'}
                    className="w-full h-auto rounded-xl shadow-inner"
                  />
                </div>
                
                {/* Book Spine Effect */}
                <div className="absolute -right-2 top-2 bottom-2 w-6 bg-gradient-to-r from-slate-700 to-slate-800 rounded-r-lg shadow-lg"></div>
                
                {/* Free Badge */}
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg transform rotate-12">
                  <span className="font-bold text-sm">FREE</span>
                </div>
              </div>
              
              {/* Pricing Options */}
              <div className="mt-8 space-y-3">
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold">Digital Ebook</div>
                        <div className="text-sm text-muted-foreground">Read online or download</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">FREE</div>
                      <div className="text-xs text-muted-foreground">PDF, EPUB</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold">Print on Demand</div>
                        <div className="text-sm text-muted-foreground">Physical paperback copy</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">$10</div>
                      <div className="text-xs text-muted-foreground">Paperback</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8 lg:order-2 order-1">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-medium">
                <Star className="w-4 h-4" />
                <span>Free Sci-Fi Thriller</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="gradient-text">
                  {bookDetails?.metadata?.title || 'Neural Nexus'}
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground">
                {bookDetails?.metadata?.subtitle || 'A Sci-Fi Thriller'}
              </p>
              
              <p className="text-lg text-muted-foreground">
                by <span className="font-semibold text-foreground">
                  {bookDetails?.metadata?.author || 'Your Name'}
                </span>
              </p>
            </div>

            {/* Book Description */}
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <div dangerouslySetInnerHTML={{ 
                __html: bookDetails?.metadata?.description || '<p>In the year 2087, neural interfaces have revolutionized human consciousness. Dr. Maya Chen, a brilliant neuroscientist, discovers that her groundbreaking brain-computer interface technology has been secretly weaponized by the powerful Nexus Corporation.</p><p>When she attempts to expose the truth, Maya becomes the target of digital assassins who can hack human minds directly. Racing against time through a world where the line between human consciousness and artificial intelligence has been dangerously blurred, she must navigate corporate espionage, mind-hacking, and her own augmented reality to survive.</p><p>A fast-paced thriller that explores the dark side of technological advancement and the price of human enhancement.</p>' 
              }} />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="#chapters"
                className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-300 btn-hover font-semibold"
              >
                <BookOpen className="w-5 h-5" />
                Start Reading Free
              </Link>
              
              <button className="flex items-center gap-2 px-8 py-4 border border-primary text-primary rounded-xl hover:bg-primary/10 transition-all duration-300 btn-hover font-semibold">
                <Download className="w-5 h-5" />
                Download PDF
              </button>
              
              {bookDetails?.metadata?.enable_tts && (
                <button className="flex items-center gap-2 px-8 py-4 border border-muted-foreground/30 text-muted-foreground rounded-xl hover:bg-muted/20 transition-all duration-300 btn-hover font-semibold">
                  🎧 Listen Now
                </button>
              )}
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>1,247 readers</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{bookDetails?.metadata?.reading_time || '2-3 hours'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>4.8/5 rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Share */}
        <SocialShare 
          title={bookDetails?.metadata?.title || 'Neural Nexus'}
          description={bookDetails?.metadata?.description || 'A gripping sci-fi thriller about neural interfaces, corporate espionage, and digital consciousness.'}
        />
      </div>
    </section>
  )
}
import { getBookDetails, getSiteSettings } from '@/lib/cosmic'
import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'
import { ArrowLeft, Heart, Coffee, CreditCard, Gift, Star, Users } from 'lucide-react'

export default async function SupportPage() {
  const [bookDetails, siteSettings] = await Promise.all([
    getBookDetails(),
    getSiteSettings()
  ])

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-12">
          <Link href="/" className="flex items-center gap-2 hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Book</span>
          </Link>
          
          <div className="flex items-center gap-4">
            {siteSettings?.metadata?.enable_dark_mode && <ThemeToggle />}
          </div>
        </nav>

        {/* Main Content */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Support the Author</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Neural Nexus is free to read, but your support helps create more amazing sci-fi stories
          </p>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {bookDetails?.metadata?.donation_url && (
            <div className="p-8 bg-card border rounded-3xl text-center hover:shadow-lg transition-all duration-300 card-hover">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coffee className="w-8 h-8 text-orange-600" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Buy Me a Coffee</h3>
              <p className="text-muted-foreground mb-6">
                Support with a quick $5 donation. Perfect for showing appreciation for the story.
              </p>
              
              <a
                href={bookDetails.metadata.donation_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:from-orange-600 hover:to-amber-600 transition-all duration-300 btn-hover font-semibold"
              >
                <Coffee className="w-5 h-5" />
                Buy Coffee
              </a>
            </div>
          )}
          
          {bookDetails?.metadata?.stripe_url && (
            <div className="p-8 bg-card border rounded-3xl text-center hover:shadow-lg transition-all duration-300 card-hover">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Custom Donation</h3>
              <p className="text-muted-foreground mb-6">
                Choose your own amount to support future projects. Every contribution helps.
              </p>
              
              <a
                href={bookDetails.metadata.stripe_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 btn-hover font-semibold"
              >
                <CreditCard className="w-5 h-5" />
                Donate Now
              </a>
            </div>
          )}
        </div>

        {/* Why Support */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="gradient-text">Why Support?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">More Stories</h3>
              <p className="text-muted-foreground">
                Your support enables the creation of more free sci-fi stories for the community
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Content</h3>
              <p className="text-muted-foreground">
                Support helps maintain high-quality writing and interactive reading experiences
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community</h3>
              <p className="text-muted-foreground">
                Join a community of readers who support independent sci-fi authors
              </p>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <div className="p-8 bg-card border rounded-3xl mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Support Impact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1,247</div>
              <div className="text-muted-foreground">Readers reached</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">$847</div>
              <div className="text-muted-foreground">Raised for future projects</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
              <div className="text-muted-foreground">Average rating</div>
            </div>
          </div>
        </div>

        {/* Other Ways to Support */}
        <section className="text-center">
          <h3 className="text-2xl font-bold mb-6">Other Ways to Support</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-muted/50 rounded-xl">
              <h4 className="font-semibold mb-2">Share the Story</h4>
              <p className="text-sm text-muted-foreground">
                Tell friends about Neural Nexus on social media
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <h4 className="font-semibold mb-2">Leave Feedback</h4>
              <p className="text-sm text-muted-foreground">
                Your thoughts help improve future stories
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <h4 className="font-semibold mb-2">Subscribe</h4>
              <p className="text-sm text-muted-foreground">
                Get notified about new releases and updates
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
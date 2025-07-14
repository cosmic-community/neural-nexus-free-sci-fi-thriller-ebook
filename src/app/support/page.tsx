import { Metadata } from 'next'
import { getBookDetails, getSiteSettings } from '@/lib/cosmic'
import { DonateButton } from '@/components/DonateButton'
import { Footer } from '@/components/Footer'
import { Heart, Coffee, CreditCard, Gift, BookOpen, Star } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  const bookDetails = await getBookDetails()
  
  return {
    title: `Support the Author - ${siteSettings?.metadata?.site_title || 'Neural Nexus'}`,
    description: `Support the author of ${bookDetails?.metadata?.title || 'Neural Nexus'} and help create more amazing sci-fi stories.`,
  }
}

export default async function SupportPage() {
  const [bookDetails, siteSettings] = await Promise.all([
    getBookDetails(),
    getSiteSettings()
  ])

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Heart className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Support the Author</span>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Help Create More Stories</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your support helps me continue creating immersive sci-fi stories like {bookDetails?.metadata?.title || 'Neural Nexus'}
          </p>
        </div>

        {/* Book Info */}
        <div className="bg-card rounded-2xl p-8 mb-12 glass-effect">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">About {bookDetails?.metadata?.title || 'Neural Nexus'}</h2>
              <div className="prose prose-lg text-muted-foreground mb-6">
                <div dangerouslySetInnerHTML={{ 
                  __html: bookDetails?.metadata?.description || 
                  '<p>A thrilling sci-fi story about neural interfaces and digital consciousness.</p>' 
                }} />
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>12 chapters</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{bookDetails?.metadata?.reading_time || '90+ min'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Free to read</span>
                </div>
              </div>
            </div>
            
            {bookDetails?.metadata?.cover_image && (
              <div className="flex justify-center">
                <img
                  src={`${bookDetails.metadata.cover_image.imgix_url}?w=300&h=400&fit=crop&auto=format,compress`}
                  alt={bookDetails.metadata.title}
                  className="w-48 h-auto rounded-xl shadow-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Support Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Buy Me a Coffee */}
          {bookDetails?.metadata?.donation_url && (
            <div className="bg-card rounded-2xl p-8 glass-effect border border-orange-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Buy Me a Coffee</h3>
                <p className="text-muted-foreground">Support with a quick $5 donation</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Star className="w-4 h-4 text-orange-500" />
                  <span>Quick and easy</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Star className="w-4 h-4 text-orange-500" />
                  <span>No account required</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Star className="w-4 h-4 text-orange-500" />
                  <span>Secure payment</span>
                </div>
              </div>
              
              <a
                href={bookDetails.metadata.donation_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full mt-6"
              >
                <Coffee className="w-5 h-5 mr-2" />
                Buy Me a Coffee
              </a>
            </div>
          )}

          {/* Custom Donation */}
          {bookDetails?.metadata?.stripe_url && (
            <div className="bg-card rounded-2xl p-8 glass-effect border border-blue-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Custom Donation</h3>
                <p className="text-muted-foreground">Choose your own amount</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Star className="w-4 h-4 text-blue-500" />
                  <span>Any amount welcome</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Star className="w-4 h-4 text-blue-500" />
                  <span>Secure Stripe payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Star className="w-4 h-4 text-blue-500" />
                  <span>Instant confirmation</span>
                </div>
              </div>
              
              <a
                href={bookDetails.metadata.stripe_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline w-full mt-6"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Custom Donation
              </a>
            </div>
          )}
        </div>

        {/* Why Support */}
        <div className="bg-card rounded-2xl p-8 mb-12 glass-effect">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Your Support Matters</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">More Stories</h4>
              <p className="text-sm text-muted-foreground">
                Fund the creation of new sci-fi adventures and expanded universes
              </p>
            </div>
            
            <div className="text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Author Support</h4>
              <p className="text-sm text-muted-foreground">
                Help cover writing time, research, and creative development
              </p>
            </div>
            
            <div className="text-center">
              <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Free Content</h4>
              <p className="text-sm text-muted-foreground">
                Keep stories free for everyone while supporting the author
              </p>
            </div>
          </div>
        </div>

        {/* Thank You */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Thank You for Reading!</h3>
          <p className="text-muted-foreground mb-6">
            Whether you support financially or just by reading and sharing, every bit helps
          </p>
          
          <div className="flex justify-center">
            <DonateButton bookDetails={bookDetails} />
          </div>
        </div>
      </div>
      
      <Footer 
        bookDetails={bookDetails}
        siteSettings={siteSettings}
      />
    </div>
  )
}
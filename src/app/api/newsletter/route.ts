import { NextRequest, NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email already exists
    try {
      const existingSubscriber = await cosmic.objects.findOne({
        type: 'newsletter-subscribers',
        'metadata.email': email
      })
      
      if (existingSubscriber.object) {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 409 }
        )
      }
    } catch (error) {
      // If 404, email doesn't exist - continue with subscription
      if (error.status !== 404) {
        throw error
      }
    }

    // Create new subscriber
    const currentDate = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    
    const newSubscriber = await cosmic.objects.insertOne({
      title: email,
      type: 'newsletter-subscribers',
      metadata: {
        email: email,
        subscription_date: currentDate,
        active: true,
        source: 'ebook',
        preferences: ['New Books', 'Chapter Updates'],
        notes: 'Subscribed from Neural Nexus ebook website'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      id: newSubscriber.object.id
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    )
  }
}
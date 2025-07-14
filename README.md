# Neural Nexus - Free Sci-Fi Thriller Ebook

![Neural Nexus Preview](https://imgix.cosmicjs.com/fa6dd1f0-a455-11ed-81f2-f50e185dd248-WJL4c7-eTlI.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A cutting-edge interactive ebook reading platform showcasing a gripping sci-fi thriller about neural interfaces, corporate espionage, and digital consciousness. Read or listen to the complete story of Dr. Maya Chen's fight against mind-control technology.

## Features

- **Complete Interactive Ebook** - Full sci-fi thriller with 12 chapters (~100 pages)
- **Text-to-Speech Integration** - Browser-based audio narration with controls
- **Chapter Navigation** - Intuitive navigation with progress tracking
- **Donation Integration** - Multiple payment options for reader support
- **Reading Progress** - Visual progress indicators and time estimates
- **Responsive Design** - Optimized for desktop and mobile reading
- **Dark Mode** - Cyberpunk aesthetic with neural interface styling
- **CMS Integration** - Easy content management through Cosmic

## Clone this Bucket

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket to get started instantly:

[![Clone this Bucket](https://img.shields.io/badge/Clone%20this%20Bucket-4F46E5?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=my-book-production)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a full single-page website that features a complete original sci-fi thriller ebook, approximately 100 pages in length. The story should be engaging, fast-paced, and plot-driven, with high-stakes tension and futuristic worldbuilding.

Build the following:
	•	A visually rich homepage that introduces the ebook, its title, and author (me)
	•	The full ebook content broken into easy-to-read chapters with navigation
	•	An integrated text-to-speech feature so users can listen to the book read aloud
	•	A simple donation system using Stripe or a 'Buy Me a Coffee' button
	•	A CMS-powered content model to manage the book's chapters, metadata, and settings
	•	Clean, modern design with dark mode and readable typography
	•	Responsive layout for mobile and desktop
	•	Automatically deploy to Vercel and connect to GitHub
	•	Include the ability to edit or replace the text of any chapter using the Cosmic CMS

Use AI to write the ebook and populate the site with the full story, audio functionality, and donation link."

### Code Generation Prompt

> "Create a full single-page website that features a complete original sci-fi thriller ebook, approximately 100 pages in length. The story should be engaging, fast-paced, and plot-driven, with high-stakes tension and futuristic worldbuilding.

Build the following:
	•	A visually rich homepage that introduces the ebook, its title, and author (me)
	•	The full ebook content broken into easy-to-read chapters with navigation
	•	An integrated text-to-speech feature so users can listen to the book read aloud
	•	A simple donation system using Stripe or a 'Buy Me a Coffee' button
	•	A CMS-powered content model to manage the book's chapters, metadata, and settings
	•	Clean, modern design with dark mode and readable typography
	•	Responsive layout for mobile and desktop
	•	Automatically deploy to Vercel and connect to GitHub
	•	Include the ability to edit or replace the text of any chapter using the Cosmic CMS

Use AI to write the ebook and populate the site with the full story, audio functionality, and donation link."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless CMS for content management
- **Web Speech API** - Text-to-speech functionality
- **Vercel** - Deployment platform

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your bucket configured

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd neural-nexus-ebook
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching All Chapters
```typescript
import { cosmic } from '@/lib/cosmic'

const chapters = await cosmic.objects
  .find({ type: 'chapters' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
  .sort('metadata.chapter_number')
```

### Getting Book Details
```typescript
const bookDetails = await cosmic.objects
  .find({ type: 'book-details' })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Fetching Site Settings
```typescript
const siteSettings = await cosmic.objects
  .find({ type: 'site-settings' })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three main content types:

### Book Details
- **Title** - Main book title
- **Subtitle** - Book subtitle
- **Author** - Author name
- **Description** - Book synopsis
- **Cover Image** - Book cover
- **Genre** - Book genre
- **Publication Date** - Publication date
- **Reading Time** - Estimated reading time
- **Donation URLs** - Buy Me a Coffee and Stripe links
- **Text-to-Speech Settings** - TTS configuration

### Chapters
- **Chapter Number** - For ordering
- **Chapter Title** - Chapter title
- **Content** - Full chapter text (HTML)
- **Word Count** - Word count
- **Reading Time** - Estimated reading time
- **Audio Settings** - TTS configuration
- **Summary** - Chapter summary

### Site Settings
- **Site Title** - Main site title
- **Site Description** - SEO description
- **Theme Settings** - Dark/light mode preferences
- **Primary Color** - Brand color
- **Font Family** - Typography settings
- **Feature Toggles** - Enable/disable features

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect your repository to Netlify
2. Add environment variables in Netlify dashboard
3. Set build command: `bun run build`
4. Set publish directory: `.next`

### Environment Variables
Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`
<!-- README_END -->
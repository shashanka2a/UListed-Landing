# UListed - Student Marketplace

A production-ready Next.js application for UListed - a marketplace for students to buy, sell, and swap items within their university.

## Features

### Landing Page
- ✅ Marketing landing page with countdown timer
- ✅ Email signup form
- ✅ Feature highlights
- ✅ SEO optimized with metadata

### Marketplace App
- ✅ **Login** - .edu email authentication
- ✅ **Home Feed** - Browse listings in a responsive grid
- ✅ **Browse Categories** - Search and filter by category
- ✅ **Sell Form** - Create new listings with image upload
- ✅ **Chat Messages** - Real-time messaging interface
- ✅ **Profile Dashboard** - User profile with stats and settings
- ✅ **Bottom Navigation** - Mobile-first tab navigation
- ✅ Smooth page transitions and animations
- ✅ Mobile-first responsive design

### Technical
- ✅ Next.js 15 with App Router
- ✅ TypeScript
- ✅ Tailwind CSS v4
- ✅ Motion animations
- ✅ Production-ready build

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Routes:**
- `/` - Landing page
- `/marketplace/login` - Login page
- `/marketplace/feed` - Home feed (listings)
- `/marketplace/categories` - Browse categories
- `/marketplace/sell` - Create listing
- `/marketplace/chat` - Messages
- `/marketplace/profile` - User profile

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                           # Next.js App Router
│   ├── layout.tsx                # Root layout with metadata
│   ├── page.tsx                   # Landing page
│   ├── globals.css                # Global styles
│   ├── marketplace/               # Marketplace app
│   │   ├── layout.tsx             # Marketplace layout with bottom nav
│   │   ├── login/                 # Login page
│   │   ├── feed/                  # Home feed (listings grid)
│   │   ├── categories/            # Browse categories
│   │   ├── sell/                  # Create listing form
│   │   ├── chat/                  # Messages list & detail
│   │   ├── profile/                # User profile dashboard
│   │   └── listing/[id]/          # Listing detail page
│   ├── icon.png                   # App icon
│   └── apple-icon.png             # Apple touch icon
├── src/
│   ├── components/
│   │   ├── ui/                    # UI component library (Radix UI)
│   │   ├── BottomNav.tsx          # Bottom tab navigation
│   │   ├── CountdownTimer.tsx     # Landing page timer
│   │   └── ...
│   ├── assets/                     # Static assets
│   └── styles/                     # Additional styles
└── public/                         # Public assets
```

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React

## License

© 2025 UListed Inc. All rights reserved.

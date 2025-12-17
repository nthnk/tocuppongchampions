# 🏆 Toronto Cup Pong Championship - Landing Page

A premium, mobile-responsive waitlist landing page for the Toronto Cup Pong Championship tournament series.

## ✨ Features

- **Modern Design**: Sleek, professional design that communicates prestige and competition
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Google Sheets Integration**: Form submissions sent directly to Google Sheets
- **Smooth Animations**: Engaging interactions and scroll effects
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Ready for Payments**: Built with Stripe integration in mind for future payment processing

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Visit [http://localhost:3002](http://localhost:3002)

## 📋 Complete Setup

For detailed setup instructions including Google Sheets integration and deployment, see **[SETUP.md](./SETUP.md)**.

## 🎨 Page Sections

1. **Hero** - Bold headline with event details and CTA button
2. **About** - Tournament description and key features
3. **Format** - Bracket structure and competition flow
4. **Waitlist Form** - Registration with Google Sheets integration
5. **FAQ** - Common questions and answers
6. **Footer** - Social media and site links

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: Next.js API Routes
- **Data Storage**: Google Sheets via Apps Script
- **Deployment**: Vercel / Netlify ready

## 📁 Project Structure

```
pong-landing/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts          # Form submission API
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Main page component
│   └── globals.css                # Global styles
├── components/
│   ├── Hero.tsx                   # Hero section
│   ├── About.tsx                  # About section
│   ├── TournamentFormat.tsx       # Format section
│   ├── WaitlistForm.tsx           # Registration form
│   ├── FAQ.tsx                    # FAQ section
│   └── Footer.tsx                 # Footer
├── .env.local                     # Environment variables (not in git)
├── .env.example                   # Environment variables template
├── SETUP.md                       # Complete setup guide
└── README.md                      # This file
```

## 🌐 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Netlify

```bash
npm run build
netlify deploy --prod
```

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## 🔧 Customization

### Update Event Details

Edit components to customize:
- Event dates and location
- Pricing and team counts
- FAQ questions
- Social media links

### Styling

All styling uses Tailwind CSS classes. The color scheme uses:
- Primary: Blue (`blue-500`, `blue-600`)
- Secondary: Purple (`purple-500`, `purple-600`)
- Accent: Pink (`pink-500`, `pink-600`)

## 📝 Environment Variables

Required environment variables (see `.env.example`):

```env
GOOGLE_SHEETS_URL=your_google_apps_script_url
```

## 🤝 Support

For detailed setup help, troubleshooting, and customization guides, see [SETUP.md](./SETUP.md).

## 📄 License

Built for Toronto Cup Pong Championship © 2026

---

**Ready to launch your tournament?** Follow the [SETUP.md](./SETUP.md) guide to complete the Google Sheets integration and deploy!

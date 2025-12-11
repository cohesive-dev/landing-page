# Cohesive AI - Landing Page

A modern, responsive landing page for Cohesive AI, an AI-native CRM designed specifically for skilled trade services.

## Features

- **Modern Design**: Clean, professional landing page built with Next.js and Tailwind CSS
- **Responsive Layout**: Fully responsive design that works on all devices
- **AI-Native CRM Focus**: Specifically designed for contractors, plumbers, electricians, and skilled trade professionals
- **Performance Optimized**: Built with Next.js for optimal loading speeds and SEO

## Key Sections

- **Hero Section**: Compelling headline and call-to-action
- **Features Section**: Six key features highlighting AI-powered capabilities
- **Call-to-Action**: Multiple conversion points throughout the page
- **Footer**: Complete navigation and company information

## Technologies Used

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: SVG icons for features
- **Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites

- Node.js 20.9.0 or later
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main landing page
│   └── globals.css     # Global styles
└── public/             # Static assets
```

## Customization

The landing page is designed to be easily customizable:

- **Colors**: Modify the color scheme in Tailwind classes
- **Content**: Update text content in `src/app/page.tsx`
- **Features**: Add or modify feature cards in the features section
- **Branding**: Update company information and metadata

## Deployment

This project is ready to be deployed on platforms like:

- Vercel (recommended)
- Netlify
- AWS Amplify
- Any platform supporting Next.js

For Vercel deployment:

```bash
npm run build
```

## License

Private project for Cohesive AI.

## Contact

For questions or support regarding this landing page, please contact the development team.

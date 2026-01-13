# Fitness Tracker - Next.js Migration

This project has been successfully migrated from Vite to Next.js 14.

## Migration Summary

### What Changed

- **Framework**: Vite → Next.js 14
- **Build Tool**: Vite build → Next.js build
- **Directory Structure**: 
  - Old: `src/` directory
  - New: `app/` directory (App Router)
- **API Routes**: 
  - Old: `api/` with Vercel handler format
  - New: `app/api/` with Next.js App Router format
- **Utilities & Components**: Moved to root-level `components/`, `utils/`, `lib/`, and `types/`

### File Changes

1. **Removed/Deprecated**:
   - `vite.config.ts` (replaced with `next.config.js`)
   - `src/main.tsx` (not needed with Next.js)
   - `src/index.css` (moved to `app/globals.css`)
   - `tsconfig.node.json` (not needed for Next.js)
   - `@vitejs/plugin-react` dependency
   - `vite` dependency

2. **Added**:
   - `next.config.js` - Next.js configuration
   - `app/layout.tsx` - Root layout with metadata
   - `app/page.tsx` - Home page
   - `app/api/records/route.ts` - API routes using Next.js format
   - `app/globals.css` - Global styles

3. **Updated**:
   - `package.json` - Replaced Vite dependencies with Next.js
   - `tsconfig.json` - Configured for Next.js
   - All components marked with `'use client'` for client-side functionality
   - Import paths updated to use `@/` path alias

### Component Updates

All components have been updated with:
- `'use client'` directive for client-side interactivity
- Path aliases using `@/` (e.g., `@/components`, `@/utils`, `@/types`)
- No other functional changes

### API Routes Migration

The old Vercel-style API handlers have been converted to Next.js Route Handlers:

**Old (Vercel)**:
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ...
}
```

**New (Next.js)**:
```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // ...
  return NextResponse.json(data)
}
```

## Getting Started

### Prerequisites
- Node.js 18+ (or 16 with experimental support)
- MongoDB URI in `.env.local`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local and add your MongoDB URI
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

Build for production:
```bash
npm run build
npm start
```

## Directory Structure

```
FitnessApp/
├── app/                    # Next.js App Router
│   ├── api/
│   │   └── records/        # API routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # Reusable React components
├── lib/                    # Server utilities (MongoDB client)
├── utils/                  # Utilities (calculations, storage)
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies
```

## Key Next.js Features Used

1. **App Router**: Modern file-based routing in the `app/` directory
2. **API Routes**: Server-side API handlers in `app/api/`
3. **Client Components**: Components using `'use client'` for interactivity
4. **TypeScript**: Full TypeScript support
5. **Tailwind CSS**: Utility-first CSS framework
6. **Path Aliases**: `@/` prefix for clean imports

## Notes for Future Development

- Use `'use client'` at the top of components that need interactivity
- Server-side logic can be placed in `app/api/` routes
- Keep utility functions in `utils/` directory
- Database/external service connections in `lib/`
- Import paths use `@/` alias configured in `tsconfig.json`

## Vercel Deployment

The app is ready to deploy on Vercel. The Next.js framework integrates seamlessly with Vercel's infrastructure.

For deployment:
1. Push code to a Git repository
2. Connect to Vercel
3. Add `MONGODB_URI` to environment variables
4. Deploy!

## Support

For Next.js documentation, visit: https://nextjs.org/docs

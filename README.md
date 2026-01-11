# QuickBid Pro

Professional estimating software for trade contractors (HVAC, plumbing, electrical, roofing).

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

## Deployment to Vercel

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## Database Setup

Run the SQL migration in your Supabase dashboard:
`supabase/migrations/20240101000000_initial_schema.sql`

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for webhooks)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `STRIPE_PRICE_STARTER` - Stripe price ID for Starter plan
- `STRIPE_PRICE_PRO` - Stripe price ID for Pro plan

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + Database)
- Stripe (Payments)
- @react-pdf/renderer (PDF generation)

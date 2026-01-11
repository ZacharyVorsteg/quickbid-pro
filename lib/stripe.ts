import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const getStripeSubscriptionPrices = () => ({
  starter: process.env.STRIPE_PRICE_STARTER!,
  pro: process.env.STRIPE_PRICE_PRO!,
});

export const PLANS = {
  starter: {
    name: 'Starter',
    price: 79,
    features: [
      'Up to 50 estimates/month',
      'Basic material database',
      'PDF generation',
      'Email support',
    ],
  },
  pro: {
    name: 'Pro',
    price: 149,
    features: [
      'Unlimited estimates',
      'Full material database',
      'PDF generation',
      'Custom branding',
      'Priority support',
      'Client portal',
      'Analytics dashboard',
    ],
  },
} as const;

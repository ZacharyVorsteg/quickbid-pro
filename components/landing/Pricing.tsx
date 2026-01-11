'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui';

const plans = [
  {
    name: 'Starter',
    price: 79,
    description: 'Perfect for solo contractors getting started with digital estimates.',
    features: [
      'Up to 50 estimates/month',
      'Basic material database',
      'PDF generation',
      'Email support',
      'Mobile-friendly',
      'Client management',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Pro',
    price: 149,
    description: 'For growing businesses that need more power and customization.',
    features: [
      'Unlimited estimates',
      'Full material database (200+ items)',
      'PDF generation with custom branding',
      'Priority phone & email support',
      'Client portal',
      'Analytics dashboard',
      'Team members (up to 3)',
      'API access',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            No hidden fees. No long-term contracts. Start with a 14-day free
            trial.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl ${
                plan.popular
                  ? 'ring-2 ring-primary-600 shadow-xl'
                  : 'border border-gray-200 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block bg-primary-600 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500">/month</span>
                </div>

                <Link href="/signup">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full mb-8"
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Have questions?{' '}
            <a href="#faq" className="text-primary-600 font-medium hover:underline">
              Check out our FAQ
            </a>{' '}
            or{' '}
            <a href="mailto:support@quickbidpro.com" className="text-primary-600 font-medium hover:underline">
              contact us
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

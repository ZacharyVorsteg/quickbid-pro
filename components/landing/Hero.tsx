'use client';

import Link from 'next/link';
import { ArrowRight, Play, CheckCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-20 pb-32">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNTYzZWIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="lg:col-span-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/10 border border-primary-500/20 rounded-full mb-8">
              <Zap className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-primary-300">
                Trusted by 2,000+ contractors
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Stop Losing Money on{' '}
              <span className="gradient-text">Every Estimate</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              67% of contractors still use spreadsheets to estimate jobs. That
              means lost profits, missed details, and hours of wasted time.
              QuickBid Pro changes that.
            </p>

            {/* Benefits list */}
            <ul className="space-y-3 mb-8">
              {[
                'Create professional estimates in under 5 minutes',
                'Pre-loaded material pricing for your trade',
                'Win more jobs with branded PDF proposals',
              ].map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <button className="flex items-center justify-center gap-2 px-6 py-3 text-white font-medium rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-400">
              No credit card required. 14-day free trial.
            </p>
          </div>

          {/* Right content - App preview */}
          <div className="lg:col-span-6 mt-12 lg:mt-0">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/20 to-purple-600/20 blur-3xl rounded-3xl" />

              {/* App screenshot mockup */}
              <div className="relative bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-900 border-b border-gray-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-800 rounded-lg px-4 py-1.5 text-sm text-gray-400 text-center">
                      app.quickbidpro.com
                    </div>
                  </div>
                </div>

                {/* App content preview */}
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        New Estimate
                      </h3>
                      <p className="text-sm text-gray-400">
                        Johnson Residence - HVAC
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-primary-600 text-white text-sm rounded-lg">
                      Draft
                    </div>
                  </div>

                  {/* Line items preview */}
                  <div className="space-y-2">
                    {[
                      { name: 'Condensing Unit 3 Ton', qty: 1, price: '$2,800' },
                      { name: 'Air Handler 3 Ton', qty: 1, price: '$2,200' },
                      { name: 'Copper Tubing 3/4"', qty: 50, price: '$337' },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 sm:p-3 bg-gray-700/50 rounded-lg"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-200 truncate">
                            {item.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
                          <span className="text-xs sm:text-sm text-gray-400">
                            x{item.qty}
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-white">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <span className="text-gray-400">Total (incl. tax)</span>
                    <span className="text-2xl font-bold text-white">
                      $7,234.50
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

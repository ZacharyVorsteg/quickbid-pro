'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    content:
      'QuickBid Pro cut my estimate time by 75%. I used to spend 2 hours on each estimate, now I am done in under 30 minutes. My win rate went up too because I can respond faster.',
    author: 'Mike Rodriguez',
    role: 'HVAC Contractor',
    company: 'Rodriguez Heating & Cooling',
    trade: 'hvac',
    image: null,
  },
  {
    content:
      'The pre-loaded material pricing is a game changer. No more looking up prices or guessing. I just pick the item, enter the quantity, and the estimate is done.',
    author: 'Sarah Chen',
    role: 'Owner',
    company: 'Chen Plumbing Services',
    trade: 'plumbing',
    image: null,
  },
  {
    content:
      'I was skeptical about paying for estimate software, but it paid for itself in the first week. The professional PDFs help me win jobs against bigger companies.',
    author: 'James Wilson',
    role: 'Master Electrician',
    company: 'Wilson Electric',
    trade: 'electrical',
    image: null,
  },
  {
    content:
      'Being able to create estimates on my phone right from the roof is incredible. I close more deals because I can give customers a price before I even leave.',
    author: 'David Thompson',
    role: 'Roofing Contractor',
    company: 'Thompson Roofing',
    trade: 'roofing',
    image: null,
  },
];

const tradeColors: Record<string, string> = {
  hvac: 'border-blue-500',
  plumbing: 'border-emerald-500',
  electrical: 'border-amber-500',
  roofing: 'border-purple-500',
};

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Contractors Nationwide
          </h2>
          <p className="text-xl text-gray-600">
            See what other trade professionals are saying about QuickBid Pro.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { label: 'Active Users', value: '2,000+' },
            { label: 'Estimates Created', value: '150,000+' },
            { label: 'Avg Time Saved', value: '75%' },
            { label: 'Customer Rating', value: '4.9/5' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gray-900">
                {stat.value}
              </p>
              <p className="text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl border-l-4 bg-gray-50 ${tradeColors[testimonial.trade]}`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 text-lg">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                  <span className="text-lg font-semibold text-gray-600">
                    {testimonial.author
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

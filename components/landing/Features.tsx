'use client';

import {
  FileText,
  Clock,
  Database,
  Send,
  BarChart3,
  Shield,
  Smartphone,
  Users,
} from 'lucide-react';

const features = [
  {
    name: 'Professional Estimates',
    description:
      'Create branded PDF estimates that look professional and help you win more jobs.',
    icon: FileText,
    color: 'bg-blue-500',
  },
  {
    name: '5-Minute Estimates',
    description:
      'Go from job site visit to professional estimate in under 5 minutes with our streamlined workflow.',
    icon: Clock,
    color: 'bg-green-500',
  },
  {
    name: 'Pre-Loaded Materials',
    description:
      'Access 200+ common materials for HVAC, plumbing, electrical, and roofing with up-to-date pricing.',
    icon: Database,
    color: 'bg-purple-500',
  },
  {
    name: 'One-Click Sending',
    description:
      'Send estimates via email or share a link. Clients can view and approve online.',
    icon: Send,
    color: 'bg-orange-500',
  },
  {
    name: 'Win Rate Tracking',
    description:
      'See which estimates win and which lose. Understand your true conversion rate.',
    icon: BarChart3,
    color: 'bg-cyan-500',
  },
  {
    name: 'Secure & Reliable',
    description:
      'Your data is encrypted and backed up. Access your estimates from any device.',
    icon: Shield,
    color: 'bg-red-500',
  },
  {
    name: 'Mobile-Friendly',
    description:
      'Create and send estimates from your phone or tablet, right from the job site.',
    icon: Smartphone,
    color: 'bg-amber-500',
  },
  {
    name: 'Client Management',
    description:
      'Keep all your clients organized with contact info, notes, and estimate history.',
    icon: Users,
    color: 'bg-indigo-500',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Estimate Faster
          </h2>
          <p className="text-xl text-gray-600">
            QuickBid Pro gives you the tools to create accurate estimates
            quickly, track your success, and grow your business.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group p-6 rounded-2xl border border-gray-200 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} rounded-xl mb-4`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.name}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

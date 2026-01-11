'use client';

import Link from 'next/link';
import { Plus, Users, Package, FileText, Settings } from 'lucide-react';

const actions = [
  {
    name: 'New Estimate',
    description: 'Create a new estimate for a client',
    href: '/estimates/new',
    icon: Plus,
    iconBg: 'bg-primary-600',
  },
  {
    name: 'Add Client',
    description: 'Add a new client to your list',
    href: '/clients/new',
    icon: Users,
    iconBg: 'bg-green-600',
  },
  {
    name: 'Materials',
    description: 'View and manage your materials database',
    href: '/materials',
    icon: Package,
    iconBg: 'bg-purple-600',
  },
  {
    name: 'All Estimates',
    description: 'View all your estimates',
    href: '/estimates',
    icon: FileText,
    iconBg: 'bg-blue-600',
  },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all group"
          >
            <div className={`${action.iconBg} rounded-lg p-2.5 group-hover:scale-110 transition-transform`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{action.name}</p>
              <p className="text-sm text-gray-500 mt-0.5">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

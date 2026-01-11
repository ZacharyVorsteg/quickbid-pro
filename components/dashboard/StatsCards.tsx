'use client';

import { FileText, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface StatsCardsProps {
  totalEstimates: number;
  winRate: number;
  avgValue: number;
  pendingEstimates: number;
}

export function StatsCards({
  totalEstimates,
  winRate,
  avgValue,
  pendingEstimates,
}: StatsCardsProps) {
  const stats = [
    {
      name: 'Total Estimates',
      value: totalEstimates.toString(),
      change: '+12%',
      changeType: 'positive',
      icon: FileText,
      iconBg: 'bg-blue-500',
    },
    {
      name: 'Win Rate',
      value: `${winRate}%`,
      change: '+4.5%',
      changeType: 'positive',
      icon: TrendingUp,
      iconBg: 'bg-green-500',
    },
    {
      name: 'Avg Estimate Value',
      value: formatCurrency(avgValue),
      change: '+8%',
      changeType: 'positive',
      icon: DollarSign,
      iconBg: 'bg-purple-500',
    },
    {
      name: 'Pending Review',
      value: pendingEstimates.toString(),
      change: 'Awaiting response',
      changeType: 'neutral',
      icon: Clock,
      iconBg: 'bg-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className={`${stat.iconBg} rounded-lg p-3`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
          <p className="mt-4 text-sm font-medium text-gray-500">{stat.name}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {stat.value}
          </p>
          <p
            className={`mt-1 text-sm ${
              stat.changeType === 'positive'
                ? 'text-green-600'
                : stat.changeType === 'negative'
                ? 'text-red-600'
                : 'text-gray-500'
            }`}
          >
            {stat.change}
            {stat.changeType !== 'neutral' && ' from last month'}
          </p>
        </div>
      ))}
    </div>
  );
}

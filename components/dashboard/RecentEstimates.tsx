'use client';

import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import { EstimateWithClient } from '@/lib/database.types';
import { Badge } from '@/components/ui';

interface RecentEstimatesProps {
  estimates: EstimateWithClient[];
}

export function RecentEstimates({ estimates }: RecentEstimatesProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'draft':
        return 'default';
      case 'sent':
        return 'info';
      case 'won':
        return 'success';
      case 'lost':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Estimates</h2>
        <Link
          href="/estimates"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
        >
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {estimates.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <div className="mx-auto flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
            <FileText className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-4">No estimates yet</p>
          <Link
            href="/estimates/new"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Create your first estimate
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {estimates.map((estimate) => (
            <Link
              key={estimate.id}
              href={`/estimates/${estimate.id}`}
              className="block px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {estimate.clients?.name || 'Unknown Client'}
                    </p>
                    <Badge variant={getStatusVariant(estimate.status)}>
                      {estimate.status.charAt(0).toUpperCase() +
                        estimate.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 truncate">
                    {estimate.job_address || 'No address'}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(estimate.total || 0)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {formatDate(estimate.created_at)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

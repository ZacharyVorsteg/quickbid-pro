import { createServerClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { AppLayout } from '@/components/layout';
import { Button, Badge } from '@/components/ui';
import { Plus, Search, Filter, FileText, MoreHorizontal, Copy, Trash2, Send } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { EstimateWithClient } from '@/lib/database.types';

export default async function EstimatesPage() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch estimates with client info
  const { data: estimatesData } = await supabase
    .from('estimates')
    .select('*, clients(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const estimates = estimatesData as EstimateWithClient[] | null;

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
    <AppLayout title="Estimates">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Estimates</h1>
            <p className="text-gray-500">
              {estimates?.length || 0} total estimates
            </p>
          </div>
          <Link href="/estimates/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Estimate
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search estimates..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>

        {/* Estimates list */}
        {estimates && estimates.length > 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {estimates.map((estimate) => (
                  <tr key={estimate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/estimates/${estimate.id}`}
                        className="block"
                      >
                        <p className="text-sm font-medium text-gray-900">
                          {estimate.clients?.name || 'Unknown Client'}
                        </p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {estimate.job_address || 'No address'}
                        </p>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusVariant(estimate.status)}>
                        {estimate.status.charAt(0).toUpperCase() +
                          estimate.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(estimate.total || 0)}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(estimate.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/estimates/${estimate.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          View
                        </Link>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No estimates yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Create your first estimate to start tracking your jobs and winning
              more business.
            </p>
            <Link href="/estimates/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Estimate
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

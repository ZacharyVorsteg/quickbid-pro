import { createServerClient } from '@/lib/supabase-server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { AppLayout } from '@/components/layout';
import { Button, Badge } from '@/components/ui';
import {
  ArrowLeft,
  Download,
  Send,
  Edit,
  Copy,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Package,
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { EstimateWithItems, Profile } from '@/lib/database.types';

export default async function EstimateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch estimate with client and items
  const { data: estimateData, error } = await supabase
    .from('estimates')
    .select('*, clients(*), estimate_items(*)')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  const estimate = estimateData as EstimateWithItems | null;

  if (error || !estimate) {
    notFound();
  }

  // Fetch profile for company info
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const profile = profileData as Profile | null;

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

  const materialItems = estimate.estimate_items?.filter(
    (i: any) => i.type === 'material'
  ) || [];
  const laborItems = estimate.estimate_items?.filter(
    (i: any) => i.type === 'labor'
  ) || [];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back button and actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link
            href="/estimates"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Estimates
          </Link>
          <div className="flex items-center gap-3">
            <Badge variant={getStatusVariant(estimate.status)} className="text-sm">
              {estimate.status.charAt(0).toUpperCase() +
                estimate.status.slice(1)}
            </Badge>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              {estimate.status === 'draft' && (
                <Button size="sm">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
              )}
              {estimate.status === 'sent' && (
                <>
                  <Button variant="outline" size="sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Won
                  </Button>
                  <Button variant="ghost" size="sm">
                    <XCircle className="w-4 h-4 mr-2" />
                    Mark Lost
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Estimate document */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="p-8 bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile?.company_name || 'Your Company'}
                </h1>
                {profile?.address && (
                  <p className="text-gray-600 mt-1">{profile.address}</p>
                )}
                {profile?.phone && (
                  <p className="text-gray-600">{profile.phone}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary-600">ESTIMATE</p>
                <p className="text-gray-500 mt-2">
                  Date: {formatDate(estimate.created_at)}
                </p>
                {estimate.valid_until && (
                  <p className="text-gray-500">
                    Valid Until: {formatDate(estimate.valid_until)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Client info */}
          <div className="p-8 grid md:grid-cols-2 gap-8 border-b border-gray-200">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Bill To
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {estimate.clients?.name}
              </p>
              {estimate.clients?.address && (
                <p className="text-gray-600">{estimate.clients.address}</p>
              )}
              {estimate.clients?.email && (
                <p className="text-gray-600">{estimate.clients.email}</p>
              )}
              {estimate.clients?.phone && (
                <p className="text-gray-600">{estimate.clients.phone}</p>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Job Site Address
              </p>
              <p className="text-gray-900">
                {estimate.job_address ||
                  estimate.clients?.address ||
                  'Same as client address'}
              </p>
            </div>
          </div>

          {/* Line items */}
          <div className="p-8 border-b border-gray-200">
            {/* Materials */}
            {materialItems.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-500" />
                  Materials
                </h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-left text-sm font-medium text-gray-500">
                        Description
                      </th>
                      <th className="pb-3 text-right text-sm font-medium text-gray-500">
                        Qty
                      </th>
                      <th className="pb-3 text-right text-sm font-medium text-gray-500">
                        Unit Price
                      </th>
                      <th className="pb-3 text-right text-sm font-medium text-gray-500">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {materialItems.map((item: any) => (
                      <tr key={item.id}>
                        <td className="py-3 text-gray-900">{item.description}</td>
                        <td className="py-3 text-right text-gray-600">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="py-3 text-right text-gray-600">
                          {formatCurrency(item.unit_price)}
                        </td>
                        <td className="py-3 text-right font-medium text-gray-900">
                          {formatCurrency(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Labor */}
            {laborItems.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  Labor
                </h3>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-left text-sm font-medium text-gray-500">
                        Description
                      </th>
                      <th className="pb-3 text-right text-sm font-medium text-gray-500">
                        Hours
                      </th>
                      <th className="pb-3 text-right text-sm font-medium text-gray-500">
                        Rate
                      </th>
                      <th className="pb-3 text-right text-sm font-medium text-gray-500">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {laborItems.map((item: any) => (
                      <tr key={item.id}>
                        <td className="py-3 text-gray-900">{item.description}</td>
                        <td className="py-3 text-right text-gray-600">
                          {item.quantity}
                        </td>
                        <td className="py-3 text-right text-gray-600">
                          {formatCurrency(item.unit_price)}/hr
                        </td>
                        <td className="py-3 text-right font-medium text-gray-900">
                          {formatCurrency(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="p-8 bg-gray-50">
            <div className="max-w-sm ml-auto space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">
                  {formatCurrency(estimate.subtotal || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="text-gray-900">
                  {formatCurrency(estimate.tax || 0)}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-200">
                <span className="text-gray-900">Total</span>
                <span className="text-primary-600">
                  {formatCurrency(estimate.total || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {estimate.notes && (
            <div className="p-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Notes & Terms
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {estimate.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

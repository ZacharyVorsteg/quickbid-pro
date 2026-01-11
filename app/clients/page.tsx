import { createServerClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { AppLayout } from '@/components/layout';
import { Button } from '@/components/ui';
import { Plus, Search, User, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Client } from '@/lib/database.types';

export default async function ClientsPage() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch clients with estimate counts
  const { data: clientsData } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: true });

  const clients = clientsData as Client[] | null;

  // Get estimate counts per client
  const { data: estimateCounts } = await supabase
    .from('estimates')
    .select('client_id')
    .eq('user_id', user.id);

  const clientEstimateCounts: Record<string, number> = {};
  (estimateCounts as { client_id: string | null }[] | null)?.forEach((e) => {
    if (e.client_id) {
      clientEstimateCounts[e.client_id] =
        (clientEstimateCounts[e.client_id] || 0) + 1;
    }
  });

  return (
    <AppLayout title="Clients">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-500">{clients?.length || 0} total clients</p>
          </div>
          <Link href="/clients/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* Clients grid */}
        {clients && clients.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full flex-shrink-0">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {client.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {clientEstimateCounts[client.id] || 0} estimates
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {client.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{client.email}</span>
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{client.address}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Added {formatDate(client.created_at)}
                  </span>
                  <Link
                    href={`/estimates/new?client=${client.id}`}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    New Estimate
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No clients yet
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Add your first client to start creating estimates for them.
            </p>
            <Link href="/clients/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Client
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

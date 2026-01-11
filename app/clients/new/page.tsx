'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppLayout } from '@/components/layout';
import { Button, Input, Textarea } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { ClientInsert } from '@/lib/database.types';
import { useToast } from '@/contexts/ToastContext';

export default function NewClientPage() {
  const router = useRouter();
  const supabase = createClient();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    setIsLoading(true);
    setError('');

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const clientData: ClientInsert = {
        user_id: user.id,
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone || null,
        address: formData.address || null,
        notes: formData.notes || null,
      };
      // Type assertion needed due to Supabase client generic inference
      const { error } = await supabase.from('clients').insert(clientData as never);

      if (error) throw error;

      toast.success('Client added');
      router.push('/clients');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout title="Add Client">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/clients"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Clients
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">
              Add New Client
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter your client&apos;s information below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <Input
              label="Client Name *"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Smith or ABC Company"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
              />
              <Input
                label="Phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="(555) 123-4567"
              />
            </div>

            <Input
              label="Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="123 Main St, City, State ZIP"
            />

            <Textarea
              label="Notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Any additional notes about this client..."
            />

            <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
              <Link href="/clients">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" isLoading={isLoading} disabled={!formData.name}>
                Add Client
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

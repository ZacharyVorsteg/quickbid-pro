'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { Client, Profile } from '@/lib/database.types';
import { ClientStep } from './ClientStep';
import { LineItemsStep, LineItem } from './LineItemsStep';
import { ReviewStep } from './ReviewStep';
import { addDays, format } from 'date-fns';
import { useToast } from '@/contexts/ToastContext';

interface EstimateWizardProps {
  profile: Profile | null;
}

const steps = [
  { id: 1, name: 'Client' },
  { id: 2, name: 'Line Items' },
  { id: 3, name: 'Review' },
];

export function EstimateWizard({ profile }: EstimateWizardProps) {
  const router = useRouter();
  const supabase = createClient();
  const toast = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [jobAddress, setJobAddress] = useState('');
  const [items, setItems] = useState<LineItem[]>([]);
  const [notes, setNotes] = useState(profile?.payment_terms || 'Net 30');
  const [validUntil, setValidUntil] = useState(
    format(addDays(new Date(), 30), 'yyyy-MM-dd')
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (status: 'draft' | 'sent') => {
    if (!selectedClient) return;

    setIsSaving(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const markup = profile?.default_markup || 20;
      const taxRate = profile?.tax_rate || 8.25;

      const subtotal = items.reduce((sum, i) => sum + i.total, 0);
      const markupAmount = subtotal * (markup / 100);
      const subtotalWithMarkup = subtotal + markupAmount;
      const tax = subtotalWithMarkup * (taxRate / 100);
      const total = subtotalWithMarkup + tax;

      // Create estimate
      const { data: estimate, error: estimateError } = await supabase
        .from('estimates')
        .insert({
          user_id: user.id,
          client_id: selectedClient.id,
          job_address: jobAddress || selectedClient.address,
          status,
          subtotal: subtotalWithMarkup,
          tax,
          total,
          notes,
          valid_until: validUntil,
          sent_at: status === 'sent' ? new Date().toISOString() : null,
        } as any)
        .select()
        .single();

      if (estimateError) throw estimateError;

      // Create line items
      if (estimate && items.length > 0) {
        const { error: itemsError } = await supabase
          .from('estimate_items')
          .insert(
            items.map((item, index) => ({
              estimate_id: (estimate as any).id,
              type: item.type,
              description: item.description,
              quantity: item.quantity,
              unit: item.unit,
              unit_price: item.unit_price,
              total: item.total,
              sort_order: index,
            })) as any
          );

        if (itemsError) throw itemsError;
      }

      toast.success('Estimate saved');
      router.push(`/estimates/${(estimate as any).id}`);
    } catch (error) {
      console.error('Error saving estimate:', error);
      toast.error('Error saving estimate. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress steps */}
      <nav className="mb-8">
        <ol className="flex items-center">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={`flex items-center ${
                index < steps.length - 1 ? 'flex-1' : ''
              }`}
            >
              <div className="flex items-center">
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium ${
                    currentStep > step.id
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : currentStep === step.id
                      ? 'border-primary-600 text-primary-600'
                      : 'border-gray-300 text-gray-500'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </span>
                <span
                  className={`ml-3 text-sm font-medium ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={`h-0.5 ${
                      currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Step content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {currentStep === 1 && (
          <ClientStep
            selectedClient={selectedClient}
            jobAddress={jobAddress}
            onClientSelect={setSelectedClient}
            onJobAddressChange={setJobAddress}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <LineItemsStep
            items={items}
            trade={profile?.trade || null}
            laborRate={profile?.default_labor_rate || 75}
            markup={profile?.default_markup || 20}
            onItemsChange={setItems}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && selectedClient && (
          <ReviewStep
            client={selectedClient}
            jobAddress={jobAddress}
            items={items}
            profile={profile}
            notes={notes}
            validUntil={validUntil}
            onNotesChange={setNotes}
            onValidUntilChange={setValidUntil}
            onBack={() => setCurrentStep(2)}
            onSave={handleSave}
            isSaving={isSaving}
          />
        )}
      </div>
    </div>
  );
}

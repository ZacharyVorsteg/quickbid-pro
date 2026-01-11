'use client';

import { useState } from 'react';
import { FileText, Send, Download, Clock, Package, Check } from 'lucide-react';
import { Button, Textarea, Input } from '@/components/ui';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Client, Profile } from '@/lib/database.types';
import { LineItem } from './LineItemsStep';
import { addDays, format } from 'date-fns';

interface ReviewStepProps {
  client: Client;
  jobAddress: string;
  items: LineItem[];
  profile: Profile | null;
  notes: string;
  validUntil: string;
  onNotesChange: (notes: string) => void;
  onValidUntilChange: (date: string) => void;
  onBack: () => void;
  onSave: (status: 'draft' | 'sent') => void;
  isSaving: boolean;
}

export function ReviewStep({
  client,
  jobAddress,
  items,
  profile,
  notes,
  validUntil,
  onNotesChange,
  onValidUntilChange,
  onBack,
  onSave,
  isSaving,
}: ReviewStepProps) {
  const markup = profile?.default_markup || 20;
  const taxRate = profile?.tax_rate || 8.25;

  const materialItems = items.filter((i) => i.type === 'material');
  const laborItems = items.filter((i) => i.type === 'labor');

  const materialsSubtotal = materialItems.reduce((sum, i) => sum + i.total, 0);
  const laborSubtotal = laborItems.reduce((sum, i) => sum + i.total, 0);
  const subtotal = materialsSubtotal + laborSubtotal;
  const markupAmount = subtotal * (markup / 100);
  const subtotalWithMarkup = subtotal + markupAmount;
  const tax = subtotalWithMarkup * (taxRate / 100);
  const total = subtotalWithMarkup + tax;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Review Estimate
        </h2>
        <p className="text-sm text-gray-500">
          Review and finalize your estimate before sending
        </p>
      </div>

      {/* Estimate preview */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
        {/* Header */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {profile?.company_name || 'Your Company'}
              </h3>
              {profile?.address && (
                <p className="text-sm text-gray-600 mt-1">{profile.address}</p>
              )}
              {profile?.phone && (
                <p className="text-sm text-gray-600">{profile.phone}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary-600">ESTIMATE</p>
              <p className="text-sm text-gray-500 mt-1">
                Date: {format(new Date(), 'MMM d, yyyy')}
              </p>
            </div>
          </div>
        </div>

        {/* Client info */}
        <div className="p-6 grid md:grid-cols-2 gap-6 border-b border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Bill To</p>
            <p className="font-medium text-gray-900">{client.name}</p>
            {client.address && (
              <p className="text-sm text-gray-600">{client.address}</p>
            )}
            {client.email && (
              <p className="text-sm text-gray-600">{client.email}</p>
            )}
            {client.phone && (
              <p className="text-sm text-gray-600">{client.phone}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Job Site Address
            </p>
            <p className="text-gray-900">
              {jobAddress || client.address || 'Same as client address'}
            </p>
          </div>
        </div>

        {/* Line items */}
        <div className="p-6 border-b border-gray-200">
          {/* Materials */}
          {materialItems.length > 0 && (
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-500" />
                Materials
              </h4>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                    <th className="pb-2 font-medium">Description</th>
                    <th className="pb-2 font-medium text-right">Qty</th>
                    <th className="pb-2 font-medium text-right">Unit Price</th>
                    <th className="pb-2 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {materialItems.map((item) => (
                    <tr key={item.id} className="text-sm">
                      <td className="py-2 text-gray-900">{item.description}</td>
                      <td className="py-2 text-right text-gray-600">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="py-2 text-right text-gray-600">
                        {formatCurrency(item.unit_price)}
                      </td>
                      <td className="py-2 text-right font-medium text-gray-900">
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
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                Labor
              </h4>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                    <th className="pb-2 font-medium">Description</th>
                    <th className="pb-2 font-medium text-right">Hours</th>
                    <th className="pb-2 font-medium text-right">Rate</th>
                    <th className="pb-2 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {laborItems.map((item) => (
                    <tr key={item.id} className="text-sm">
                      <td className="py-2 text-gray-900">{item.description}</td>
                      <td className="py-2 text-right text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="py-2 text-right text-gray-600">
                        {formatCurrency(item.unit_price)}/hr
                      </td>
                      <td className="py-2 text-right font-medium text-gray-900">
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
        <div className="p-6 bg-gray-50">
          <div className="max-w-xs ml-auto space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Markup ({markup}%)</span>
              <span className="text-gray-900">{formatCurrency(markupAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax ({taxRate}%)</span>
              <span className="text-gray-900">{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
              <span className="text-gray-900">Total</span>
              <span className="text-primary-600">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional options */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Textarea
            label="Notes & Terms"
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Add any notes, terms, or conditions..."
          />
        </div>
        <div>
          <Input
            label="Valid Until"
            type="date"
            value={validUntil}
            onChange={(e) => onValidUntilChange(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">
            Default: {profile?.payment_terms || 'Net 30'}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4 border-t border-gray-200">
        <Button variant="outline" onClick={onBack}>
          Back to Line Items
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onSave('draft')}
            isLoading={isSaving}
          >
            <FileText className="w-4 h-4 mr-2" />
            Save as Draft
          </Button>
          <Button onClick={() => onSave('sent')} isLoading={isSaving}>
            <Send className="w-4 h-4 mr-2" />
            Save & Send
          </Button>
        </div>
      </div>
    </div>
  );
}

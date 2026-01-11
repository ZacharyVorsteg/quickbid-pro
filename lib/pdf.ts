// PDF Generation utilities for estimates
// Using @react-pdf/renderer for professional PDF output

import { EstimateWithItems, Profile, Client } from './database.types';
import { formatCurrency, formatDate } from './utils';

export interface PDFEstimateData {
  estimate: EstimateWithItems;
  profile: Profile | null;
  client: Client;
}

// This creates the data structure needed for PDF generation
export function preparePDFData(data: PDFEstimateData) {
  const { estimate, profile, client } = data;

  const materialItems = estimate.estimate_items?.filter((i) => i.type === 'material') || [];
  const laborItems = estimate.estimate_items?.filter((i) => i.type === 'labor') || [];

  return {
    company: {
      name: profile?.company_name || 'Your Company',
      address: profile?.address || '',
      phone: profile?.phone || '',
      logo: profile?.company_logo_url || null,
    },
    client: {
      name: client.name,
      address: client.address || '',
      email: client.email || '',
      phone: client.phone || '',
    },
    estimate: {
      date: formatDate(estimate.created_at),
      validUntil: estimate.valid_until ? formatDate(estimate.valid_until) : null,
      jobAddress: estimate.job_address || client.address || '',
      notes: estimate.notes || '',
    },
    materials: materialItems.map((item) => ({
      description: item.description || '',
      quantity: item.quantity || 0,
      unit: item.unit || 'each',
      unitPrice: item.unit_price || 0,
      total: item.total || 0,
    })),
    labor: laborItems.map((item) => ({
      description: item.description || '',
      hours: item.quantity || 0,
      rate: item.unit_price || 0,
      total: item.total || 0,
    })),
    totals: {
      subtotal: estimate.subtotal || 0,
      tax: estimate.tax || 0,
      total: estimate.total || 0,
    },
  };
}

// Generate a unique PDF filename
export function generatePDFFilename(clientName: string, date: string): string {
  const sanitizedName = clientName.replace(/[^a-zA-Z0-9]/g, '_');
  const dateStr = new Date(date).toISOString().split('T')[0];
  return `Estimate_${sanitizedName}_${dateStr}.pdf`;
}

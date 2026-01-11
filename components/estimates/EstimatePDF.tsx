'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { formatCurrency } from '@/lib/utils';

// Register fonts (using system fonts as fallback)
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff2',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hjp-Ek-_EeA.woff2',
      fontWeight: 600,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff2',
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    paddingTop: 40,
    paddingBottom: 60,
    paddingHorizontal: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  companyInfo: {
    maxWidth: '50%',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 4,
  },
  companyDetails: {
    color: '#6b7280',
    fontSize: 9,
  },
  estimateLabel: {
    fontSize: 24,
    fontWeight: 700,
    color: '#2563eb',
    textAlign: 'right',
  },
  estimateDate: {
    color: '#6b7280',
    fontSize: 9,
    textAlign: 'right',
    marginTop: 4,
  },
  clientSection: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  clientBox: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 8,
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  clientName: {
    fontSize: 12,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 4,
  },
  clientDetails: {
    color: '#6b7280',
    fontSize: 9,
    lineHeight: 1.4,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tableHeaderText: {
    fontSize: 8,
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tableCell: {
    fontSize: 9,
    color: '#374151',
  },
  tableCellBold: {
    fontSize: 9,
    fontWeight: 600,
    color: '#111827',
  },
  colDescription: {
    flex: 4,
  },
  colQty: {
    flex: 1,
    textAlign: 'right',
  },
  colPrice: {
    flex: 1.5,
    textAlign: 'right',
  },
  colTotal: {
    flex: 1.5,
    textAlign: 'right',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 10,
    marginTop: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  totalsSection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#e5e7eb',
    alignItems: 'flex-end',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 200,
    marginBottom: 4,
  },
  totalsLabel: {
    flex: 1,
    fontSize: 9,
    color: '#6b7280',
  },
  totalsValue: {
    flex: 1,
    fontSize: 9,
    color: '#111827',
    textAlign: 'right',
  },
  totalsFinal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 200,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalsFinalLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: 700,
    color: '#111827',
  },
  totalsFinalValue: {
    flex: 1,
    fontSize: 12,
    fontWeight: 700,
    color: '#2563eb',
    textAlign: 'right',
  },
  notesSection: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  notesTitle: {
    fontSize: 10,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 9,
    color: '#6b7280',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
});

interface EstimatePDFProps {
  data: {
    company: {
      name: string;
      address: string;
      phone: string;
    };
    client: {
      name: string;
      address: string;
      email: string;
      phone: string;
    };
    estimate: {
      date: string;
      validUntil: string | null;
      jobAddress: string;
      notes: string;
    };
    materials: Array<{
      description: string;
      quantity: number;
      unit: string;
      unitPrice: number;
      total: number;
    }>;
    labor: Array<{
      description: string;
      hours: number;
      rate: number;
      total: number;
    }>;
    totals: {
      subtotal: number;
      tax: number;
      total: number;
    };
  };
}

export function EstimatePDF({ data }: EstimatePDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{data.company.name}</Text>
            {data.company.address && (
              <Text style={styles.companyDetails}>{data.company.address}</Text>
            )}
            {data.company.phone && (
              <Text style={styles.companyDetails}>{data.company.phone}</Text>
            )}
          </View>
          <View>
            <Text style={styles.estimateLabel}>ESTIMATE</Text>
            <Text style={styles.estimateDate}>Date: {data.estimate.date}</Text>
            {data.estimate.validUntil && (
              <Text style={styles.estimateDate}>
                Valid Until: {data.estimate.validUntil}
              </Text>
            )}
          </View>
        </View>

        {/* Client Info */}
        <View style={styles.clientSection}>
          <View style={styles.clientBox}>
            <Text style={styles.sectionLabel}>Bill To</Text>
            <Text style={styles.clientName}>{data.client.name}</Text>
            {data.client.address && (
              <Text style={styles.clientDetails}>{data.client.address}</Text>
            )}
            {data.client.email && (
              <Text style={styles.clientDetails}>{data.client.email}</Text>
            )}
            {data.client.phone && (
              <Text style={styles.clientDetails}>{data.client.phone}</Text>
            )}
          </View>
          <View style={styles.clientBox}>
            <Text style={styles.sectionLabel}>Job Site Address</Text>
            <Text style={styles.clientDetails}>
              {data.estimate.jobAddress || 'Same as billing address'}
            </Text>
          </View>
        </View>

        {/* Materials */}
        {data.materials.length > 0 && (
          <View style={styles.table}>
            <Text style={styles.sectionTitle}>Materials</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.colDescription]}>
                Description
              </Text>
              <Text style={[styles.tableHeaderText, styles.colQty]}>Qty</Text>
              <Text style={[styles.tableHeaderText, styles.colPrice]}>
                Unit Price
              </Text>
              <Text style={[styles.tableHeaderText, styles.colTotal]}>Total</Text>
            </View>
            {data.materials.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.colDescription]}>
                  {item.description}
                </Text>
                <Text style={[styles.tableCell, styles.colQty]}>
                  {item.quantity} {item.unit}
                </Text>
                <Text style={[styles.tableCell, styles.colPrice]}>
                  {formatCurrency(item.unitPrice)}
                </Text>
                <Text style={[styles.tableCellBold, styles.colTotal]}>
                  {formatCurrency(item.total)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Labor */}
        {data.labor.length > 0 && (
          <View style={styles.table}>
            <Text style={styles.sectionTitle}>Labor</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderText, styles.colDescription]}>
                Description
              </Text>
              <Text style={[styles.tableHeaderText, styles.colQty]}>Hours</Text>
              <Text style={[styles.tableHeaderText, styles.colPrice]}>Rate</Text>
              <Text style={[styles.tableHeaderText, styles.colTotal]}>Total</Text>
            </View>
            {data.labor.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.colDescription]}>
                  {item.description}
                </Text>
                <Text style={[styles.tableCell, styles.colQty]}>{item.hours}</Text>
                <Text style={[styles.tableCell, styles.colPrice]}>
                  {formatCurrency(item.rate)}/hr
                </Text>
                <Text style={[styles.tableCellBold, styles.colTotal]}>
                  {formatCurrency(item.total)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Subtotal</Text>
            <Text style={styles.totalsValue}>
              {formatCurrency(data.totals.subtotal)}
            </Text>
          </View>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Tax</Text>
            <Text style={styles.totalsValue}>
              {formatCurrency(data.totals.tax)}
            </Text>
          </View>
          <View style={styles.totalsFinal}>
            <Text style={styles.totalsFinalLabel}>Total</Text>
            <Text style={styles.totalsFinalValue}>
              {formatCurrency(data.totals.total)}
            </Text>
          </View>
        </View>

        {/* Notes */}
        {data.estimate.notes && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>Notes & Terms</Text>
            <Text style={styles.notesText}>{data.estimate.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          Generated by QuickBid Pro - Professional Estimating Software
        </Text>
      </Page>
    </Document>
  );
}

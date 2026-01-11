import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { EstimatePDF } from '@/components/estimates/EstimatePDF';
import { preparePDFData, generatePDFFilename } from '@/lib/pdf';
import React from 'react';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch estimate with items and client
  const { data: estimate, error } = await supabase
    .from('estimates')
    .select('*, clients(*), estimate_items(*)')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (error || !estimate) {
    return NextResponse.json({ error: 'Estimate not found' }, { status: 404 });
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Prepare PDF data
  const pdfData = preparePDFData({
    estimate: {
      ...estimate,
      estimate_items: estimate.estimate_items || [],
    },
    profile,
    client: estimate.clients,
  });

  try {
    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      React.createElement(EstimatePDF, { data: pdfData }) as any
    );

    // Generate filename
    const filename = generatePDFFilename(
      estimate.clients?.name || 'Client',
      estimate.created_at
    );

    // Return PDF
    return new NextResponse(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

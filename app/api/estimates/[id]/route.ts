import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

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

  const { data, error } = await supabase
    .from('estimates')
    .select('*, clients(*), estimate_items(*)')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PATCH(
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

  const body = await request.json();

  // Verify ownership
  const { data: existing } = await supabase
    .from('estimates')
    .select('id')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updateData: any = {};
  if (body.client_id !== undefined) updateData.client_id = body.client_id;
  if (body.job_address !== undefined) updateData.job_address = body.job_address;
  if (body.status !== undefined) {
    updateData.status = body.status;
    if (body.status === 'sent') {
      updateData.sent_at = new Date().toISOString();
    }
  }
  if (body.subtotal !== undefined) updateData.subtotal = body.subtotal;
  if (body.tax !== undefined) updateData.tax = body.tax;
  if (body.total !== undefined) updateData.total = body.total;
  if (body.notes !== undefined) updateData.notes = body.notes;
  if (body.valid_until !== undefined) updateData.valid_until = body.valid_until;
  if (body.pdf_url !== undefined) updateData.pdf_url = body.pdf_url;

  const { data, error } = await supabase
    .from('estimates')
    .update(updateData)
    .eq('id', params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(
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

  // Verify ownership
  const { data: existing } = await supabase
    .from('estimates')
    .select('id')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // Delete line items first (cascade should handle this, but being explicit)
  await supabase.from('estimate_items').delete().eq('estimate_id', params.id);

  const { error } = await supabase
    .from('estimates')
    .delete()
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

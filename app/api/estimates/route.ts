import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');

  let query = supabase
    .from('estimates')
    .select('*, clients(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  const { data: estimate, error: estimateError } = await supabase
    .from('estimates')
    .insert({
      user_id: user.id,
      client_id: body.client_id,
      job_address: body.job_address,
      status: body.status || 'draft',
      subtotal: body.subtotal,
      tax: body.tax,
      total: body.total,
      notes: body.notes,
      valid_until: body.valid_until,
    })
    .select()
    .single();

  if (estimateError) {
    return NextResponse.json({ error: estimateError.message }, { status: 500 });
  }

  // Create line items if provided
  if (body.items && body.items.length > 0) {
    const { error: itemsError } = await supabase.from('estimate_items').insert(
      body.items.map((item: any, index: number) => ({
        estimate_id: estimate.id,
        type: item.type,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unit_price: item.unit_price,
        total: item.total,
        sort_order: index,
      }))
    );

    if (itemsError) {
      // Rollback estimate creation
      await supabase.from('estimates').delete().eq('id', estimate.id);
      return NextResponse.json({ error: itemsError.message }, { status: 500 });
    }
  }

  return NextResponse.json(estimate, { status: 201 });
}

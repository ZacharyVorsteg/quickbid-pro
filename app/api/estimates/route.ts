import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIdentifier, rateLimitResponse, RATE_LIMITS } from '@/lib/rate-limit';

// Maximum allowed values to prevent abuse
const MAX_LIMIT = 100;
const MAX_OFFSET = 10000;

export async function GET(request: NextRequest) {
  // Rate limiting
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId, 'estimates-get', RATE_LIMITS.api);
  if (!rateLimit.success) {
    return rateLimitResponse(rateLimit);
  }

  try {
    const supabase = createRouteHandlerClient({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    // Enforce max limits to prevent abuse
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), MAX_LIMIT);
    const offset = Math.min(parseInt(searchParams.get('offset') || '0'), MAX_OFFSET);

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

    if (error) throw error;

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch estimates' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId, 'estimates-post', RATE_LIMITS.api);
  if (!rateLimit.success) {
    return rateLimitResponse(rateLimit);
  }

  try {
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

    if (estimateError) throw estimateError;

    // Create line items if provided
    if (body.items && body.items.length > 0) {
      const { error: itemsError } = await supabase.from('estimate_items').insert(
        body.items.map((item: { type: string; description: string; quantity: number; unit: string; unit_price: number; total: number }, index: number) => ({
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
        throw itemsError;
      }
    }

    return NextResponse.json(estimate, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create estimate' }, { status: 500 });
  }
}

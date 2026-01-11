import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getClientIdentifier, rateLimitResponse, RATE_LIMITS } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  // Rate limiting
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId, 'materials-get', RATE_LIMITS.api);
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
    const trade = searchParams.get('trade');

    let query = supabase
      .from('materials')
      .select('*')
      .eq('user_id', user.id)
      .order('name', { ascending: true });

    if (trade) {
      query = query.eq('trade', trade);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch materials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const clientId = getClientIdentifier(request);
  const rateLimit = checkRateLimit(clientId, 'materials-post', RATE_LIMITS.api);
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

    if (!body.name) {
      return NextResponse.json(
        { error: 'Material name is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('materials')
      .insert({
        user_id: user.id,
        name: body.name,
        unit: body.unit || 'each',
        default_price: body.default_price || 0,
        trade: body.trade || null,
        is_custom: true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create material' }, { status: 500 });
  }
}

import { createServerClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/layout';
import { StatsCards, RecentEstimates, QuickActions } from '@/components/dashboard';
import type { Profile, EstimateWithClient, EstimateStatus } from '@/lib/database.types';

export default async function DashboardPage() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch profile
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const profile = profileData as Profile | null;

  // Fetch recent estimates with client info
  const { data: estimatesData } = await supabase
    .from('estimates')
    .select('*, clients(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const estimates = estimatesData as EstimateWithClient[] | null;

  // Calculate stats
  const { data: allEstimatesData } = await supabase
    .from('estimates')
    .select('status, total')
    .eq('user_id', user.id);

  const allEstimates = allEstimatesData as { status: EstimateStatus; total: number | null }[] | null;

  const totalEstimates = allEstimates?.length || 0;
  const wonEstimates = allEstimates?.filter((e) => e.status === 'won').length || 0;
  const winRate = totalEstimates > 0 ? Math.round((wonEstimates / totalEstimates) * 100) : 0;
  const avgValue =
    allEstimates && allEstimates.length > 0
      ? allEstimates.reduce((sum, e) => sum + (e.total || 0), 0) / allEstimates.length
      : 0;
  const pendingEstimates =
    allEstimates?.filter((e) => e.status === 'sent').length || 0;

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-8">
        {/* Welcome message */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back{profile?.company_name ? `, ${profile.company_name}` : ''}!
          </h1>
          <p className="mt-1 text-gray-500">
            Here&apos;s what&apos;s happening with your estimates today.
          </p>
        </div>

        {/* Stats */}
        <StatsCards
          totalEstimates={totalEstimates}
          winRate={winRate}
          avgValue={avgValue}
          pendingEstimates={pendingEstimates}
        />

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <RecentEstimates estimates={estimates || []} />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

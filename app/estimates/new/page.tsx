import { createServerClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import { AppLayout } from '@/components/layout';
import { EstimateWizard } from '@/components/estimates';
import type { Profile } from '@/lib/database.types';

export default async function NewEstimatePage() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch profile for default values
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const profile = profileData as Profile | null;

  return (
    <AppLayout title="New Estimate">
      <EstimateWizard profile={profile} />
    </AppLayout>
  );
}

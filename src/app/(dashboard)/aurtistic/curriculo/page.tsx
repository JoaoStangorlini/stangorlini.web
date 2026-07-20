// Este programa é um software livre (Licença AGPLv3)
import { createClient } from '@/utils/supabase/server';
import { getUserProfile } from '@/app/(dashboard)/actions';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import CurriculoClient from '@/components/dashboard/CurriculoClient';

export const dynamic = 'force-dynamic';

export default async function CurriculoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/aurtistic/login');
  }

  const profile = await getUserProfile();

  return (
    <Suspense fallback={<div className="h-full bg-[#121212] flex items-center justify-center text-white">Carregando currículo...</div>}>
      <CurriculoClient initialProfile={profile} />
    </Suspense>
  );
}

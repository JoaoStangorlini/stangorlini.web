import { createClient } from '@/utils/supabase/server';
import { TasksView } from '@/components/dashboard/TasksView';
import { AurtisticQuickLinks } from '@/components/dashboard/AurtisticQuickLinks';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getTaskColumns, getUserProfile } from '@/app/(dashboard)/actions';

export const dynamic = 'force-dynamic';

export default async function AurtisticPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/aurtistic/login');
  }

  // Apenas as tarefas pessoais (is_personal = true e do usuário logado)
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('is_personal', true)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="h-full flex flex-col p-4 md:p-8 bg-[#121212]">
        <div className="p-4 bg-[#93000a]/20 border border-[#93000a] text-[#ffdad6] rounded-md text-sm">
          Erro ao carregar tarefas: {error.message}
        </div>
      </div>
    );
  }

  const columns = await getTaskColumns();
  const profile = await getUserProfile();

  return (
    <div className="min-h-full flex flex-col p-4 md:p-8 bg-[#121212]">
      <div className="mb-4 md:mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-[#FFCC00]">
          <span className="material-symbols-outlined align-middle mr-2">psychology</span>
          Aurtistic
        </h1>
        <p className="text-sm text-[#8E8E8E] mt-1 mb-4">Seu espaço pessoal isolado e livre de distrações.</p>
        <AurtisticQuickLinks initialLinks={profile?.quick_links || []} />
      </div>

      <div>
        <TasksView 
          initialTasks={tasks || []} 
          initialColumns={columns} 
          isPersonalScope={true} 
          initialQuickFilters={profile?.quick_filters || ['responsavel', 'dimensao']} 
          initialQuickSorts={profile?.quick_sorts || ['status', 'prazo', 'prioridade', 'manual']}
        />
      </div>
    </div>
  );
}

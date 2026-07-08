import { createClient } from '@/utils/supabase/server';
import { TasksView } from '@/components/dashboard/TasksView';

export const dynamic = 'force-dynamic';

export default async function LabDivPage() {
  const supabase = await createClient();

  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('dimensao', 'HUB')
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

  return (
    <div className="h-full flex flex-col p-4 md:p-8 bg-[#121212]">
      <div className="mb-4 md:mb-8 shrink-0">
        <h1 className="text-2xl font-bold text-[#e5e2e1]">LabDiv Tasks</h1>
        <p className="text-sm text-[#8E8E8E] mt-1">Tarefas filtradas pela dimensão HUB</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <TasksView initialTasks={tasks || []} />
      </div>
    </div>
  );
}

/*
 * Este programa é um software livre; você pode redistribuí-lo e/ou 
 * modificá-lo sob os termos da Licença Pública Geral GNU Affero (AGPLv3).
 */
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function TarefasPage() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/admin');
  }

  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro ao buscar tarefas:', error);
  }

  const columns = [
    { id: 'BACKLOG', title: 'Backlog' },
    { id: 'IN_PROGRESS', title: 'In Progress' },
    { id: 'COMPLETED', title: 'Completed' }
  ];

  return (
    <div className="p-8 h-full flex flex-col bg-cosmic-bg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cosmic-accent font-title">Gerenciador de Tarefas</h1>
        <button className="bg-cosmic-surface hover:bg-cosmic-surface-hover text-cosmic-accent font-bold py-2 px-6 rounded border border-cosmic-accent transition-colors">
          + Nova Tarefa
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {columns.map((col) => (
          <div key={col.id} className="bg-cosmic-surface p-4 rounded-lg shadow-lg border border-cosmic-surface-hover flex flex-col h-full">
            <h2 className="text-xl font-bold mb-4 text-cosmic-text border-b border-cosmic-surface-hover pb-2">
              {col.title}
            </h2>
            <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {tasks?.filter((t: any) => t.status === col.id).map((task: any) => (
                <div key={task.id} className="bg-cosmic-bg p-4 rounded border border-cosmic-surface hover:border-cosmic-surface-hover transition-colors relative group cursor-pointer">
                  {task.priority === 'Alta' && (
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cosmic-accent rounded-l"></div>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold px-2 py-1 bg-cosmic-surface text-cosmic-text/70 rounded uppercase">
                      {task.dimension}
                    </span>
                    {task.priority === 'Alta' && <span className="text-cosmic-accent text-xs font-bold">ALTA</span>}
                  </div>
                  <h3 className="font-bold text-base mb-1 text-cosmic-text">{task.title}</h3>
                  {task.description && (
                    <p className="text-sm text-cosmic-text/70 mb-3 line-clamp-2">{task.description}</p>
                  )}
                  <div className="flex justify-between items-center text-xs text-cosmic-text/70">
                    <span>{task.assignee || 'Sem responsável'}</span>
                    {task.due_date && <span>{new Date(task.due_date).toLocaleDateString('pt-BR')}</span>}
                  </div>
                </div>
              ))}
              {(!tasks || tasks.filter((t: any) => t.status === col.id).length === 0) && (
                <p className="text-cosmic-text/50 text-sm text-center py-4">Nenhuma tarefa</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

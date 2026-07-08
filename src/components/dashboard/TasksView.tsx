'use client';

import { useState } from 'react';
import { Task } from '@/types';
import { Badge } from './Badge';
import { TaskFormModal } from './TaskFormModal';

function formatDate(dateStr: string | null) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function TasksView({ initialTasks }: { initialTasks: Task[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h2 className="text-xl font-bold text-white tracking-wide">Tarefas</h2>
        <button 
          onClick={handleNew}
          className="bg-[#FFCC00] text-[#121212] font-bold text-sm px-4 py-2 rounded-md hover:bg-[#e6b800] transition-colors shadow-sm"
        >
          + Nova Tarefa
        </button>
      </div>

      {/* Desktop View (Table) */}
      <div className="hidden md:block flex-1 overflow-x-auto overflow-y-auto bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead className="bg-[#252525] border-b border-[#2D2D2D] sticky top-0 z-10">
            <tr>
              <th className="p-4 text-xs font-semibold text-[#8E8E8E] uppercase tracking-wider w-[250px]">Nome</th>
              <th className="p-4 text-xs font-semibold text-[#8E8E8E] uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-[#8E8E8E] uppercase tracking-wider">Prioridade</th>
              <th className="p-4 text-xs font-semibold text-[#8E8E8E] uppercase tracking-wider">Categoria</th>
              <th className="p-4 text-xs font-semibold text-[#8E8E8E] uppercase tracking-wider">Responsável</th>
              <th className="p-4 text-xs font-semibold text-[#8E8E8E] uppercase tracking-wider">Início</th>
              <th className="p-4 text-xs font-semibold text-[#8E8E8E] uppercase tracking-wider">Prazo</th>
              <th className="p-4 text-xs font-semibold text-[#8E8E8E] uppercase tracking-wider">Freq.</th>
              <th className="p-4 text-xs font-semibold text-[#8E8E8E] uppercase tracking-wider">Dimensão</th>
              <th className="p-4 text-xs font-semibold text-[#8E8E8E] uppercase tracking-wider text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2D2D2D]">
            {initialTasks.map(task => (
              <tr key={task.id} className="hover:bg-[#252525] transition-colors group">
                <td className="p-4 text-sm font-medium text-white break-words" title={task.descricao || ''}>
                  {task.nome}
                  {task.descricao && <div className="text-[10px] text-[#A0A0A0] mt-1 line-clamp-1">{task.descricao}</div>}
                </td>
                <td className="p-4"><Badge type="status" value={task.status} /></td>
                <td className="p-4"><Badge type="prioridade" value={task.prioridade} /></td>
                <td className="p-4"><Badge type="categoria" value={task.categoria} /></td>
                <td className="p-4"><Badge type="responsavel" value={task.responsavel} /></td>
                <td className="p-4 text-xs text-[#A0A0A0]">{formatDate(task.inicio)}</td>
                <td className="p-4 text-xs text-[#A0A0A0]">{formatDate(task.prazo)}</td>
                <td className="p-4 text-xs text-[#A0A0A0]">{task.frequencia || '-'}</td>
                <td className="p-4"><Badge type="dimensao" value={task.dimensao} /></td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleEdit(task)}
                    className="text-[#8E8E8E] hover:text-[#FFCC00] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                </td>
              </tr>
            ))}
            {initialTasks.length === 0 && (
              <tr>
                <td colSpan={10} className="p-8 text-center text-[#8E8E8E] text-sm">Nenhuma tarefa encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View (Cards) */}
      <div className="md:hidden flex-1 overflow-y-auto space-y-4 pb-12">
        {initialTasks.map(task => (
          <div key={task.id} className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg p-4 flex flex-col gap-3 relative">
            <button 
              onClick={() => handleEdit(task)}
              className="absolute top-4 right-4 text-[#8E8E8E] hover:text-[#FFCC00]"
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
            <div className="pr-8">
              <h3 className="text-sm font-bold text-white mb-1">{task.nome}</h3>
              {task.descricao && <p className="text-[11px] text-[#A0A0A0] line-clamp-2">{task.descricao}</p>}
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge type="status" value={task.status} />
              <Badge type="prioridade" value={task.prioridade} />
              <Badge type="categoria" value={task.categoria} />
              <Badge type="responsavel" value={task.responsavel} />
              <Badge type="dimensao" value={task.dimensao} />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 border-t border-[#2D2D2D] pt-3 text-[11px] text-[#A0A0A0]">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">event</span>
                <span>Ini: {formatDate(task.inicio)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">event_busy</span>
                <span>Fim: {formatDate(task.prazo)}</span>
              </div>
              {task.frequencia && (
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">update</span>
                  <span>{task.frequencia}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {initialTasks.length === 0 && (
          <div className="p-8 text-center text-[#8E8E8E] text-sm bg-[#1A1A1A] rounded-lg border border-[#2D2D2D]">
            Nenhuma tarefa encontrada.
          </div>
        )}
      </div>

      <TaskFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        task={taskToEdit} 
      />
    </div>
  );
}

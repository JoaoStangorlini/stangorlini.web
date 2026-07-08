'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types';
import { saveTask, deleteTask } from '@/app/(dashboard)/actions';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
}

export function TaskFormModal({ isOpen, onClose, task }: TaskFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Task>>({
    nome: '',
    status: 'não iniciada',
    prioridade: 'Baixa',
    categoria: 'Programar',
    responsavel: 'João',
    dimensao: 'HUB',
    inicio: '',
    prazo: '',
    descricao: '',
    frequencia: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        nome: task.nome,
        status: task.status,
        prioridade: task.prioridade || '',
        categoria: task.categoria || '',
        responsavel: task.responsavel || '',
        dimensao: task.dimensao || '',
        inicio: task.inicio ? task.inicio.split('T')[0] : '',
        prazo: task.prazo ? task.prazo.split('T')[0] : '',
        descricao: task.descricao || '',
        frequencia: task.frequencia || ''
      });
    } else {
      setFormData({
        nome: '',
        status: 'não iniciada',
        prioridade: 'Baixa',
        categoria: 'Programar',
        responsavel: 'João',
        dimensao: 'HUB',
        inicio: '',
        prazo: '',
        descricao: '',
        frequencia: ''
      });
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveTask(formData);
      onClose();
    } catch (err) {
      alert('Erro ao salvar tarefa: ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!task || !task.id) return;
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    setLoading(true);
    try {
      await deleteTask(task.id);
      onClose();
    } catch (err) {
      alert('Erro ao deletar: ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        
        <div className="flex justify-between items-center p-6 border-b border-[#2D2D2D]">
          <h2 className="text-xl font-bold text-white">{task ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
          <button onClick={onClose} className="text-[#A0A0A0] hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="md:col-span-2">
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Nome da Tarefa *</label>
              <input required name="nome" value={formData.nome || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00]" />
            </div>

            <div>
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Status</label>
              <select name="status" value={formData.status || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00]">
                <option value="não iniciada">Não iniciada</option>
                <option value="em progresso">Em progresso</option>
                <option value="falta testar">Falta testar</option>
                <option value="completa">Completa</option>
                <option value="descartada">Descartada</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Prioridade</label>
              <select name="prioridade" value={formData.prioridade || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00]">
                <option value="">Nenhuma</option>
                <option value="Baixa">Baixa</option>
                <option value="Média">Média</option>
                <option value="Alta">Alta</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Categoria</label>
              <select name="categoria" value={formData.categoria || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00]">
                <option value="">Nenhuma</option>
                <option value="Programar">Programar</option>
                <option value="Pesquisar">Pesquisar</option>
                <option value="touch the grass">Touch the grass</option>
                <option value="reunir">Reunir</option>
                <option value="post">Post</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Responsável</label>
              <select name="responsavel" value={formData.responsavel || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00]">
                <option value="">Nenhum</option>
                <option value="João">João</option>
                <option value="Andy">Andy</option>
                <option value="Leo">Leo</option>
                <option value="Dani">Dani</option>
                <option value="Lorenzo">Lorenzo</option>
                <option value="Nacky">Nacky</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Dimensão</label>
              <select name="dimensao" value={formData.dimensao || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00]">
                <option value="">Nenhuma</option>
                <option value="HUB">HUB</option>
                <option value="pessoal">Pessoal</option>
                <option value="USP">USP</option>
                <option value="filmes/series">Filmes/Series</option>
                <option value="cin">Cin</option>
                <option value="tatuagens">Tatuagens</option>
                <option value="compras">Compras</option>
                <option value="hobbys">Hobbys</option>
                <option value="livros">Livros</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Frequência</label>
              <input placeholder="Ex: Diária, Semanal, Mensal" name="frequencia" value={formData.frequencia || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00]" />
            </div>

            <div>
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Início</label>
              <input type="date" name="inicio" value={formData.inicio || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00] [color-scheme:dark]" />
            </div>

            <div>
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Prazo</label>
              <input type="date" name="prazo" value={formData.prazo || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00] [color-scheme:dark]" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs text-[#8E8E8E] uppercase tracking-wider mb-2">Descrição</label>
              <textarea name="descricao" value={formData.descricao || ''} onChange={handleChange} rows={3} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00] resize-y" />
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            {task ? (
              <button type="button" onClick={handleDelete} disabled={loading} className="text-[#db4437] text-sm hover:underline font-semibold">Excluir Tarefa</button>
            ) : <div />}
            <div className="flex gap-4">
              <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2 border border-[#2D2D2D] text-white rounded-md hover:bg-[#252525] text-sm font-semibold transition-colors">Cancelar</button>
              <button type="submit" disabled={loading} className="px-6 py-2 bg-[#FFCC00] text-black rounded-md hover:bg-[#e6b800] text-sm font-bold transition-colors shadow-sm disabled:opacity-50">
                {loading ? 'Salvando...' : 'Salvar Tarefa'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Task } from '@/types';
import { updateMultipleTasks } from '@/app/(dashboard)/actions';
import { getBadgeColorClass } from './Badge';
import { CustomSelect } from './CustomSelect';

interface BulkEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskIds: string[];
  onSuccess: () => void;
}

export function BulkEditModal({ isOpen, onClose, taskIds, onSuccess }: BulkEditModalProps) {
  const [loading, setLoading] = useState(false);
  
  // Track which fields are active for bulk update
  const [activeFields, setActiveFields] = useState<Record<string, boolean>>({
    status: false,
    prioridade: false,
    categoria: false,
    responsavel: false,
    dimensao: false,
    frequencia: false,
    inicio: false,
    prazo: false,
  });

  const [formData, setFormData] = useState<Partial<Task>>({
    status: 'não iniciada',
    prioridade: '',
    categoria: '',
    responsavel: '',
    dimensao: '',
    inicio: '',
    prazo: '',
    frequencia: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build the updates object with only the active fields
    const updates: Partial<Task> = {};
    let hasUpdates = false;
    
    (Object.keys(activeFields) as Array<keyof typeof activeFields>).forEach(key => {
      if (activeFields[key]) {
        (updates as any)[key] = formData[key as keyof Task];
        hasUpdates = true;
      }
    });

    if (!hasUpdates) {
      alert("Selecione ao menos um campo para editar.");
      return;
    }

    setLoading(true);
    try {
      await updateMultipleTasks(taskIds, updates);
      onSuccess();
    } catch (err) {
      alert('Erro ao editar em massa: ' + String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleFieldToggle = (field: string) => {
    setActiveFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Automatically check the checkbox if they type/select something, but only if it was unchecked.
    if (!activeFields[e.target.name]) {
      setActiveFields(prev => ({ ...prev, [e.target.name]: true }));
    }
  };

  const CheckboxToggle = ({ field, label }: { field: string, label: string }) => (
    <label className="flex items-center gap-2 cursor-pointer mb-2 w-fit">
      <input 
        type="checkbox" 
        checked={activeFields[field]} 
        onChange={() => handleFieldToggle(field)} 
        className="accent-[#9D4EDD] w-4 h-4 rounded-sm"
      />
      <span className="text-xs text-[#8E8E8E] uppercase tracking-wider font-bold hover:text-white transition-colors">{label}</span>
    </label>
  );

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        
        <div className="flex justify-between items-center p-6 border-b border-[#2D2D2D]">
          <div>
            <h2 className="text-xl font-bold text-[#9D4EDD]">Edição em Massa</h2>
            <p className="text-xs text-[#A0A0A0] mt-1">Alterando {taskIds.length} tarefas selecionadas. Marque os campos que deseja sobrescrever.</p>
          </div>
          <button onClick={onClose} className="text-[#A0A0A0] hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Status */}
            <div className={`p-3 rounded-lg border transition-colors ${activeFields.status ? 'border-[#9D4EDD]/50 bg-[#9D4EDD]/5' : 'border-[#2D2D2D]'}`}>
              <CheckboxToggle field="status" label="Status" />
              <CustomSelect name="status" value={formData.status || ''} onChange={handleChange} type="status" options={[{"value":"não iniciada","label":"Não iniciada"},{"value":"em progresso","label":"Em progresso"},{"value":"falta testar","label":"Falta testar"},{"value":"completa","label":"Completa"},{"value":"descartada","label":"Descartada"}]} disabled={!activeFields.status} />
            </div>

            {/* Prioridade */}
            <div className={`p-3 rounded-lg border transition-colors ${activeFields.prioridade ? 'border-[#9D4EDD]/50 bg-[#9D4EDD]/5' : 'border-[#2D2D2D]'}`}>
              <CheckboxToggle field="prioridade" label="Prioridade" />
              <CustomSelect name="prioridade" value={formData.prioridade || ''} onChange={handleChange} type="prioridade" options={[{"value":"","label":"Nenhuma"},{"value":"Baixa","label":"Baixa"},{"value":"Média","label":"Média"},{"value":"Alta","label":"Alta"}]} disabled={!activeFields.prioridade} />
            </div>

            {/* Categoria */}
            <div className={`p-3 rounded-lg border transition-colors ${activeFields.categoria ? 'border-[#9D4EDD]/50 bg-[#9D4EDD]/5' : 'border-[#2D2D2D]'}`}>
              <CheckboxToggle field="categoria" label="Categoria" />
              <CustomSelect name="categoria" value={formData.categoria || ''} onChange={handleChange} type="categoria" options={[{"value":"","label":"Nenhuma"},{"value":"Programar","label":"Programar"},{"value":"Pesquisar","label":"Pesquisar"},{"value":"touch the grass","label":"Touch the grass"},{"value":"reunir","label":"Reunir"},{"value":"post","label":"Post"},{"value":"outros","label":"Outros"}]} disabled={!activeFields.categoria} />
            </div>

            {/* Responsável */}
            <div className={`p-3 rounded-lg border transition-colors ${activeFields.responsavel ? 'border-[#9D4EDD]/50 bg-[#9D4EDD]/5' : 'border-[#2D2D2D]'}`}>
              <CheckboxToggle field="responsavel" label="Responsável" />
              <CustomSelect name="responsavel" value={formData.responsavel || ''} onChange={handleChange} type="responsavel" options={[{"value":"","label":"Nenhum"},{"value":"João","label":"João"},{"value":"Andy","label":"Andy"},{"value":"Leo","label":"Leo"},{"value":"Dani","label":"Dani"},{"value":"Lorenzo","label":"Lorenzo"},{"value":"Nacky","label":"Nacky"}]} disabled={!activeFields.responsavel} />
            </div>

            {/* Dimensão */}
            <div className={`p-3 rounded-lg border transition-colors ${activeFields.dimensao ? 'border-[#9D4EDD]/50 bg-[#9D4EDD]/5' : 'border-[#2D2D2D]'}`}>
              <CheckboxToggle field="dimensao" label="Dimensão" />
              <CustomSelect name="dimensao" value={formData.dimensao || ''} onChange={handleChange} type="dimensao" options={[{"value":"","label":"Nenhuma"},{"value":"HUB","label":"HUB"},{"value":"urgente","label":"Urgente"},{"value":"USP","label":"USP"},{"value":"filmes/series","label":"Filmes/Series"},{"value":"cin","label":"Cin"},{"value":"tatuagens","label":"Tatuagens"},{"value":"compras","label":"Compras"},{"value":"hobbys","label":"Hobbys"},{"value":"livros","label":"Livros"}]} disabled={!activeFields.dimensao} />
            </div>

            {/* Frequência */}
            <div className={`p-3 rounded-lg border transition-colors ${activeFields.frequencia ? 'border-[#9D4EDD]/50 bg-[#9D4EDD]/5' : 'border-[#2D2D2D]'}`}>
              <CheckboxToggle field="frequencia" label="Frequência" />
              <input disabled={!activeFields.frequencia} placeholder="Ex: Diária, Semanal, Mensal" name="frequencia" value={formData.frequencia || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00] disabled:opacity-50" />
            </div>

            {/* Início */}
            <div className={`p-3 rounded-lg border transition-colors ${activeFields.inicio ? 'border-[#9D4EDD]/50 bg-[#9D4EDD]/5' : 'border-[#2D2D2D]'}`}>
              <CheckboxToggle field="inicio" label="Início" />
              <input disabled={!activeFields.inicio} type="date" name="inicio" value={formData.inicio || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00] [color-scheme:dark] disabled:opacity-50" />
            </div>

            {/* Prazo */}
            <div className={`p-3 rounded-lg border transition-colors ${activeFields.prazo ? 'border-[#9D4EDD]/50 bg-[#9D4EDD]/5' : 'border-[#2D2D2D]'}`}>
              <CheckboxToggle field="prazo" label="Prazo" />
              <input disabled={!activeFields.prazo} type="date" name="prazo" value={formData.prazo || ''} onChange={handleChange} className="w-full bg-[#121212] border border-[#2D2D2D] rounded-md px-4 py-2 text-white focus:outline-none focus:border-[#FFCC00] [color-scheme:dark] disabled:opacity-50" />
            </div>

          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button type="button" onClick={onClose} disabled={loading} className="px-6 py-2 border border-[#2D2D2D] text-white rounded-md hover:bg-[#252525] text-sm font-semibold transition-colors">Cancelar</button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-[#9D4EDD] text-white rounded-md hover:bg-[#8338C7] text-sm font-bold transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">done_all</span>
              {loading ? 'Aplicando...' : 'Aplicar a Todas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

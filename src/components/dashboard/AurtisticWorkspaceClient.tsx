// Este programa é um software livre (Licença AGPLv3)
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Task, TaskColumn } from '@/types';
import { TasksView } from './TasksView';
import { AurtisticQuickLinks } from './AurtisticQuickLinks';
import { saveUserProfileData } from '@/app/(dashboard)/actions';

interface AurtisticWorkspaceClientProps {
  initialProfile: any;
  pessoalTasks: Task[];
  servidorTasks: Task[];
  labdivTasks: Task[];
  columns: TaskColumn[];
  userId: string;
}

export default function AurtisticWorkspaceClient({
  initialProfile,
  pessoalTasks,
  servidorTasks,
  labdivTasks,
  columns,
  userId
}: AurtisticWorkspaceClientProps) {
  const isJoao = userId === 'f2f1e6c9-a178-433f-9d87-37d6ce7ec94e';
  const isAndy = userId === '7dcfe172-1cf0-4389-9abd-f340b1408386';
  const showSwitcher = isJoao; // Only show switcher if user is João (since João has both servidor and labdiv)

  const [profile, setProfile] = useState(initialProfile);
  const [activeTaskScope, setActiveTaskScope] = useState<'pessoal' | 'servidor' | 'labdiv'>(
    isJoao ? 'servidor' : isAndy ? 'labdiv' : 'pessoal'
  );
  const [showConfig, setShowConfig] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Features configuration local state
  const featuresConfig = profile?.features_config || {
    active: ['tasks', 'resumo', 'curriculo', 'portfolio'],
    order: ['tasks', 'resumo', 'curriculo', 'portfolio'],
    layout_style: 'default'
  };

  const [activeFeatures, setActiveFeatures] = useState<string[]>(featuresConfig.active);
  const [featuresOrder, setFeaturesOrder] = useState<string[]>(featuresConfig.order);

  // Toggle active feature
  const handleToggleFeature = (feature: string) => {
    // Tasks must always be an option, but we let them toggle if they want, but usually it should be toggled
    if (activeFeatures.includes(feature)) {
      if (feature === 'tasks' && activeFeatures.length === 1) {
        alert("Você deve manter pelo menos uma ferramenta ativa.");
        return;
      }
      setActiveFeatures(activeFeatures.filter(f => f !== feature));
    } else {
      setActiveFeatures([...activeFeatures, feature]);
    }
  };

  // Reordering features
  const moveFeature = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...featuresOrder];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex >= 0 && targetIndex < newOrder.length) {
      const temp = newOrder[index];
      newOrder[index] = newOrder[targetIndex];
      newOrder[targetIndex] = temp;
      setFeaturesOrder(newOrder);
    }
  };

  // Save workspace preferences
  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      const updatedConfig = {
        active: activeFeatures,
        order: featuresOrder,
        layout_style: featuresConfig.layout_style || 'default'
      };
      await saveUserProfileData({ features_config: updatedConfig });
      setProfile({ ...profile, features_config: updatedConfig });
      setShowConfig(false);
      // Reload page to update Navbar
      window.location.reload();
    } catch (e) {
      alert("Erro ao salvar configurações: " + String(e));
    } finally {
      setIsSaving(false);
    }
  };

  // Get current active tasks based on switcher selection
  const getCurrentTasks = () => {
    if (activeTaskScope === 'servidor' && isJoao) return servidorTasks;
    if (activeTaskScope === 'labdiv' && (isJoao || isAndy)) return labdivTasks;
    return pessoalTasks;
  };

  const featureLabels: Record<string, string> = {
    tasks: 'Tarefas (Planner)',
    resumo: 'Resumo Profissional',
    curriculo: 'Currículo',
    portfolio: 'Portfólio'
  };

  return (
    <div className="min-h-full flex flex-col p-4 md:p-8 bg-[#121212]">
      {/* Workspace Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <Image 
              src="/aurtistic-icon.png" 
              alt="Aurtistic Logo" 
              width={36} 
              height={36}
              className="h-9 w-9 object-contain"
            />
            <h1 className="text-3xl font-black text-white font-['Bukra'] tracking-tighter">
              Aurtistic <span className="text-[#FFCC00] text-lg font-bold font-sans align-middle ml-2">creative manager</span>
            </h1>
          </div>
          <p className="text-sm text-[#8E8E8E] mt-1.5">Seu espaço pessoal isolado e livre de distrações.</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#2D2D2D] hover:border-[#FFCC00] text-white rounded-lg text-sm font-bold transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#FFCC00]">dashboard_customize</span>
            {showConfig ? 'Fechar Editor' : 'Montar Espaço'}
          </button>
        </div>
      </div>

      {/* Workspace Configurator Panel */}
      {showConfig && (
        <div className="mb-8 p-6 bg-[#1A1A1A]/80 border border-[#2D2D2D] rounded-2xl backdrop-blur-md max-w-2xl animate-in fade-in slide-in-from-top duration-300">
          <h2 className="text-xl font-bold text-white mb-2">Configure seu Espaço de Trabalho</h2>
          <p className="text-sm text-[#8E8E8E] mb-6">Selecione as ferramentas ativas no seu painel e ordene as abas na barra de navegação.</p>

          <div className="space-y-6">
            {/* Features checkboxes */}
            <div>
              <h3 className="text-sm font-bold text-[#FFCC00] mb-3 uppercase tracking-wider">Ferramentas Ativas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.keys(featureLabels).map(key => (
                  <label 
                    key={key} 
                    className="flex items-center justify-between p-3 bg-[#242424] border border-[#2D2D2D] hover:border-[#3D3D3D] rounded-xl cursor-pointer transition-colors"
                  >
                    <span className="text-white text-sm font-medium">{featureLabels[key]}</span>
                    <input 
                      type="checkbox" 
                      checked={activeFeatures.includes(key)}
                      onChange={() => handleToggleFeature(key)}
                      className="w-4 h-4 rounded text-[#9D4EDD] focus:ring-[#9D4EDD] bg-[#1A1A1A] border-[#2D2D2D]"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Reorder tabs */}
            <div>
              <h3 className="text-sm font-bold text-[#FFCC00] mb-3 uppercase tracking-wider">Ordem das Abas (Navbar)</h3>
              <div className="space-y-2">
                {featuresOrder.map((key, index) => {
                  const isActive = activeFeatures.includes(key);
                  return (
                    <div 
                      key={key} 
                      className={`flex items-center justify-between p-3 bg-[#242424] border border-[#2D2D2D] rounded-xl ${!isActive ? 'opacity-40' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#8E8E8E] text-[18px]">drag_indicator</span>
                        <span className="text-white text-sm font-medium">{featureLabels[key]} {!isActive && <span className="text-xs text-[#8E8E8E]">(Inativo)</span>}</span>
                      </div>
                      <div className="flex gap-1">
                        <button 
                          disabled={index === 0} 
                          onClick={() => moveFeature(index, 'up')}
                          className="w-8 h-8 rounded-lg bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white flex items-center justify-center disabled:opacity-30 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                        </button>
                        <button 
                          disabled={index === featuresOrder.length - 1} 
                          onClick={() => moveFeature(index, 'down')}
                          className="w-8 h-8 rounded-lg bg-[#1A1A1A] hover:bg-[#2D2D2D] text-white flex items-center justify-center disabled:opacity-30 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Save Action */}
            <div className="pt-4 border-t border-[#2D2D2D] flex justify-end gap-3">
              <button 
                onClick={() => setShowConfig(false)}
                className="px-4 py-2 text-sm text-[#A0A0A0] hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button 
                disabled={isSaving}
                onClick={handleSaveConfig}
                className="px-5 py-2 bg-[#FFCC00] hover:bg-[#e6b800] text-[#121212] rounded-lg text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic scope selector switcher (Servidor / LabDiv) */}
      {showSwitcher && activeFeatures.includes('tasks') && (
        <div className="flex justify-center mb-6 shrink-0">
          <div className="inline-flex p-1 bg-[#1A1A1A] border border-[#2D2D2D] rounded-full gap-1">
            {isJoao && (
              <button 
                onClick={() => setActiveTaskScope('servidor')}
                className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeTaskScope === 'servidor' 
                    ? 'bg-[#9D4EDD] text-white shadow-md' 
                    : 'text-[#A0A0A0] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">dns</span>
                Servidor
              </button>
            )}
            {(isJoao || isAndy) && (
              <button 
                onClick={() => setActiveTaskScope('labdiv')}
                className={`px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  activeTaskScope === 'labdiv' 
                    ? 'bg-[#9D4EDD] text-white shadow-md' 
                    : 'text-[#A0A0A0] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">hub</span>
                LabDiv
              </button>
            )}
          </div>
        </div>
      )}


      {/* Main Tasks Planner View */}
      {activeFeatures.includes('tasks') ? (
        <div>
          {/* Quick links block */}
          <div className="mb-4">
            <AurtisticQuickLinks initialLinks={profile?.quick_links || []} />
          </div>

          
          <TasksView 
            key={activeTaskScope}
            initialTasks={getCurrentTasks()} 
            initialColumns={columns} 
            isPersonalScope={activeTaskScope === 'pessoal'} 
            initialQuickFilters={profile?.quick_filters || ['responsavel', 'dimensao']} 
            initialQuickSorts={profile?.quick_sorts || ['status', 'prazo', 'prioridade', 'manual']}
          />
        </div>
      ) : (
        <div className="flex-1 bg-[#1A1A1A]/30 border border-[#2D2D2D]/60 rounded-2xl flex flex-col items-center justify-center p-12 text-center my-6">
          <span className="material-symbols-outlined text-[64px] text-[#FFCC00] mb-4">dashboard</span>
          <h2 className="text-2xl font-bold text-white mb-2">Sua Ferramenta de Tarefas está oculta</h2>
          <p className="text-[#A0A0A0] max-w-md mb-6">Você desativou a ferramenta de planejamento de tarefas. Ative-a no menu "Montar Espaço" acima ou use a barra de navegação para acessar outras ferramentas configuradas.</p>
          <button 
            onClick={() => setShowConfig(true)}
            className="px-6 py-2.5 bg-[#FFCC00] hover:bg-[#e6b800] text-[#121212] rounded-lg text-sm font-bold transition-colors"
          >
            Ativar Ferramentas
          </button>
        </div>
      )}
    </div>
  );
}

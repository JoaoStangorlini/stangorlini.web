// Este programa é um software livre (Licença AGPLv3)
'use client';

import React, { useState } from 'react';
import { saveUserProfileData } from '@/app/(dashboard)/actions';

import Image from 'next/image';

interface PortfolioClientProps {
  initialProfile: any;
}


interface PortfolioProject {
  title: string;
  description: string;
  link: string;
  tags: string[];
  image_url: string;
}

export default function PortfolioClient({ initialProfile }: PortfolioClientProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Parse portfolio list
  let initialPortfolioData: PortfolioProject[] = [];
  try {
    if (profile?.portfolio && Array.isArray(profile.portfolio)) {
      initialPortfolioData = profile.portfolio as PortfolioProject[];
    }
  } catch (e) {
    console.error(e);
  }

  const [projects, setProjects] = useState<PortfolioProject[]>(initialPortfolioData);

  const handleSave = async (dataToSave = projects) => {
    setIsSaving(true);
    try {
      await saveUserProfileData({ portfolio: dataToSave });
      setProfile({ ...profile, portfolio: dataToSave });
      setIsEditing(false);
    } catch (e) {
      alert("Erro ao salvar portfólio: " + String(e));
    } finally {
      setIsSaving(false);
    }
  };

  const handleUseDefaultTemplate = () => {
    const template: PortfolioProject[] = [
      {
        title: 'HUB LabDiv',
        description: 'Plataforma completa de comunicação e difusão científica do IFUSP, com fluxo de informações e artes integradas.',
        link: 'https://hub-lab-div.vercel.app',
        tags: ['PWA', 'Next.js', 'Supabase', 'TailwindCSS'],
        image_url: '/labdiv-logo.png'
      },
      {
        title: 'Aurtistic',
        description: 'Um gerenciador pessoal completo de tarefas e rotinas acadêmicas, focado em organização e produtividade sem distrações.',
        link: '/aurtistic',
        tags: ['SaaS', 'Capacitor', 'Supabase', 'React'],
        image_url: '/aurtistic-icon.png'
      }
    ];
    setProjects(template);
    handleSave(template);
  };

  const addProject = () => {
    setProjects([...projects, { title: '', description: '', link: '', tags: [], image_url: '' }]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: keyof PortfolioProject, value: any) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  const isSetupEmpty = !profile?.portfolio || (Array.isArray(profile.portfolio) && profile.portfolio.length === 0);

  if (isSetupEmpty && !isEditing) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-8 bg-[#121212] text-center">
        <div className="max-w-md p-8 bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl shadow-xl backdrop-blur-md">
          <span className="material-symbols-outlined text-[64px] text-[#FFCC00] mb-4">folder_special</span>
          <h2 className="text-2xl font-bold text-white mb-2">Configure seu Portfólio</h2>
          <p className="text-[#A0A0A0] text-sm mb-6">
            Seu Portfólio de Projetos está vazio. Você pode preenchê-lo do zero ou pré-carregar os projetos modelo do João Paulo.
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={handleUseDefaultTemplate}
              className="w-full py-2.5 bg-[#FFCC00] hover:bg-[#e6b800] text-[#121212] font-bold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              Usar Modelo Padrão (Estilo João)
            </button>
            <button 
              onClick={() => setIsEditing(true)}
              className="w-full py-2.5 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white font-bold rounded-lg text-sm transition-colors"
            >
              Adicionar Projetos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col p-4 md:p-8 bg-[#121212] text-[#F5F5F5] font-['Open_Sans'] overflow-y-auto">
      {/* Workspace Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0 border-b border-[#2D2D2D]/30 pb-4">
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
          <p className="text-sm text-[#8E8E8E] mt-1.5">Mostruário de projetos desenvolvidos e sistemas ativos.</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {isEditing && (
            <button 
              onClick={() => {
                setProjects(initialPortfolioData);
                setIsEditing(false);
              }}
              className="px-4 py-2 text-sm text-[#A0A0A0] hover:text-white transition-colors animate-fade-in"
            >
              Cancelar
            </button>
          )}
          <button 
            disabled={isSaving}
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#2D2D2D] hover:border-[#FFCC00] text-white rounded-lg text-sm font-bold transition-all disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px] text-[#FFCC00]">
              {isEditing ? 'done' : 'edit'}
            </span>
            {isSaving ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Editar Subespaço'}
          </button>
        </div>
      </div>


      {isEditing ? (
        /* EDITOR MODE */
        <div className="max-w-4xl mx-auto w-full bg-[#1A1A1A] border border-[#2D2D2D] p-6 md:p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-center border-b border-[#2D2D2D] pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FFCC00]">folder_special</span>
              Editar Projetos do Portfólio
            </h2>
            <button 
              onClick={addProject}
              className="px-3 py-1.5 bg-[#2D2D2D] hover:bg-[#3D3D3D] text-white rounded text-xs font-bold transition-colors"
            >
              + Novo Projeto
            </button>
          </div>

          <div className="space-y-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="p-4 bg-[#242424] border border-[#2D2D2D] rounded-xl space-y-3 relative">
                <button 
                  onClick={() => removeProject(idx)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-400 text-xs font-bold"
                >
                  Excluir
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#A0A0A0] mb-1">Título do Projeto</label>
                    <input 
                      type="text"
                      value={proj.title}
                      onChange={e => updateProject(idx, 'title', e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#9D4EDD]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A0A0A0] mb-1">Link do Projeto (URL)</label>
                    <input 
                      type="text"
                      value={proj.link}
                      onChange={e => updateProject(idx, 'link', e.target.value)}
                      className="w-full bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#9D4EDD]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A0A0A0] mb-1">URL da Imagem / Logo</label>
                    <input 
                      type="text"
                      value={proj.image_url}
                      onChange={e => updateProject(idx, 'image_url', e.target.value)}
                      placeholder="Ex: /labdiv-logo.png"
                      className="w-full bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#9D4EDD]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A0A0A0] mb-1">Tags / Tecnologias (separadas por vírgula)</label>
                    <input 
                      type="text"
                      value={proj.tags ? proj.tags.join(', ') : ''}
                      onChange={e => updateProject(idx, 'tags', e.target.value.split(',').map(s => s.trim()))}
                      className="w-full bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#9D4EDD]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#A0A0A0] mb-1">Descrição</label>
                  <textarea 
                    value={proj.description}
                    onChange={e => updateProject(idx, 'description', e.target.value)}
                    rows={3}
                    className="w-full bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#9D4EDD] resize-y"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VISUAL PREVIEW / VIEW MODE */
        <main className="pt-10 pb-16 px-6 max-w-5xl mx-auto space-y-12 relative z-10">
          <div>
            <h2 className="text-3xl font-['Bukra'] font-bold text-white border-l-4 border-[#FFCC00] pl-4">Portfólio de Software & Design</h2>
            <p className="text-[#A0A0A0] mt-2">Sistemas, interfaces e soluções criadas.</p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {projects.map((proj, idx) => (
              <div key={idx} className="rounded-2xl p-[2px] bg-gradient-to-r from-[#9D4EDD] to-[#FFCC00]">
                <div className="bg-[#1E1E1E] rounded-[14px] flex flex-col md:flex-row items-center justify-between p-8 hover:bg-[#252525] transition-colors gap-6 group">
                  
                  {/* Image/Logo area */}
                  {proj.image_url && (
                    <div className="w-24 h-24 rounded-2xl bg-[#121212] border border-[#2D2D2D] p-3 flex items-center justify-center shrink-0">
                      <img 
                        src={proj.image_url} 
                        alt={proj.title} 
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/aurtistic-icon.png';
                        }}
                      />
                    </div>
                  )}

                  <div className="space-y-4 text-center md:text-left flex-1">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-['Bukra'] font-bold text-white">{proj.title}</h3>
                      <p className="text-[#A0A0A0] max-w-3xl">{proj.description}</p>
                    </div>

                    {proj.tags && proj.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                        {proj.tags.filter(t => t.trim() !== '').map((tag, tidx) => (
                          <span key={tidx} className="px-2.5 py-0.5 bg-[#2D2D2D] border border-[#3D3D3D] text-[#FFCC00] text-xs font-semibold rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {proj.link && (
                    <div className="shrink-0 w-full md:w-auto">
                      <a 
                        href={proj.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="block text-center py-2.5 px-6 bg-[#FFCC00] hover:bg-[#e6b800] text-[#121212] font-bold rounded-lg text-sm transition-colors"
                      >
                        Acessar Link
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}

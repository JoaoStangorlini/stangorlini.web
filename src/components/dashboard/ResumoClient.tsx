// Este programa é um software livre (Licença AGPLv3)
'use client';

import React, { useState } from 'react';
import { saveUserProfileData } from '@/app/(dashboard)/actions';

import Image from 'next/image';

interface ResumoClientProps {
  initialProfile: any;
}

export default function ResumoClient({ initialProfile }: ResumoClientProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Parse resumo JSON or fallback to standard structure
  const defaultResumo = {
    tagline: 'FOTÓGRAFO & DEV & FÍSICO',
    title: 'SEU NOME AQUI',
    subtitle: 'Descreva sua atuação principal, projetos de pesquisa ou especialidades.',
    button1_text: 'Agendar Reunião',
    button1_url: '#',
    button2_text: 'Ver GitHub',
    button2_url: '#',
    profile_image_url: '/perfil.jpeg',
    description: 'Escreva um resumo detalhado sobre você, sua formação, objetivos profissionais e principais conquistas.'
  };

  let initialResumoData = defaultResumo;
  try {
    if (profile?.resumo) {
      initialResumoData = JSON.parse(profile.resumo);
    }
  } catch (e) {
    // If it's pure text, convert to object
    if (profile?.resumo) {
      initialResumoData = { ...defaultResumo, description: profile.resumo };
    }
  }

  const [resumoData, setResumoData] = useState(initialResumoData);

  const handleSave = async (dataToSave = resumoData) => {
    setIsSaving(true);
    try {
      const jsonStr = JSON.stringify(dataToSave);
      await saveUserProfileData({ resumo: jsonStr });
      setProfile({ ...profile, resumo: jsonStr });
      setIsEditing(false);
    } catch (e) {
      alert("Erro ao salvar resumo: " + String(e));
    } finally {
      setIsSaving(false);
    }
  };

  const handleUseDefaultTemplate = () => {
    const template = {
      tagline: 'FOTÓGRAFO & DEV & FÍSICO',
      title: 'JOÃO PAULO STANGORLINI',
      subtitle: 'Focando em pesquisa científica, desenvolvimento full-stack e organization acadêmica através do Aurtistic.',
      button1_text: 'Agendar Reunião',
      button1_url: 'https://calendar.app.google/tELr1q8ky4G98EL58',
      button2_text: 'Ver GitHub',
      button2_url: 'https://github.com/JoaoStangorlini',
      profile_image_url: '/perfil.jpeg',
      description: 'Estudante de Física no Instituto de Física (USP - Butantã) com perfil voltado à tecnologia e educação. Experiência prática em desenvolvimento Web (PWA), design (web e gráfico), otimização, manutenção e montagem de hardware de alta performance.'
    };
    setResumoData(template);
    handleSave(template);
  };

  // If empty (no custom or default setup), show blank setup screen
  const isSetupEmpty = !profile?.resumo;

  if (isSetupEmpty && !isEditing) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-8 bg-[#121212] text-center">
        <div className="max-w-md p-8 bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl shadow-xl backdrop-blur-md">
          <span className="material-symbols-outlined text-[64px] text-[#FFCC00] mb-4">description</span>
          <h2 className="text-2xl font-bold text-white mb-2">Configure seu Resumo</h2>
          <p className="text-[#A0A0A0] text-sm mb-6">
            Sua seção de Resumo Profissional está vazia. Você pode iniciar escrevendo do zero ou usar nosso modelo padrão inspirado no João Paulo.
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
              Escrever do Zero
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
          <p className="text-sm text-[#8E8E8E] mt-1.5">Apresentação profissional e resumo de qualificações.</p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          {isEditing && (
            <button 
              onClick={() => {
                setResumoData(initialResumoData);
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
          <h2 className="text-xl font-bold text-white mb-4 border-b border-[#2D2D2D] pb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FFCC00]">edit_note</span>
            Editar Resumo Profissional
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#FFCC00] uppercase tracking-wider mb-2">Tag/Rótulo</label>
              <input 
                type="text"
                value={resumoData.tagline}
                onChange={e => setResumoData({...resumoData, tagline: e.target.value})}
                placeholder="Ex: FOTÓGRAFO & DEV & FÍSICO"
                className="w-full bg-[#242424] border border-[#2D2D2D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D4EDD]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#FFCC00] uppercase tracking-wider mb-2">Nome Principal / Título</label>
              <input 
                type="text"
                value={resumoData.title}
                onChange={e => setResumoData({...resumoData, title: e.target.value})}
                placeholder="Ex: JOÃO PAULO STANGORLINI"
                className="w-full bg-[#242424] border border-[#2D2D2D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D4EDD]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#FFCC00] uppercase tracking-wider mb-2">Subtítulo / Descrição Curta</label>
            <textarea 
              value={resumoData.subtitle}
              onChange={e => setResumoData({...resumoData, subtitle: e.target.value})}
              rows={3}
              placeholder="Descreva brevemente sua atuação..."
              className="w-full bg-[#242424] border border-[#2D2D2D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D4EDD] resize-y"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#FFCC00] uppercase tracking-wider mb-2">Texto do Botão 1</label>
              <input 
                type="text"
                value={resumoData.button1_text}
                onChange={e => setResumoData({...resumoData, button1_text: e.target.value})}
                className="w-full bg-[#242424] border border-[#2D2D2D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D4EDD]"
              />
              <label className="block text-xs font-bold text-[#FFCC00] uppercase tracking-wider mt-2 mb-1">URL do Botão 1</label>
              <input 
                type="text"
                value={resumoData.button1_url}
                onChange={e => setResumoData({...resumoData, button1_url: e.target.value})}
                className="w-full bg-[#242424] border border-[#2D2D2D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D4EDD]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#FFCC00] uppercase tracking-wider mb-2">Texto do Botão 2</label>
              <input 
                type="text"
                value={resumoData.button2_text}
                onChange={e => setResumoData({...resumoData, button2_text: e.target.value})}
                className="w-full bg-[#242424] border border-[#2D2D2D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D4EDD]"
              />
              <label className="block text-xs font-bold text-[#FFCC00] uppercase tracking-wider mt-2 mb-1">URL do Botão 2</label>
              <input 
                type="text"
                value={resumoData.button2_url}
                onChange={e => setResumoData({...resumoData, button2_url: e.target.value})}
                className="w-full bg-[#242424] border border-[#2D2D2D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D4EDD]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#FFCC00] uppercase tracking-wider mb-2">Link da Imagem de Perfil</label>
              <input 
                type="text"
                value={resumoData.profile_image_url}
                onChange={e => setResumoData({...resumoData, profile_image_url: e.target.value})}
                className="w-full bg-[#242424] border border-[#2D2D2D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D4EDD]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#FFCC00] uppercase tracking-wider mb-2">Biografia / Resumo Detalhado</label>
            <textarea 
              value={resumoData.description}
              onChange={e => setResumoData({...resumoData, description: e.target.value})}
              rows={6}
              placeholder="Escreva sua trajetória profissional e competências..."
              className="w-full bg-[#242424] border border-[#2D2D2D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#9D4EDD] resize-y"
            />
          </div>
        </div>
      ) : (
        /* VISUAL PREVIEW / VIEW MODE */
        <div className="max-w-5xl mx-auto w-full space-y-16 py-10 relative z-10">
          {/* Hero Section */}
          <section className="flex flex-col-reverse md:grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7 space-y-6 text-center md:text-left">
              {resumoData.tagline && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#3B1E43] border border-[#5A2E65] text-[#FFCC00] rounded-full text-xs font-bold uppercase tracking-wider">
                  {resumoData.tagline}
                </div>
              )}
              <h1 className="text-5xl md:text-6xl font-['Bukra'] font-black text-white leading-tight">
                {resumoData.title}
              </h1>
              <p className="text-lg text-[#A0A0A0] max-w-xl mx-auto md:mx-0">
                {resumoData.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                {resumoData.button1_text && (
                  <a href={resumoData.button1_url} target="_blank" rel="noreferrer" className="bg-[#FFCC00] text-[#121212] px-8 py-3 rounded-md text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#e6b800] transition-colors">
                    {resumoData.button1_text}
                  </a>
                )}
                {resumoData.button2_text && (
                  <a href={resumoData.button2_url} target="_blank" rel="noreferrer" className="bg-[#1E1E1E] border border-[#FFCC00] text-white px-8 py-3 rounded-md text-sm font-bold flex items-center justify-center gap-2 hover:border-[#3B1E43] hover:bg-[#3B1E43]/50 transition-colors">
                    {resumoData.button2_text}
                  </a>
                )}
              </div>
            </div>
            <div className="md:col-span-5 relative group w-full max-w-[300px] md:max-w-none mx-auto">
              <div className="absolute -inset-4 bg-[#FFCC00]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="aspect-square bg-[#1E1E1E] border border-[#FFCC00] rounded-2xl overflow-hidden p-2 transform md:rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  className="w-full h-full object-cover rounded-xl saturate-[0.7] hover:saturate-100 transition-all duration-700" 
                  alt="Profile Photo" 
                  src={resumoData.profile_image_url || '/perfil.jpeg'} 
                  onError={(e) => {
                    // Fallback to default
                    (e.target as HTMLImageElement).src = '/perfil.jpeg';
                  }}
                />
              </div>
            </div>
          </section>

          {/* Description Block */}
          {resumoData.description && (
            <section className="space-y-6 max-w-3xl">
              <h2 className="text-3xl font-['Bukra'] font-bold text-white border-l-4 border-[#FFCC00] pl-4">Resumo Profissional</h2>
              <p className="text-[#A0A0A0] leading-relaxed text-lg whitespace-pre-line">
                {resumoData.description}
              </p>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

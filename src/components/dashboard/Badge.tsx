import React from 'react';

type BadgeType = 'status' | 'prioridade' | 'categoria' | 'responsavel' | 'dimensao';

interface BadgeProps {
  type: BadgeType;
  value: string | null;
}

export function Badge({ type, value }: BadgeProps) {
  if (!value) return <span className="text-gray-500">-</span>;

  const text = value.toLowerCase().trim();
  let colorClass = 'bg-[#2D2D2D] text-[#A0A0A0] border-[#353534]'; // Default dark gray
  
  if (type === 'status') {
    if (text.includes('completa')) colorClass = 'bg-[#0f9d58]/15 text-[#0f9d58] border-[#0f9d58]/30'; // Green
    else if (text.includes('testar')) colorClass = 'bg-[#f4b400]/15 text-[#f4b400] border-[#f4b400]/30'; // Yellow
    else if (text.includes('descartada')) colorClass = 'bg-[#db4437]/15 text-[#db4437] border-[#db4437]/30'; // Red
    else if (text.includes('progresso')) colorClass = 'bg-[#4285f4]/15 text-[#4285f4] border-[#4285f4]/30'; // Blue
    else if (text.includes('iniciada')) colorClass = 'bg-[#E0E0E0]/15 text-[#E0E0E0] border-[#E0E0E0]/30'; // Light Gray
  } 
  else if (type === 'prioridade') {
    if (text === 'baixa') colorClass = 'bg-[#4285f4]/15 text-[#4285f4] border-[#4285f4]/30'; // Blue
    else if (text === 'média' || text === 'media') colorClass = 'bg-[#f4b400]/15 text-[#f4b400] border-[#f4b400]/30'; // Yellow
    else if (text === 'alta') colorClass = 'bg-[#db4437]/15 text-[#db4437] border-[#db4437]/30'; // Red
  }
  else if (type === 'categoria') {
    if (text.includes('programar')) colorClass = 'bg-[#9D4EDD]/15 text-[#9D4EDD] border-[#9D4EDD]/30'; // Purple
    else if (text.includes('pesquisar')) colorClass = 'bg-[#4285f4]/15 text-[#4285f4] border-[#4285f4]/30'; // Blue
    else if (text.includes('touch')) colorClass = 'bg-[#0f9d58]/15 text-[#0f9d58] border-[#0f9d58]/30'; // Green
    else if (text.includes('reunir')) colorClass = 'bg-[#FF8C8C]/15 text-[#FF8C8C] border-[#FF8C8C]/30'; // Salmon/Pink
    else if (text.includes('post')) colorClass = 'bg-[#f4b400]/15 text-[#f4b400] border-[#f4b400]/30'; // Yellow
    else if (text.includes('outros')) colorClass = 'bg-[#E0E0E0]/15 text-[#E0E0E0] border-[#E0E0E0]/30'; // Light Gray
  }
  else if (type === 'responsavel') {
    if (text.includes('andy')) colorClass = 'bg-[#db4437]/15 text-[#db4437] border-[#db4437]/30'; // Red
    else if (text.includes('joão') || text.includes('joao')) colorClass = 'bg-[#9D4EDD]/15 text-[#9D4EDD] border-[#9D4EDD]/30'; // Purple
    else if (text.includes('leo')) colorClass = 'bg-[#0f9d58]/15 text-[#0f9d58] border-[#0f9d58]/30'; // Green
    else if (text.includes('dani')) colorClass = 'bg-[#4285f4]/15 text-[#4285f4] border-[#4285f4]/30'; // Blue
    else if (text.includes('lorenzo')) colorClass = 'bg-[#f4b400]/15 text-[#f4b400] border-[#f4b400]/30'; // Yellow
    else if (text.includes('nacky')) colorClass = 'bg-[#FF8C8C]/15 text-[#FF8C8C] border-[#FF8C8C]/30'; // Pink
  }
  else if (type === 'dimensao') {
    if (text === 'hub') colorClass = 'bg-[#9D4EDD]/15 text-[#9D4EDD] border-[#9D4EDD]/30'; // Purple
    else colorClass = 'bg-[#FFCC00]/15 text-[#FFCC00] border-[#FFCC00]/30'; // Golden for all others
  }

  return (
    <span className={`inline-block max-w-full truncate px-2 py-1 text-[11px] rounded-md font-medium border ${colorClass}`}>
      {value}
    </span>
  );
}

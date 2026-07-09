'use client';

import { useState, useRef, useEffect } from 'react';
import { getBadgeColorClass } from './Badge';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  name: string;
  value: string;
  options: Option[];
  onChange: (e: any) => void;
  type: 'status' | 'prioridade' | 'categoria' | 'responsavel' | 'dimensao';
  disabled?: boolean;
}

export function CustomSelect({ name, value, options, onChange, type, disabled }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const selectedOption = options.find(o => o.value === value);
  const selectedLabel = selectedOption ? selectedOption.label : '';
  
  // Use badge colors for the selected box
  const boxClasses = disabled 
    ? "w-full border rounded-md px-4 py-2 opacity-50 cursor-not-allowed bg-[#121212] border-[#2D2D2D] text-[#8E8E8E]"
    : `w-full border rounded-md px-4 py-2 cursor-pointer focus:outline-none transition-colors flex justify-between items-center ${getBadgeColorClass(type, value)}`;

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        className={boxClasses} 
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span>{selectedLabel || 'Selecione...'}</span>
        <span className="material-symbols-outlined text-[18px]">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-[100] mt-1 w-full bg-[#1A1A1A] border border-[#2D2D2D] rounded-md shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
          {options.map((option) => {
            const itemColorClass = getBadgeColorClass(type, option.value);
            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2 cursor-pointer transition-colors border-l-4 hover:border-l-4 hover:brightness-125 ${itemColorClass}`}
                style={{ borderLeftColor: 'transparent' }} // Let hover do its thing or keep it clean
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

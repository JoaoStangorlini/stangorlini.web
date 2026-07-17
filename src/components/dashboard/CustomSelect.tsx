'use client';

import { useState, useRef, useEffect } from 'react';
import { Badge, getBadgeColorClass } from './Badge';

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
  allowCustom?: boolean;
}

export function CustomSelect({ name, value, options: initialOptions, onChange, type, disabled, allowCustom }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const [localOptions, setLocalOptions] = useState(initialOptions);

  useEffect(() => {
    setLocalOptions(initialOptions);
  }, [initialOptions]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsAddingCustom(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
    setIsAddingCustom(false);
    setCustomValue('');
  };

  const handleCustomSubmit = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    if (!customValue.trim()) return;
    
    // Add to local options so it displays nicely if they open it again
    const newOption = { label: customValue.trim(), value: customValue.trim() };
    if (!localOptions.find(o => o.value === newOption.value)) {
      setLocalOptions([...localOptions, newOption]);
    }
    handleSelect(newOption.value);
  };

  // Allow displaying a custom value even if it's not in the initial options
  let selectedLabel = value || '';
  const selectedOption = localOptions.find(o => o.value === value);
  if (selectedOption) {
    selectedLabel = selectedOption.label;
  }
  
  // Standard input box look
  const boxClasses = disabled 
    ? "w-full border rounded-md px-4 py-2 opacity-50 cursor-not-allowed bg-[#121212] border-[#2D2D2D] text-[#8E8E8E]"
    : "w-full border border-[#2D2D2D] rounded-md px-4 py-2 cursor-pointer focus:outline-none transition-colors flex justify-between items-center bg-[#121212] hover:border-[#FFCC00]";

  return (
    <div className="relative w-full" ref={containerRef}>
      <div 
        className={boxClasses} 
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
            setIsAddingCustom(false);
          }
        }}
      >
        <div>
          {value ? <Badge type={type} value={selectedLabel} /> : <span className="text-[#8E8E8E]">Selecione...</span>}
        </div>
        <span className="material-symbols-outlined text-[18px] text-[#8E8E8E]">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-[100] mt-1 w-full bg-[#1A1A1A] border border-[#2D2D2D] rounded-md shadow-2xl overflow-hidden max-h-60 flex flex-col">
          {isAddingCustom ? (
            <div className="p-3 flex gap-2 border-b border-[#2D2D2D]">
              <input 
                type="text" 
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCustomSubmit();
                  }
                }}
                placeholder="Novo valor..."
                autoFocus
                className="flex-1 bg-[#121212] border border-[#2D2D2D] rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-[#9D4EDD]"
              />
              <button type="button" onClick={() => handleCustomSubmit()} className="bg-[#9D4EDD] text-white rounded px-3 py-1 text-sm font-bold hover:bg-[#8338C7]">
                OK
              </button>
            </div>
          ) : (
            <div className="overflow-y-auto">
              {localOptions.map((option) => {
                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className="px-4 py-2 cursor-pointer transition-colors hover:bg-[#252525] flex items-center"
                  >
                    <Badge type={type} value={option.label} />
                  </div>
                );
              })}
              {allowCustom && (
                <div
                  onClick={() => setIsAddingCustom(true)}
                  className="px-4 py-2 cursor-pointer transition-colors border-t border-[#2D2D2D] text-[#FFCC00] hover:bg-[#252525] font-bold text-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  Adicionar Novo...
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

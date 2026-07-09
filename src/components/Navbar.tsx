'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar({ 
  initialRole, 
  initialTargetHref 
}: { 
  initialRole: 'ADM' | 'LabDiv' | 'Convidado'; 
  initialTargetHref: string; 
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Removido o useEffect pesado de auth no client-side.
  // O Next.js Server Components injeta as props diretamente na renderização.
  const userRole = initialRole;
  const targetHref = initialTargetHref;

  const navLinks = [
    { name: 'Resumo', href: '/' },
    { name: 'Fotografia', href: '/galeria' },
    { name: 'Currículo', href: '/curriculo' },
    { name: 'Tarefas', href: '/labdiv' },
    { name: 'Servidor', href: '/servidor' },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    router.replace(`${pathname}?q=${encodeURIComponent(val)}`, { scroll: false });
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-[#121212]/80 backdrop-blur-xl border-b border-[#2D2D2D] shrink-0">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto w-full gap-4">
        
        {/* Left: Logo and Mobile Menu Button */}
        <div className="flex justify-start items-center gap-4">
          <button 
            className="md:hidden text-white flex items-center justify-center" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
          <Link href="/" className="text-xl font-['Bukra'] font-black tracking-tighter text-[#FFCC00]">
            stangorlini.web
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex justify-center gap-4 lg:gap-8 items-center flex-1 mx-4">
          {navLinks.map(link => {
            const isActive = pathname === link.href || (pathname === '/' && link.href === '/');
            return (
              <Link 
                key={link.name}
                href={link.href}
                className={`font-medium transition-colors ${
                  isActive 
                    ? 'text-[#9D4EDD] font-bold border-b-[3px] border-[#FFCC00] pb-1' 
                    : 'text-[#A0A0A0] hover:text-[#9D4EDD]'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search & ID */}
        <div className="flex justify-end items-center gap-4">
          <div className="relative hidden lg:block w-[200px]">
            <span className="material-symbols-outlined absolute left-2.5 top-1.5 text-[#8E8E8E] text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Buscar na página..." 
              onChange={handleSearchChange}
              className="w-full bg-[#1A1A1A] border border-[#2D2D2D] rounded-full pl-9 pr-4 py-1 text-sm text-white focus:outline-none focus:border-[#9D4EDD] transition-colors"
            />
          </div>
          
          {/* Mobile Search Icon */}
          <button className="lg:hidden text-[#8E8E8E] flex items-center justify-center">
            <span className="material-symbols-outlined">search</span>
          </button>
          
          <Link 
            href={targetHref}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2D2D2D] bg-[#1A1A1A] hover:border-[#9D4EDD] hover:bg-[#9D4EDD]/10 transition-colors group cursor-pointer shrink-0"
          >
            <div className={`w-2 h-2 rounded-full ${userRole === 'Convidado' ? 'bg-[#8E8E8E]' : userRole === 'ADM' ? 'bg-[#FFCC00]' : 'bg-[#9D4EDD]'}`}></div>
            <span className="text-[10px] md:text-[11px] font-bold text-[#A0A0A0] group-hover:text-white uppercase tracking-wider truncate max-w-[80px] md:max-w-none">
              ID: {userRole}
            </span>
          </Link>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#121212]/95 backdrop-blur-xl border-b border-[#2D2D2D] px-6 py-4 flex flex-col gap-6 absolute w-full left-0 top-full shadow-2xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map(link => {
              const isActive = pathname === link.href || (pathname === '/' && link.href === '/');
              return (
                <Link 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-medium transition-colors text-lg flex items-center justify-between ${
                    isActive 
                      ? 'text-[#9D4EDD] font-bold' 
                      : 'text-[#A0A0A0] hover:text-[#9D4EDD]'
                  }`}
                >
                  {link.name}
                  {isActive && <span className="material-symbols-outlined text-[#9D4EDD]">chevron_right</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}

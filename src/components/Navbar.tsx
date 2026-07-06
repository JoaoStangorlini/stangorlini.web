/*
 * Este programa é um software livre; você pode redistribuí-lo e/ou 
 * modificá-lo sob os termos da Licença Pública Geral GNU Affero (AGPLv3).
 */
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-cosmic-surface border-b border-cosmic-surface-hover px-6 py-4 flex items-center justify-between z-50 relative">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="font-bold text-xl text-cosmic-accent cursor-pointer">Hub Pessoal</h1>
        </Link>
        
        <div className="hidden md:flex gap-6 items-center">
          
          {/* LabDiv Dropdown */}
          <div className="group relative">
            <button className="text-cosmic-text hover:text-cosmic-accent transition-colors py-2">
              LabDiv ▾
            </button>
            <div className="absolute left-0 top-full mt-1 w-48 bg-cosmic-surface border border-cosmic-surface-hover rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden">
              <a href="https://www.notion.so/32b4f396a86b80d690a6de0902328039?v=32b4f396a86b80feb2c7000c33e2eb5f" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-cosmic-surface-hover text-sm">📄 Notion</a>
              <a href="https://drive.google.com/drive/folders/1qLRWEIV2Wv2FpcLEFednjsN4BS9zSBQp" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-cosmic-surface-hover text-sm">📁 Drive</a>
              <a href="https://supabase.com/dashboard/org/xbzbvfbzfqoeyvrfkvka" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-cosmic-surface-hover text-sm">⚡ Supabase</a>
              <a href="https://discord.gg/cTGnFWdk" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-cosmic-surface-hover text-sm">💬 Discord</a>
            </div>
          </div>

          {/* Profissional Dropdown */}
          <div className="group relative">
            <button className="text-cosmic-text hover:text-cosmic-accent transition-colors py-2">
              Profissional ▾
            </button>
            <div className="absolute left-0 top-full mt-1 w-48 bg-cosmic-surface border border-cosmic-surface-hover rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden">
              <Link href="/curriculo" className="px-4 py-3 hover:bg-cosmic-surface-hover text-sm">🎓 Currículo</Link>
              <a href="https://github.com/JoaoStangorlini" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-cosmic-surface-hover text-sm">💻 GitHub</a>
              <Link href="/galeria" className="px-4 py-3 hover:bg-cosmic-surface-hover text-sm">📸 Fotografia</Link>
            </div>
          </div>

          {/* Pessoal Dropdown */}
          <div className="group relative">
            <button className="text-cosmic-text hover:text-cosmic-accent transition-colors py-2">
              Pessoal ▾
            </button>
            <div className="absolute left-0 top-full mt-1 w-48 bg-cosmic-surface border border-cosmic-surface-hover rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden">
              <a href="https://calendar.app.google/tELr1q8ky4G98EL58" target="_blank" rel="noopener noreferrer" className="px-4 py-3 hover:bg-cosmic-surface-hover text-sm">🗓️ Agendar Horário</a>
            </div>
          </div>

          {/* ADM Dropdown */}
          <div className="group relative">
            <button className="text-cosmic-text hover:text-cosmic-accent transition-colors py-2 font-bold">
              ADM ▾
            </button>
            <div className="absolute left-0 top-full mt-1 w-48 bg-cosmic-surface border border-cosmic-surface-hover rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden">
              <Link href="/tarefas" className="px-4 py-3 hover:bg-cosmic-surface-hover text-sm text-cosmic-accent">Gerenciar Tarefas</Link>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}

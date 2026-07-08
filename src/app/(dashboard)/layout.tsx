import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-[#121212] text-[#e5e2e1] font-['Inter'] overflow-hidden">
      {/* Sidebar - Notion Style */}
      <aside className="w-64 bg-[#1A1A1A] border-r border-[#2D2D2D] flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6">
            <Link href="/" className="text-2xl font-['Bukra'] font-black tracking-widest text-white block mb-1">
              STANGORLINI.<span className="text-[#FFCC00]">WEB</span>
            </Link>
            <p className="text-[10px] text-[#8E8E8E] uppercase tracking-widest mt-2">Painel de Gerenciamento</p>
          </div>
          
          <nav className="px-3 space-y-1">
            <div className="text-[11px] font-semibold text-[#8E8E8E] uppercase tracking-wider mb-2 px-3 mt-4">Navegação</div>
            <Link href="/labdiv" className="flex items-center gap-3 px-3 py-2 text-sm text-[#e5e2e1] rounded-md hover:bg-[#252525] transition-colors border-l-2 border-transparent hover:border-[#FFCC00]">
              <span className="material-symbols-outlined text-[20px]">science</span>
              LabDiv Tasks
            </Link>
            <Link href="/servidor" className="flex items-center gap-3 px-3 py-2 text-sm text-[#e5e2e1] rounded-md hover:bg-[#252525] transition-colors border-l-2 border-transparent hover:border-[#FFCC00]">
              <span className="material-symbols-outlined text-[20px]">dns</span>
              Servidor Geral
            </Link>
            
            <div className="text-[11px] font-semibold text-[#8E8E8E] uppercase tracking-wider mb-2 px-3 mt-8">Links Rápidos</div>
            <a href="https://www.notion.so/32b4f396a86b80d690a6de0902328039?v=32b4f396a86b80feb2c7000c33e2eb5f&source=copy_link" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-[#A0A0A0] hover:text-[#e5e2e1] rounded-md hover:bg-[#252525] transition-colors">
              <span className="material-symbols-outlined text-[20px]">description</span> Notion
            </a>
            <a href="https://drive.google.com/drive/folders/1qLRWEIV2Wv2FpcLEFednjsN4BS9zSBQp?usp=sharing" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-[#A0A0A0] hover:text-[#e5e2e1] rounded-md hover:bg-[#252525] transition-colors">
              <span className="material-symbols-outlined text-[20px]">folder</span> Google Drive
            </a>
            <a href="https://discord.gg/cTGnFWdk" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-[#A0A0A0] hover:text-[#e5e2e1] rounded-md hover:bg-[#252525] transition-colors">
              <span className="material-symbols-outlined text-[20px]">chat</span> Discord
            </a>
            <a href="https://clarity.microsoft.com/projects/view/vygiuv03xb/dashboard" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-[#A0A0A0] hover:text-[#e5e2e1] rounded-md hover:bg-[#252525] transition-colors">
              <span className="material-symbols-outlined text-[20px]">analytics</span> MS Clarity
            </a>
            <a href="https://supabase.com/dashboard/org/xbzbvfbzfqoeyvrfkvka" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-[#A0A0A0] hover:text-[#e5e2e1] rounded-md hover:bg-[#252525] transition-colors">
              <span className="material-symbols-outlined text-[20px]">database</span> Supabase
            </a>
            <a href="https://console.cloudinary.com/app/c-5b90f557bc9fa28800ea47fc65416f/home/dashboard" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-[#A0A0A0] hover:text-[#e5e2e1] rounded-md hover:bg-[#252525] transition-colors">
              <span className="material-symbols-outlined text-[20px]">cloud</span> Cloudinary
            </a>
            <a href="https://hub-labdiv-testes.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-[#A0A0A0] hover:text-[#e5e2e1] rounded-md hover:bg-[#252525] transition-colors">
              <span className="material-symbols-outlined text-[20px]">bug_report</span> Vercel Testes
            </a>
            <a href="https://www.canvacom.com/design/DAG-gWpQpig/Y8F_g_ZoabHOcxL7yszv7w/edit" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-[#A0A0A0] hover:text-[#e5e2e1] rounded-md hover:bg-[#252525] transition-colors">
              <span className="material-symbols-outlined text-[20px]">brush</span> Canva IDV
            </a>
          </nav>
        </div>
        
        <div className="p-4 border-t border-[#2D2D2D]">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm text-[#A0A0A0] hover:text-[#e5e2e1] rounded-md hover:bg-[#252525] transition-colors">
            <span className="material-symbols-outlined text-[20px]">logout</span> Voltar p/ Portfólio
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {children}
      </main>
    </div>
  );
}

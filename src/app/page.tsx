import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="font-['Open_Sans'] relative h-full overflow-y-auto bg-[#121212] text-[#F5F5F5]">
      
      {/* Background Decorators */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#3B1E43] blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#3B1E43] blur-[150px]"></div>
      </div>
      
      
      <main className="pb-24 px-6 max-w-7xl mx-auto space-y-32 relative z-10 pt-10">
        
        {/* Hero Section */}
        <section className="flex flex-col-reverse md:grid md:grid-cols-12 gap-12 items-center" id="about">
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#3B1E43] border border-[#5A2E65] text-[#FFCC00] rounded-full text-xs font-bold uppercase tracking-wider">
              Fotógrafo & Dev & Físico
            </div>
            <h1 className="text-5xl md:text-6xl font-['Bukra'] font-black text-white leading-tight">
              JOÃO PAULO <br />
              <span className="text-[#FFCC00]">STANGORLINI</span>
            </h1>
            <p className="text-lg text-[#A0A0A0] max-w-xl mx-auto md:mx-0">
              Focando em pesquisa científica, desenvolvimento full-stack e organização acadêmica através do HUB Pessoal e plataformas LabDiv.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <a href="https://calendar.app.google/tELr1q8ky4G98EL58" target="_blank" rel="noreferrer" className="bg-[#FFCC00] text-[#121212] px-8 py-3 rounded-md text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#e6b800] transition-colors">
                Agendar Reunião
              </a>
              <a href="https://github.com/JoaoStangorlini" target="_blank" rel="noreferrer" className="bg-[#1E1E1E] border border-[#FFCC00] text-white px-8 py-3 rounded-md text-sm font-bold flex items-center justify-center gap-2 hover:border-[#3B1E43] hover:bg-[#3B1E43]/50 transition-colors">
                Ver GitHub
              </a>
            </div>
          </div>
          <div className="md:col-span-5 relative group w-full max-w-[300px] md:max-w-none mx-auto">
            <div className="absolute -inset-4 bg-[#FFCC00]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="aspect-square bg-[#1E1E1E] border border-[#FFCC00] rounded-2xl overflow-hidden p-2 transform md:rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                className="w-full h-full object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700" 
                alt="Profile" 
                src="/hero.jpg" 
              />
            </div>
          </div>
        </section>
        
        {/* Featured Projects / Bento Grid */}
        <section className="space-y-12" id="projects">
          <div>
            <h2 className="text-3xl font-['Bukra'] font-bold text-white">Portfólio de Software & Design</h2>
            <p className="text-[#A0A0A0] mt-2">Sistemas, interfaces e soluções criadas como Desenvolvedor e Designer.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* O Grande Card com borda gradiente */}
            <div className="md:col-span-12 rounded-2xl p-[2px] bg-gradient-to-r from-[#F14343] via-[#FFCC00] to-[#0F4780]">
              <div className="bg-[#1E1E1E] rounded-[14px] h-full flex flex-col overflow-hidden">
                
                {/* Título do Card */}
                <div className="p-8 pb-4 md:pb-8 border-b border-[#2D2D2D] text-center md:text-left flex items-center justify-center md:justify-start">
                  <h2 className="text-3xl font-['Bukra'] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F14343] via-[#FFCC00] to-[#0F4780]">
                    HUB LabDiv
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2D2D2D] flex-1">
                  
                  <a href="https://hub-lab-div.vercel.app" target="_blank" rel="noreferrer" className="p-8 flex flex-col justify-between min-h-[320px] group hover:bg-[#252525] transition-colors relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F14343]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="space-y-4 relative z-10">
                      <h3 className="text-2xl font-['Bukra'] font-bold text-white">O HUB</h3>
                      <p className="text-[#A0A0A0] font-medium">Acesse o HUB de comunicação cientifica do IFUSP.</p>
                    </div>
                    <div className="mt-8 border-t border-[#2D2D2D] group-hover:border-[#F14343]/50 pt-4 flex justify-between items-center text-[#F14343] font-bold transition-colors relative z-10">
                      Acessar Plataforma
                      <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                  </a>

                <a href="https://hub-lab-div.vercel.app/apresentacao" target="_blank" rel="noreferrer" className="p-8 flex flex-col justify-between min-h-[320px] group hover:bg-[#252525] transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FFCC00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="space-y-4 relative z-10">
                    <h3 className="text-2xl font-['Bukra'] font-bold text-white">Apresentação</h3>
                    <p className="text-[#A0A0A0] font-medium">Veja a apresentação do projeto, conheça mais sobre a plataforma e como implementar ela em seu instituto.</p>
                  </div>
                  <div className="mt-8 border-t border-[#2D2D2D] group-hover:border-[#FFCC00]/50 pt-4 flex justify-between items-center text-[#FFCC00] font-bold transition-colors relative z-10">
                    Ver Apresentação
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </a>

                <a href="https://hub-lab-div.vercel.app/labdiv" target="_blank" rel="noreferrer" className="p-8 flex flex-col justify-between min-h-[320px] group hover:bg-[#252525] transition-colors relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0F4780]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="space-y-4 relative z-10">
                    <h3 className="text-2xl font-['Bukra'] font-bold text-white">Página do LabDiv</h3>
                    <p className="text-[#A0A0A0] font-medium">Conheça mais sobre o Laboratorio de Expressao e Divulgacao do IFUSP.</p>
                  </div>
                  <div className="mt-8 border-t border-[#2D2D2D] group-hover:border-[#0F4780]/50 pt-4 flex justify-between items-center text-[#5fa8ff] font-bold transition-colors relative z-10">
                    Conhecer o LabDiv
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </a>
                
                </div> {/* fecha o grid */}
              </div> {/* fecha o flex flex-col */}
            </div> {/* fecha o card gradient */}

            <div className="md:col-span-12 bg-[#121212] border border-[#FFCC00] p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center min-h-[150px] hover:border-[#F5F5F5] transition-colors gap-6">
              <div className="space-y-2 text-center md:text-left">
                <h3 className="text-xl font-['Bukra'] font-bold text-white">Projetos & Código Fonte (GitHub)</h3>
                <p className="text-[#A0A0A0] max-w-2xl">Explore meus repositórios, códigos abertos e o histórico de commits dos projetos em andamento.</p>
              </div>
              <a href="https://github.com/JoaoStangorlini" target="_blank" rel="noreferrer" className="shrink-0 px-8 py-3 bg-[#F5F5F5] border border-[#FFCC00] text-[#121212] text-sm font-bold rounded-md hover:bg-[#D4D4D4] transition-colors flex items-center gap-2">
                Acessar GitHub
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="space-y-12" id="gallery">
          <div>
            <h2 className="text-3xl font-['Bukra'] font-bold text-white">Portfólio de Fotografias</h2>
            <p className="text-[#A0A0A0] mt-2">Registros profissionais, eventos e ensaios fotográficos.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/galeria" className="aspect-square bg-[#1E1E1E] border border-[#FFCC00] rounded-xl overflow-hidden hover:border-[#3B1E43] transition-all group block">
              <img src="/galeria1.jpg" alt="Galeria 1" className="w-full h-full object-cover transition-all duration-500" />
            </Link>
            <Link href="/galeria" className="aspect-square bg-[#1E1E1E] border border-[#FFCC00] rounded-xl overflow-hidden hover:border-[#3B1E43] transition-all group block">
              <img src="/galeria2.jpg" alt="Galeria 2" className="w-full h-full object-cover transition-all duration-500" />
            </Link>
            <Link href="/galeria" className="aspect-square bg-[#1E1E1E] border border-[#FFCC00] rounded-xl overflow-hidden hover:border-[#3B1E43] transition-all group block">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXnwq7H7F6pHq6hll9SKv-E9uqH1KA0qixi_lmBd-_Q&s=10" alt="Galeria 3" className="w-full h-full object-cover transition-all duration-500" />
            </Link>
            <Link href="/galeria" className="aspect-square bg-[#1E1E1E] border border-[#FFCC00] rounded-xl overflow-hidden hover:border-[#3B1E43] transition-all group block">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc9QM4zJd-GuLxWzGiKHLJmzEhFfnmOPxB3pOkhO127siK2SCw4LsNlAI&s=10" alt="Galeria 4" className="w-full h-full object-cover transition-all duration-500" />
            </Link>
          </div>
          <div className="pt-4 flex justify-center">
            <Link href="/galeria" className="px-8 py-3 bg-[#1E1E1E] border border-[#FFCC00] text-white text-sm font-bold rounded-md hover:bg-[#3B1E43] hover:border-[#5A2E65] transition-colors">
              Ver Portfólio Completo
            </Link>
          </div>
        </section>

        {/* Vida Acadêmica */}
        <section className="space-y-12" id="academic">
          <div>
            <h2 className="text-3xl font-['Bukra'] font-bold text-white">Vida Acadêmica</h2>
            <p className="text-[#A0A0A0] mt-2">Materiais de estudo, projetos de pesquisa, docência e estágios.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1E1E1E] border border-[#FFCC00] p-8 rounded-2xl flex flex-col justify-between min-h-[200px] hover:border-[#3B1E43] transition-colors gap-6 group">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-[#3B1E43] text-white rounded-full flex items-center justify-center mb-6">
                  <span className="font-bold text-xl">📚</span>
                </div>
                <h3 className="text-xl font-['Bukra'] font-bold text-white">Acervo Acadêmico (Drive)</h3>
                <p className="text-[#A0A0A0]">Pasta da graduação contendo livros, artigos e materiais de pesquisa estruturados para consulta rápida.</p>
              </div>
              <a href="https://drive.google.com/drive/folders/1RoiZANniDllDSuJiDkgoZLuRVGetej7b?usp=drive_link" target="_blank" rel="noreferrer" className="inline-flex w-max px-8 py-3 bg-[#3B1E43] text-white text-sm font-bold rounded-md hover:bg-[#5A2E65] transition-colors items-center gap-2">
                Acessar Drive
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            <div className="bg-[#1E1E1E] border border-[#FFCC00] p-8 rounded-2xl flex flex-col justify-between min-h-[200px] hover:border-[#0F4780] transition-colors gap-6 group">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-[#0F4780] text-white rounded-full flex items-center justify-center mb-6">
                  <span className="font-bold text-xl">🔬</span>
                </div>
                <h3 className="text-xl font-['Bukra'] font-bold text-white">Projetos de Pesquisa & Docência</h3>
                <p className="text-[#A0A0A0]">Trabalhos de iniciação científica, estágios e auxílio à docência desenvolvidos ao longo do curso.</p>
              </div>
              <Link href="/curriculo" className="inline-flex w-max px-8 py-3 bg-[#0F4780] text-white text-sm font-bold rounded-md hover:bg-[#0a3563] transition-colors items-center gap-2">
                Ver Detalhes no Currículo
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Footer / Links */}
        <section className="pt-12 border-t border-[#2D2D2D] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card de Agendar Reunião */}
            <div className="bg-[#1E1E1E] p-8 md:p-10 rounded-2xl flex flex-col justify-between border border-[#FFCC00] transition-colors group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#FFCC00] text-[#121212] rounded-full flex items-center justify-center mb-6">
                  <span className="font-bold text-xl">📅</span>
                </div>
                <h3 className="text-2xl font-['Bukra'] font-bold text-white">Agendar Reunião</h3>
                <p className="text-[#A0A0A0]">Marque um horário diretamente na minha agenda para conversarmos sobre novos projetos ou oportunidades.</p>
              </div>
              <div className="mt-8">
                <a href="https://calendar.app.google/tELr1q8ky4G98EL58" target="_blank" rel="noreferrer" className="inline-flex px-8 py-3 bg-[#FFCC00] text-[#121212] text-sm font-bold rounded-md hover:bg-[#e6b800] transition-colors items-center gap-2">
                  Ver Calendário
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>

            {/* Card de Currículo */}
            <div className="bg-[#1E1E1E] p-8 md:p-10 rounded-2xl flex flex-col justify-between border border-[#FFCC00] hover:border-[#9D4EDD] transition-colors group">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#9D4EDD] text-white rounded-full flex items-center justify-center mb-6">
                  <span className="font-bold text-xl">📄</span>
                </div>
                <h3 className="text-2xl font-['Bukra'] font-bold text-white">Currículo Resumido</h3>
                <p className="text-[#A0A0A0]">Estudante de Física (USP) com experiência prática em desenvolvimento web (PWA), design, infraestrutura de hardware, e mediação de tecnologias imersivas (VR/AR) no Inova USP e Parque CienTec.</p>
              </div>
              <div className="mt-8">
                <Link href="/curriculo" className="inline-flex px-8 py-3 bg-[#9D4EDD] text-white text-sm font-bold rounded-md hover:bg-[#7B2CBF] transition-colors items-center gap-2">
                  Ver Currículo Completo
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-[#121212] p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-[#FFCC00]">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-['Bukra'] font-bold text-white">Pronto para colaboração?</h2>
              <p className="text-[#A0A0A0] mt-2 max-w-xl">Disponível para projetos, parcerias e contratações como Fotógrafo, Desenvolvedor Full-Stack, Professor ou Designer.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-wrap justify-center">
              <a href="https://wa.me/55119678401823?text=Ol%C3%A1%20Jo%C3%A3o%2C%20vim%20pelo%20seu%20site%20e%20gostaria%20de%20conversar%20sobre%20uma%20colabora%C3%A7%C3%A3o!" target="_blank" rel="noreferrer" className="bg-[#25D366] text-white py-3 px-8 rounded-md text-sm font-bold text-center hover:bg-[#1ebd5a] transition-colors">
                WHATSAPP
              </a>
              <a href="mailto:joaopaulostangorlini@gmail.com?subject=Contato%20via%20Stangorlini.web" className="bg-[#0F4780] text-white py-3 px-8 rounded-md text-sm font-bold text-center hover:bg-[#0a3563] transition-colors">
                E-MAIL
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

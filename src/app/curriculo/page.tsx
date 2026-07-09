import Link from 'next/link';

export default function CurriculoPage() {
  return (
    <div className="font-['Open_Sans'] h-full overflow-y-auto bg-[#121212] text-[#F5F5F5]">
      
      <main className="pt-10 pb-16 px-6 max-w-4xl mx-auto space-y-16">
        
        {/* Cabeçalho do Currículo */}
        <section className="space-y-6 border-b border-[#2D2D2D] pb-12">
          <div>
            <h1 className="text-5xl font-['Bukra'] font-black text-white leading-tight">João Paulo <span className="text-[#FFCC00]">Stangorlini</span><br/>de Carvalho</h1>
            <p className="text-xl text-[#A0A0A0] mt-4">Estudante de Física (USP) | Desenvolvedor | Fotógrafo | Educador | Designer</p>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[#FFCC00] font-bold">Telefone:</span>
              <a href="tel:+55119678401823" className="hover:text-white transition-colors">(11) 967840-1823</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#FFCC00] font-bold">E-mail:</span>
              <a href="mailto:joaopaulostangorlini@usp.br?subject=Contato%20via%20Stangorlini.web&body=Ol%C3%A1%20Jo%C3%A3o%2C%20vim%20atrav%C3%A9s%20do%20seu%20Curr%C3%ADculo%20no%20site%20Stangorlini.web%20e%20gostaria%20de%20conversar%20sobre..." className="hover:text-white transition-colors">joaopaulostangorlini@usp.br</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#FFCC00] font-bold">Endereço:</span>
              <span>Rua Arthur Soter Lopes da Silva, 88</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#FFCC00] font-bold">GitHub:</span>
              <a href="https://github.com/JoaoStangorlini" target="_blank" rel="noreferrer" className="hover:text-white transition-colors underline">/JoaoStangorlini</a>
            </div>

          </div>
        </section>

        {/* Resumo Profissional */}
        <section className="space-y-6">
          <h2 className="text-3xl font-['Bukra'] font-bold text-white border-l-4 border-[#FFCC00] pl-4">Resumo Profissional</h2>
          <p className="text-[#A0A0A0] leading-relaxed text-lg">
            Estudante de Física no Instituto de Física (USP - Butantã) com perfil voltado à tecnologia e educação. Experiência prática em desenvolvimento Web (PWA), design (web e gráfico), otimização, manutenção e montagem de hardware de alta performance, sala de aula e monitorias em ambientes de difusão científica/inovação. Experiência básica de cálculo e execução de instalações elétricas (residenciais).
          </p>
        </section>

        {/* Experiência Profissional */}
        <section className="space-y-8">
          <h2 className="text-3xl font-['Bukra'] font-bold text-white border-l-4 border-[#3B1E43] pl-4">Experiência Profissional</h2>
          
          <div className="space-y-12">
            <div className="bg-[#1E1E1E] border border-[#2D2D2D] p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Monitor de Inovação e Tecnologias Imersivas <span className="text-[#FFCC00]">| DigiLab (Inova USP)</span></h3>
              <ul className="list-disc list-outside ml-5 text-[#A0A0A0] space-y-3">
                <li><strong className="text-white">Operação e Suporte em VR/AR:</strong> Mediação técnica em experiências de Realidade Virtual e Aumentada.</li>
                <li><strong className="text-white">Troubleshooting em Tempo Real:</strong> Resolução de falhas de hardware e software sob pressão durante eventos.</li>
                <li><strong className="text-white">Estudo de Sistemas Imersivos:</strong> Pesquisa sobre o funcionamento físico e técnico de dispositivos de VR.</li>
                <li><strong className="text-white">Atendimento Bilíngue:</strong> Suporte técnico e conversação em Inglês para visitantes.</li>
                <li><strong className="text-white">RCGI:</strong> Atuação durante o RCGI (Research Centre for Greenhouse Gas and Innovation).</li>
              </ul>
            </div>

            <div className="bg-[#1E1E1E] border border-[#2D2D2D] p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Monitor de Difusão Científica <span className="text-[#FFCC00]">| Parque CienTec – USP</span></h3>
              <ul className="list-disc list-outside ml-5 text-[#A0A0A0] space-y-3">
                <li>Comunicação científica e mediação de experimentos de Física e Astronomia.</li>
                <li>Adaptação de conceitos complexos para diversos níveis de público.</li>
                <li>Desenvolvimento de planos de aulas e planejamento de possíveis novas atividades.</li>
              </ul>
            </div>

            <div className="bg-[#3B1E43]/20 border border-[#5A2E65] p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Projetos Técnicos Autônomos</h3>
              <ul className="list-disc list-outside ml-5 text-[#A0A0A0] space-y-3">
                <li><strong className="text-[#FFCC00]">Instalação elétrica (apt CRUSP):</strong> Dimensionamento de carga, instalação em quadros de proteção e circuitos.</li>
                <li><strong className="text-[#FFCC00]">Montagem e otimização de hardware:</strong> Montagem de desktop de alta performance, configuração e mudança de BIOS, otimização e mudança de SO, automação via Prompts CMD e ajustes avançados de hardware.</li>
                <li><strong className="text-[#FFCC00]">Design:</strong> Projetos em design, identidade visual e cartões de convite.</li>
                <li><strong className="text-[#FFCC00]">Desenvolvimento:</strong> Criação de um PWA utilizando HTML, CSS, JS e SQL.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Formação */}
        <section className="space-y-6">
          <h2 className="text-3xl font-['Bukra'] font-bold text-white border-l-4 border-[#FFCC00] pl-4">Formação</h2>
          <div className="bg-[#1E1E1E] border border-[#2D2D2D] p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-2">Instituto de Física da Universidade de São Paulo (USP)</h3>
            <p className="text-[#FFCC00] font-bold mb-4">2024 - Presente</p>
            <p className="text-white mb-4">Licenciatura em Física (em andamento, previsão de término em 2029)</p>
            <ul className="list-disc list-outside ml-5 text-[#A0A0A0] space-y-3">
              <li><strong>Bolsista PAPFE</strong> (apoio à permanência e formação estudantil).</li>
              <li><strong>Bolsista PUB</strong> (Programa Unificado de Bolsas) – Atuação no parque de Ciências e tecnologia USP Cientec.</li>
              <li><strong>Projetos AEX</strong> (Apoio à Extensão): Atuação no Digital Lab / Inova USP e palestrante no programa "De Volta à Escola | Eu na USP".</li>
            </ul>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Habilidades */}
          <section className="space-y-6">
            <h2 className="text-3xl font-['Bukra'] font-bold text-white border-l-4 border-[#3B1E43] pl-4">Habilidades</h2>
            <ul className="space-y-4 text-[#A0A0A0]">
              <li><strong className="text-white block">Domínio do pacote Adobe</strong> Lightroom, Photoshop, Acrobat, Premiere, After Effects e Illustrator.</li>
              <li><strong className="text-white block">TI e Hardware</strong> Manutenção de hardware/software, otimização de sistemas e redes.</li>
              <li><strong className="text-white block">Programação & Web</strong> HTML, CSS, JS.</li>
              <li><strong className="text-white block">Inteligência Artificial</strong> Utilização, treinamento e funcionamento de LLMs (local ou nuvem).</li>
              <li><strong className="text-white block">Soft Skills</strong> Gerenciamento de crises e Trabalho em equipe multidisciplinar.</li>
              <li><strong className="text-white block">Outros</strong> Cálculo e execução de instalações elétricas, Microsoft 365 (Word, PowerPoint, Excel).</li>
            </ul>
          </section>

          <div className="space-y-12">
            {/* Certificados */}
            <section className="space-y-6">
              <h2 className="text-3xl font-['Bukra'] font-bold text-white border-l-4 border-[#FFCC00] pl-4">Certificados</h2>
              <ul className="list-disc list-inside text-[#A0A0A0] space-y-3">
                <li>Inteligência Artificial (Extensão) – ICMC-USP (2024)</li>
                <li>Proficiência em Inglês (Nível 3 / CEFR) – Open English (2021)</li>
                <li>Galaxy AI Samsung Summit – IME-USP (2024)</li>
                <li>STEAM Day – IPEN (2024)</li>
              </ul>
            </section>

            {/* Idiomas */}
            <section className="space-y-6">
              <h2 className="text-3xl font-['Bukra'] font-bold text-white border-l-4 border-[#3B1E43] pl-4">Idiomas</h2>
              <div className="flex gap-4">
                <span className="px-4 py-2 bg-[#1E1E1E] border border-[#2D2D2D] rounded-full text-sm font-bold text-white">Inglês Fluente</span>
                <span className="px-4 py-2 bg-[#1E1E1E] border border-[#2D2D2D] rounded-full text-sm font-bold text-[#A0A0A0]">Francês Básico</span>
              </div>
            </section>
          </div>
        </div>

      </main>
    </div>
  );
}

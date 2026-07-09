/*
 * Este programa é um software livre; você pode redistribuí-lo e/ou 
 * modificá-lo sob os termos da Licença Pública Geral GNU Affero (AGPLv3).
 */
import Link from 'next/link';

export default function GaleriaPage() {
  return (
    <div className="font-['Open_Sans'] min-h-screen bg-[#121212] text-[#F5F5F5] flex flex-col">
      {/* Main Content with Iframe */}
      <main className="flex-1 w-full relative bg-[#1A1A1A] flex flex-col">
        <div className="flex-1 w-full min-h-[80vh]">
          <script src="https://embedding.pic-time.com/pictures/scripts/compiled/artgalleryembed.js" async></script>
          <iframe 
            frameBorder="0" 
            id="pictimeIntegration" 
            src="https://stangorliniphotography.pic-time.com/client?headless=true" 
            style={{ width: '100%', height: '100%', border: 'none', minHeight: '80vh' }}
            title="Galeria Pic-Time"
            allowFullScreen
          ></iframe>
        </div>
        
        {/* Contato Footer */}
        <div className="bg-[#121212] border-t border-[#2D2D2D] py-12 px-6 shrink-0">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-['Bukra'] font-bold text-white">Gostou do portfólio?</h2>
            <p className="text-[#A0A0A0]">Entre em contato para solicitar orçamentos e agendar ensaios fotográficos.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="https://wa.me/55119678401823?text=Ol%C3%A1%20Jo%C3%A3o%2C%20vi%20seu%20portf%C3%B3lio%20na%20Galeria%20do%20Stangorlini.web%20e%20gostaria%20de%20conversar%20com%20voc%C3%AA!" target="_blank" rel="noreferrer" className="bg-[#25D366] text-white py-3 px-8 rounded-md text-sm font-bold text-center hover:bg-[#1ebd5a] transition-colors flex items-center justify-center gap-2">
                WhatsApp
              </a>
              <a href="mailto:joaopaulostangorlini@gmail.com?subject=Contato%20via%20Stangorlini.web%20(Galeria)&body=Ol%C3%A1%20Jo%C3%A3o%2C%20vi%20seu%20portf%C3%B3lio%20na%20Galeria%20do%20Stangorlini.web%20e%20gostaria%20de%20conversar%20sobre..." className="bg-[#3B1E43] text-white py-3 px-8 rounded-md text-sm font-bold text-center hover:bg-[#5A2E65] transition-colors">
                Contato por E-mail
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

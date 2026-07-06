/*
 * Este programa é um software livre; você pode redistribuí-lo e/ou 
 * modificá-lo sob os termos da Licença Pública Geral GNU Affero (AGPLv3).
 */
export default function GaleriaPage() {
  return (
    <div className="flex-1 flex flex-col w-full h-[calc(100vh-68px)]">
      <div className="w-full bg-cosmic-surface border-b border-cosmic-surface-hover py-4 px-6 flex justify-between items-center shrink-0">
        <h2 className="text-xl font-bold text-cosmic-accent">Portfólio Fotográfico</h2>
        <a 
          href="mailto:joaopaulostangorlini@gmail.com" 
          className="bg-cosmic-surface hover:bg-cosmic-surface-hover text-cosmic-text font-bold py-2 px-6 rounded border border-cosmic-accent transition-colors"
        >
          Entrar em Contato (E-mail)
        </a>
      </div>
      <iframe 
        src="https://stangorliniphotography.pic-time.com/-portiflio/slidesblog/6a1cf17dfd03398d7fddb00d?slideshowview=AAAAANYAAABdtAdQQXgvsHwiv1E6mUSMuiUAaFz7JkxgkxMPtvfv0JMhf8GQnlaaNiCsf9oYGmXGq7VPHE3RyL2-1gnGziP0iVtidPlPKhb4rzJeFOAgYQ" 
        className="w-full flex-1 border-none"
        title="Galeria Pic-Time"
        allowFullScreen
      />
    </div>
  );
}

/*
 * Este programa é um software livre; você pode redistribuí-lo e/ou 
 * modificá-lo sob os termos da Licença Pública Geral GNU Affero (AGPLv3).
 */
export default function CurriculoPage() {
  return (
    <div className="flex-1 flex flex-col items-center bg-cosmic-bg p-6">
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cosmic-accent">Currículo Profissional</h1>
        <a 
          href="/curriculo.pdf" 
          download 
          className="bg-cosmic-surface hover:bg-cosmic-surface-hover text-cosmic-text font-bold py-2 px-6 rounded border border-cosmic-accent transition-colors"
        >
          Baixar PDF
        </a>
      </div>
      <div className="w-full max-w-4xl h-[80vh] bg-white rounded overflow-hidden shadow-lg border border-cosmic-surface">
        <iframe 
          src="/curriculo.pdf" 
          className="w-full h-full" 
          title="Currículo João Stangorlini" 
        />
      </div>
    </div>
  );
}

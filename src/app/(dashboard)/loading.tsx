export default function DashboardLoading() {
  return (
    <div className="h-full flex flex-col p-4 md:p-8 bg-[#121212]">
      <div className="mb-4 md:mb-8 shrink-0">
        <div className="h-8 w-48 bg-[#252525] rounded-md animate-pulse mb-2"></div>
        <div className="h-4 w-64 bg-[#1A1A1A] rounded-md animate-pulse"></div>
      </div>

      <div className="flex-1 overflow-hidden">
        {/* Loading Skeleton da Tabela */}
        <div className="w-full h-full flex flex-col bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg overflow-hidden">
          {/* Header */}
          <div className="h-12 bg-[#252525] border-b border-[#2D2D2D] flex items-center px-4">
            <div className="h-4 w-1/4 bg-[#333333] rounded-md animate-pulse"></div>
          </div>
          
          {/* Linhas */}
          <div className="flex-1 p-4 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 w-full bg-[#252525] rounded-lg animate-pulse flex items-center px-4 gap-4">
                <div className="h-4 w-4 bg-[#333333] rounded-sm"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-[#333333] rounded-md"></div>
                  <div className="h-3 w-1/2 bg-[#2a2a2a] rounded-md"></div>
                </div>
                <div className="h-6 w-24 bg-[#333333] rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

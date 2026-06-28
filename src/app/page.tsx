import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#090a0b] text-zinc-300 flex flex-col lg:flex-row">
      
      {/* LEFT PANE: Static System Deck (Fixed on Desktop) */}
      <aside className="w-full lg:w-[380px] xl:w-[420px] border-b lg:border-b-0 lg:border-r border-zinc-800/80 p-6 lg:p-10 flex flex-col justify-between shrink-0 bg-[#0c0d0e] lg:h-screen lg:sticky lg:top-0">
        
        <div>
          {/* Version Header */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-8">
            <span className="font-mono text-[11px] tracking-widest text-zinc-500 uppercase">
              System // 0x884
            </span>
            <span className="h-2 w-2 bg-blue-600"></span>
          </div>

          {/* Brutalist Stacked Title */}
          <h1 className="text-4xl font-light tracking-tighter text-white uppercase leading-[0.92] mb-6">
            Neural<br />
            Asset<br />
            Decoder.
          </h1>

          <p className="text-xs text-zinc-400 font-mono leading-relaxed mb-8">
            An iterative cognitive loop. Inputs raw market tickers; outputs risk exposure, sentiment analysis, and synthesized allocation verdicts.
          </p>

          {/* Static LangGraph Logic Visualizer */}
          <div className="space-y-2 border-t border-zinc-800/80 pt-6 font-mono text-[11px]">
            <div className="text-zinc-500 mb-3 text-[10px] tracking-wider uppercase">
              Execution Pipeline:
            </div>
            
            <div className="flex items-center gap-2.5 text-zinc-300">
              <span className="text-blue-500 font-bold">[01]</span>
              <span>Query Expansion & Web Scrape</span>
            </div>
            <div className="pl-3.5 border-l border-zinc-800 ml-2 py-1 text-[10px] text-zinc-600">
              ↓ state passed
            </div>
            
            <div className="flex items-center gap-2.5 text-zinc-300">
              <span className="text-blue-500 font-bold">[02]</span>
              <span>Vector Risk Extraction</span>
            </div>
            <div className="pl-3.5 border-l border-zinc-800 ml-2 py-1 text-[10px] text-zinc-600">
              ↓ state passed
            </div>
            
            <div className="flex items-center gap-2.5 text-zinc-300">
              <span className="text-blue-500 font-bold">[03]</span>
              <span>Verdict Synthesis</span>
            </div>
          </div>
        </div>

        {/* Footer Telemetry */}
        <div className="pt-8 mt-8 border-t border-zinc-800/80 font-mono text-[10px] text-zinc-500 flex justify-between items-center">
          <span>GEMINI-2.5-FLASH</span>
          <span className="text-emerald-500/80 font-semibold">● ENGINE READY</span>
        </div>

      </aside>


      {/* RIGHT PANE: Dynamic Sandbox */}
      <main className="flex-1 flex flex-col min-h-screen bg-[#090a0b]">
        
        {/* Top Sticky Session Bar */}
        <header className="h-12 border-b border-zinc-800/80 px-6 lg:px-10 flex items-center justify-between sticky top-0 bg-[#090a0b]/80 backdrop-blur-md z-20 shrink-0">
          <div className="font-mono text-xs text-zinc-500 flex items-center gap-2">
            <span>TARGET_WORKSPACE</span>
            <span>/</span>
            <span className="text-zinc-200">ACTIVE_SESSION</span>
          </div>
          
          <div className="font-mono text-[11px] text-zinc-500 hidden sm:block">
            MEM_LIMIT: 512MB
          </div>
        </header>

        {/* The Dashboard Injection point */}
        <div className="p-6 lg:p-12 max-w-6xl w-full mx-auto flex-1">
          <Dashboard />
        </div>

      </main>

    </div>
  );
}

import Dashboard from "@/components/Dashboard";

// Institutional live ticker feed simulator
const MARKET_TICKERS = [
  { symbol: "S&P 500", price: "5,460.48", change: "+0.42%", isPos: true },
  { symbol: "NASDAQ", price: "17,689.36", change: "-0.18%", isPos: false },
  { symbol: "NVDA", price: "126.57", change: "+3.12%", isPos: true },
  { symbol: "AAPL", price: "209.14", change: "+0.85%", isPos: true },
  { symbol: "BTC/USD", price: "62,140.00", change: "+1.84%", isPos: true },
  { symbol: "10Y TREASURY", price: "4.28%", change: "-0.03%", isPos: false },
  { symbol: "MSFT", price: "448.37", change: "+1.15%", isPos: true },
  { symbol: "ETH/USD", price: "3,412.50", change: "-0.45%", isPos: false },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-[#070809] text-zinc-300 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* 1. TOP INSTITUTIONAL TICKER TAPE */}
      <div className="h-7 bg-[#0b0c0e] border-b border-zinc-800/80 overflow-hidden flex items-center shrink-0 z-30 select-none">
        <div className="bg-blue-600 px-3 h-full flex items-center font-mono text-[10px] font-bold tracking-widest text-white shrink-0 z-10 shadow-[4px_0_12px_rgba(0,0,0,0.8)]">
          MARKETS
        </div>
        <div className="flex overflow-hidden relative w-full">
          <div className="animate-marquee items-center font-mono text-[11px]">
            {[...MARKET_TICKERS, ...MARKET_TICKERS].map((t, i) => (
              <div key={i} className="flex items-center space-x-2 px-6 border-r border-zinc-800/40 shrink-0">
                <span className="text-zinc-400 font-semibold">{t.symbol}</span>
                <span className="text-zinc-200">{t.price}</span>
                <span className={t.isPos ? "text-emerald-400 font-medium" : "text-rose-400 font-medium"}>
                  {t.isPos ? "▲" : "▼"} {t.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN SPLIT-PANE WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row w-full relative">
        
        {/* LEFT PANE: Command Deck */}
        <aside className="w-full lg:w-[380px] xl:w-[420px] border-b lg:border-b-0 lg:border-r border-zinc-800/80 p-6 lg:p-10 flex flex-col justify-between shrink-0 bg-[#090a0c] relative overflow-hidden lg:h-[calc(100vh-28px)] lg:sticky lg:top-7">
          
          <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

          <div className="relative z-10">
            {/* Telemetry Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="font-mono text-[11px] tracking-widest text-zinc-400 font-medium uppercase">
                  SYSTEM // 0x884
                </span>
              </div>
              <span className="font-mono text-[10px] bg-blue-950/50 text-blue-400 border border-blue-800/50 px-2 py-0.5 rounded tracking-tighter">
                v2.4_QUANT
              </span>
            </div>

            {/* Typography Upgrade: Gradient Title */}
            <h1 className="text-4xl font-extralight tracking-tighter text-white uppercase leading-[0.92] mb-4">
              Neural<br />
              Asset<br />
              <span className="font-normal bg-gradient-to-r from-blue-400 via-indigo-200 to-zinc-500 bg-clip-text text-transparent">
                Decoder.
              </span>
            </h1>

            <p className="text-xs text-zinc-400 font-mono leading-relaxed mb-8 border-l-2 border-blue-600/60 pl-3">
              Autonomous cognitive loop. Scrapes SEC EDGAR & live sentiment, vectorizes downside exposure, and synthesizes institutional verdicts.
            </p>

            {/* Glowing LangGraph Pipeline Nodes */}
            <div className="space-y-2.5 border-t border-zinc-800/80 pt-6 font-mono text-[11px]">
              <div className="text-zinc-500 mb-3 text-[10px] tracking-widest uppercase font-semibold flex justify-between">
                <span>Active Graph Nodes</span>
                <span className="text-blue-500">LANGGRAPH</span>
              </div>
              
              <div className="group flex items-center justify-between p-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/30 hover:border-blue-500/40 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-blue-400 font-bold bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 text-[10px]">01</span>
                  <span className="text-zinc-200">Query Expansion & Scrape</span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors" />
              </div>

              <div className="w-0.5 h-2.5 bg-gradient-to-b from-blue-500/40 to-purple-500/40 ml-5" />
              
              <div className="group flex items-center justify-between p-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/30 hover:border-purple-500/40 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-purple-400 font-bold bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 text-[10px]">02</span>
                  <span className="text-zinc-200">Vector Risk Extraction</span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500/40 group-hover:bg-purple-400 transition-colors" />
              </div>

              <div className="w-0.5 h-2.5 bg-gradient-to-b from-purple-500/40 to-emerald-500/40 ml-5" />
              
              <div className="group flex items-center justify-between p-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/30 hover:border-emerald-500/40 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 text-[10px]">03</span>
                  <span className="text-zinc-200">Verdict Synthesis</span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 transition-colors" />
              </div>
            </div>
          </div>

          {/* Footer Server Diagnostics */}
          <div className="pt-6 mt-8 border-t border-zinc-800/80 font-mono text-[10px] text-zinc-500 flex justify-between items-center relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 font-bold">MODEL</span>
              <span>GEMINI-2.5-FLASH</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 px-2 py-1 rounded text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold tracking-wide">ENGINE ACTIVE</span>
            </div>
          </div>

        </aside>


        {/* RIGHT PANE: Dynamic Research Sandbox */}
        <main className="flex-1 flex flex-col min-h-[calc(100vh-28px)] bg-[#070809] relative">
          
          <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

          {/* Top Sticky Session Bar */}
          <header className="h-12 border-b border-zinc-800/80 px-6 lg:px-10 flex items-center justify-between sticky top-7 bg-[#070809]/80 backdrop-blur-md z-20 shrink-0">
            <div className="font-mono text-xs text-zinc-400 flex items-center gap-2.5">
              <span className="text-blue-500 font-semibold">WORKSPACE</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-200 font-medium tracking-wide">QUANT_ACTIVE_SESSION</span>
            </div>
            
            <div className="font-mono text-[11px] text-zinc-500 flex items-center gap-3">
              <span className="hidden sm:inline text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
                LATENCY: 18ms
              </span>
              <span className="text-emerald-500/80 hidden md:inline">● SECURE_TLS</span>
            </div>
          </header>

          {/* Dashboard Component Injection */}
          <div className="p-6 lg:p-12 max-w-6xl w-full mx-auto flex-1 relative z-10">
            <Dashboard />
          </div>

        </main>

      </div>
    </div>
  );
}
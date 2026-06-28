// Update page.tsx with enhanced header
import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-gray-100 flex flex-col justify-start items-center px-4 py-8 selection:bg-emerald-500/30 selection:text-white relative overflow-x-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <header className="text-center max-w-4xl mx-auto mb-10 relative">
        {/* Badge with glow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 rounded-full text-xs font-mono tracking-wider uppercase mb-5 backdrop-blur-sm relative">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          Autonomous Quant Agent v1.0
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
          AI Investment
          <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Research Hub</span>
        </h1>
        
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Deploy an iterative LangGraph intelligence architecture to research market assets,
          extract risk vectors, and output raw allocation verdicts.
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-700" />
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400/50" />
          </div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-700" />
        </div>
      </header>
      
      <Dashboard />
    </main>
  );
}
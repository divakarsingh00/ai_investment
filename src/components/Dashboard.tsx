// Dashboard.tsx
"use client";

import React, { useState } from "react";
import ResearchForm from "./ResearchForm";
import ResultsDisplay from "./ResultsDisplay";
import { AgentState } from "@/types/agent";
import { Terminal, Sparkles, Activity, Zap } from "lucide-react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [result, setResult] = useState<AgentState | null>(null);
  const [progress, setProgress] = useState(0);

  const runResearch = async (companyName: string) => {
    setLoading(true);
    setResult(null);
    setLogs(["🚀 Initializing graph execution state..."]);
    setProgress(10);

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName }),
      });

      if (!response.ok) throw new Error("Agent failed pipeline execution.");

      const data: AgentState = await response.json();
      setLogs(data.logs || []);
      setResult(data);
      setProgress(100);
    } catch (err) {
      setLogs((prev) => [...prev, "❌ Error executing analysis pipeline layout."]);
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 w-full max-w-7xl mx-auto px-4">
      {/* Animated gradient header */}
      <div className="relative">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <ResearchForm onStart={runResearch} loading={loading} />
      </div>

      {/* Progress indicator */}
      {loading && (
        <div className="w-full max-w-2xl mx-auto">
          <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1.5 px-1">
            <span>Initializing</span>
            <span className="text-emerald-400 font-mono">{progress}%</span>
            <span>Complete</span>
          </div>
        </div>
      )}

      {/* Enhanced Agent Logs with better styling */}
      {loading && logs.length > 0 && (
        <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-900/90 to-black/90 border border-gray-800/50 rounded-2xl p-5 font-mono text-xs shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Terminal size={14} className="animate-pulse" />
              <span className="tracking-wider">LIVE AGENT STREAM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[10px] text-gray-500">active</span>
            </div>
          </div>
          
          <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar pr-2">
            {logs.map((log, index) => (
              <div 
                key={index} 
                className="flex items-start gap-2 text-gray-300 hover:text-white transition-colors duration-200"
                style={{ 
                  animation: `fadeInLog 0.3s ease-out forwards`,
                  opacity: 0,
                }}
              >
                <span className="text-emerald-500/50 select-none">▸</span>
                <span className="break-all">{log}</span>
              </div>
            ))}
          </div>

          {/* Terminal cursor animation */}
          <div className="flex items-center gap-1 mt-2 text-emerald-500/50">
            <span className="w-1.5 h-3.5 bg-emerald-400/50 animate-blink" />
            <span className="text-[10px]">processing</span>
          </div>
        </div>
      )}

      {/* Results with enhanced animations */}
      <div className="animate-fade-in-up">
        {result && <ResultsDisplay data={result} />}
      </div>

      <style jsx>{`
        @keyframes fadeInLog {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
}
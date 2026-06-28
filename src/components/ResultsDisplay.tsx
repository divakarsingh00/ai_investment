// ResultsDisplay.tsx
"use client";

import React, { useEffect, useState } from "react";
import { AgentState } from "@/types/agent";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Cpu, 
  BarChart3, 
  Newspaper,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Activity,
  Shield,
  Award,
  Zap
} from "lucide-react";

export default function ResultsDisplay({ data }: { data: AgentState }) {
  const { companyName, ticker, decision, reasoning, financialAnalysis, newsAnalysis } = data;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const decisionConfig = {
    INVEST: {
      icon: TrendingUp,
      label: "Strong Buy",
      color: "emerald",
      gradient: "from-emerald-500 to-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      shadow: "shadow-emerald-500/20",
      badge: "bg-emerald-500/20 text-emerald-400",
    },
    PASS: {
      icon: TrendingDown,
      label: "Avoid",
      color: "rose",
      gradient: "from-rose-500 to-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/30",
      shadow: "shadow-rose-500/20",
      badge: "bg-rose-500/20 text-rose-400",
    },
    HOLD: {
      icon: AlertTriangle,
      label: "Hold",
      color: "amber",
      gradient: "from-amber-500 to-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      shadow: "shadow-amber-500/20",
      badge: "bg-amber-500/20 text-amber-400",
    },
  };

  const config = decisionConfig[decision as keyof typeof decisionConfig] || decisionConfig.HOLD;

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Main card with gradient border */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 via-blue-500/30 to-purple-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-900/95 to-black border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
          {/* Decorative header line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />
          
          <div className="p-6 md:p-8">
            {/* Header with asset info */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    {companyName}
                  </h2>
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 font-mono text-sm">
                    {ticker || "N/A"}
                  </span>
                </div>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Activity size={14} className="text-gray-500" />
                  Multi-agent analysis completed
                </p>
              </div>

              {/* Decision badge with animation */}
              <div className={`flex items-center gap-4 px-5 py-3 rounded-2xl ${config.bg} border ${config.border} shadow-lg ${config.shadow} backdrop-blur-sm relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
                <config.icon size={28} className={`text-${config.color}-400 animate-pulse`} />
                <div>
                  <div className="text-xs text-gray-400 font-mono tracking-wider">DECISION</div>
                  <div className={`text-2xl font-bold text-${config.color}-400`}>
                    {config.label}
                  </div>
                </div>
              </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Reasoning panel - spans 2 cols */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600 transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <Cpu size={18} className="text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-lg text-white">Investment Thesis</h3>
                    <span className="ml-auto text-xs text-emerald-400/50 font-mono">⚡ AI Generated</span>
                  </div>
                  <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {reasoning}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-4 text-center hover:border-gray-600 transition-colors">
                    <div className="text-xs text-gray-500 font-mono tracking-wider">STATUS</div>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <CheckCircle2 size={16} className="text-emerald-400" />
                      <span className="text-white font-semibold">Complete</span>
                    </div>
                  </div>
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-4 text-center hover:border-gray-600 transition-colors">
                    <div className="text-xs text-gray-500 font-mono tracking-wider">CONFIDENCE</div>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <Shield size={16} className="text-blue-400" />
                      <span className="text-white font-semibold">High</span>
                    </div>
                  </div>
                  <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-4 text-center hover:border-gray-600 transition-colors">
                    <div className="text-xs text-gray-500 font-mono tracking-wider">AGENTS</div>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <Zap size={16} className="text-purple-400" />
                      <span className="text-white font-semibold">4x</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side panel - Analysis cards */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-950/30 to-gray-900/30 border border-blue-800/30 rounded-2xl p-5 hover:border-blue-700/50 transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <BarChart3 size={16} className="text-blue-400" />
                    </div>
                    <h4 className="font-medium text-white text-sm">Fundamental Analysis</h4>
                  </div>
                  <div className="text-gray-400 text-xs leading-relaxed whitespace-pre-wrap">
                    {financialAnalysis}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-950/30 to-gray-900/30 border border-purple-800/30 rounded-2xl p-5 hover:border-purple-700/50 transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <Newspaper size={16} className="text-purple-400" />
                    </div>
                    <h4 className="font-medium text-white text-sm">Sentiment Review</h4>
                  </div>
                  <div className="text-gray-400 text-xs leading-relaxed whitespace-pre-wrap">
                    {newsAnalysis}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-800/50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Award size={14} className="text-emerald-400/50" />
                  LangGraph v1.0
                </span>
                <span className="w-px h-4 bg-gray-700" />
                <span>Gemini 2.5 Flash</span>
                <span className="w-px h-4 bg-gray-700" />
                <span>Tavily Search</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-gray-600 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 animate-pulse" />
                <span>live analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
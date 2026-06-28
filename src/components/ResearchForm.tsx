// ResearchForm.tsx
"use client";

import React, { useState } from "react";
import { Search, Loader2, Sparkles, ArrowRight } from "lucide-react";

interface ResearchFormProps {
  onStart: (company: string) => void;
  loading: boolean;
}

export default function ResearchForm({ onStart, loading }: ResearchFormProps) {
  const [company, setCompany] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim()) return;
    onStart(company);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        {/* Glow effect */}
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md ${
          isFocused ? "opacity-100" : ""
        }`} />
        
        <div className="relative bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:border-gray-700">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="flex items-center gap-3 px-5 py-3">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
              <Search size={20} className="group-hover:scale-110 transition-transform duration-300" />
            </div>
            
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter company name (e.g. Nvidia, Apple, Stripe)..."
              disabled={loading}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-lg py-2.5 min-w-0"
            />
            
            <button
              type="submit"
              disabled={loading || !company.trim()}
              className="relative px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-300 flex items-center gap-2 whitespace-nowrap group/btn overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Analyzing</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} className="group-hover/btn:rotate-12 transition-transform" />
                  <span>Run Intelligence</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Quick suggestions */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
        <span className="text-xs text-gray-500 mr-1">Try:</span>
        {["Nvidia", "Apple", "Tesla", "Microsoft", "Google"].map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => setCompany(suggestion)}
            disabled={loading}
            className="px-3 py-1 text-xs bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-full border border-gray-700/50 hover:border-gray-600 transition-all duration-200 disabled:opacity-50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </form>
  );
}
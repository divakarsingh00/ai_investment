# Investment-Agent
🤖 AI Investment Agent
An intelligent investment research and analysis agent powered by LangChain, Google Generative AI, and Tavily Search API. Built with Next.js for a modern, responsive web interface.

📋 Overview
The AI Investment Agent is a sophisticated financial analysis tool that leverages multiple AI technologies to provide comprehensive investment research, market analysis, and data-driven insights. The agent combines the reasoning capabilities of Google's Generative AI with real-time web search through Tavily API, orchestrated via LangChain and LangGraph for complex, multi-step investment analysis workflows.

What It Does
Real-time Market Research: Searches the web for latest financial news, company reports, and market trends using Tavily API
Intelligent Analysis: Processes and synthesizes financial information using Google's Gemini AI models
Conversational Interface: Natural language interaction for investment queries and research requests
Multi-step Reasoning: LangGraph enables complex analysis chains that can research, analyze, and summarize investment opportunities
Data Aggregation: Combines information from multiple sources to provide comprehensive investment insights
✨ Features
🔍 Web-Powered Research: Tavily API integration for real-time financial data and news search
🧠 AI-Powered Analysis: Google Generative AI (Gemini) for deep financial analysis and reasoning
🔗 LangChain Orchestration: Sophisticated chain management for complex analysis workflows
📊 Graph-Based Workflows: LangGraph enables stateful, multi-step agent workflows
💬 Natural Language Interface: Ask investment questions in plain English
⚡ Real-time Processing: Get instant insights from current market data
🎨 Modern UI: Clean, responsive interface built with Next.js and Tailwind CSS
🔒 Type-Safe: Built with TypeScript for reliability and maintainability
🛠️ Tech Stack
Technology	Version	Purpose
Next.js	Latest	React framework for frontend and API routes
LangChain	^1.2.0	LLM orchestration and chain management
LangGraph	^0.4.0	Stateful multi-step agent workflows
Google Generative AI	^2.2.0	Gemini language models for analysis
Tavily API	Latest	Real-time web search and data retrieval
TypeScript	Latest	Type safety and developer experience
Tailwind CSS	Latest	Utility-first CSS framework for styling
PostCSS	Latest	CSS processing with Autoprefixer
📦 Prerequisites
Before you begin, ensure you have installed:

Node.js (v18.0.0 or higher) - Download
npm (v9.0.0 or higher, comes with Node.js)
API Keys (Required):
Google AI API Key - For Gemini AI models
Tavily API Key - For real-time web search
🚀 Getting Started
1. Clone the Repository
git clone <your-repository-url>
cd investment-agent
npm install --legacy-peer-deps
npm install autoprefixer postcss --save-dev --legacy-peer-deps
2. Create a .env.local file in the project root:
# Google Generative AI - REQUIRED
GOOGLE_API_KEY=your_google_ai_api_key_here
# Tavily Search API - REQUIRED
TAVILY_API_KEY=your_tavily_api_key_here

3. Strt development server
npm run dev
import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { searchWeb, fetchFinancials } from "./tools";
import { AgentState } from "@/types/agent";

// Initialize the Gemini Model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite", 
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.1, // Dropped to 0.1 for maximum prompt instruction compliance
});

// Helper: Standard pause function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Smart Wrapper to invoke the model with automatic retries on 429 Rate Limits
 */
async function invokeModelWithRetry(prompt: string, maxRetries = 4, initialDelay = 4000) {
  let currentDelay = initialDelay;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await model.invoke(prompt);
    } catch (error: any) {
      const isRateLimit = error?.status === 429 || String(error).includes("429") || String(error).includes("Quota exceeded");
      
      if (isRateLimit && attempt < maxRetries) {
        console.warn(`⚠️ [Rate Limit] Gemini choked on attempt ${attempt}/${maxRetries}. Backing off for ${currentDelay / 1000}s...`);
        await delay(currentDelay);
        currentDelay *= 2;
        continue;
      }
      throw error;
    }
  }
  throw new Error("Failed to execute model after maximum retries due to rate limiting.");
}

// Define the state schema using the modern LangGraph Annotation system
export const StateAnnotation = Annotation.Root({
  companyName: Annotation<string>({ reducer: (x, y) => y ?? x, default: () => "" }),
  ticker: Annotation<string>({ reducer: (x, y) => y ?? x, default: () => "" }),
  financialData: Annotation<string>({ reducer: (x, y) => y ?? x, default: () => "" }),
  newsData: Annotation<string>({ reducer: (x, y) => y ?? x, default: () => "" }),
  financialAnalysis: Annotation<string>({ reducer: (x, y) => y ?? x, default: () => "" }),
  newsAnalysis: Annotation<string>({ reducer: (x, y) => y ?? x, default: () => "" }),
  decision: Annotation<string>({ reducer: (x, y) => y ?? x, default: () => "" }),
  reasoning: Annotation<string>({ reducer: (x, y) => y ?? x, default: () => "" }),
  logs: Annotation<string[]>({ reducer: (x, y) => x.concat(y), default: () => [] }),
});

// Node 1: Gather primary ticker and web info
async function infoGathererNode(state: typeof StateAnnotation.State) {
  const logs = [...state.logs, "🔍 Information Gatherer: Finding stock ticker and market data..."];
  
  const prompt = `You are a market researcher. Given the company name "${state.companyName}", determine its primary stock ticker symbol. Return ONLY the ticker symbol symbol (e.g., AAPL, TSLA, MSFT). If it's private, return 'PRIVATE'.`;
  
  const response = await invokeModelWithRetry(prompt);
  const rawContent = typeof response.content === "string" ? response.content : "";
  
  // FIX: This must be strictly on a single line to prevent compiler crashes
  const ticker = rawContent.replace(/```[a-z]*|```/g, "").trim().toUpperCase();

  const searchResults = await searchWeb(`${state.companyName} recent business developments and stock news`);

  return { ticker, newsData: searchResults, logs };
}

// Node 2: Analyze structural financial data
async function financialAnalystNode(state: typeof StateAnnotation.State) {
  const logs = [...state.logs, "📊 Financial Analyst: Accessing financial data and statements..."];
  
  let data = "No ticker available.";
  if (state.ticker && state.ticker !== "PRIVATE") {
    data = await fetchFinancials(state.ticker);
  }

  const prompt = `You are a Senior Wall Street Financial Analyst. Analyze the following financial data for ticker "${state.ticker}":
  ${data}
  
  Output EXACTLY 4 to 5 bullet points total evaluating the balance sheet, revenue growth, profit margins, and key risks. Each bullet point must be a single concise sentence. Do NOT write paragraphs, markdown sections, introductory headers, or extra text. Keep it strictly to 4-5 lines total.`;
  
  const response = await invokeModelWithRetry(prompt);
  const financialAnalysis = typeof response.content === "string" ? response.content : "";
  
  return { financialData: data, financialAnalysis, logs };
}

// Node 3: Gauge broader narrative market sentiment
async function newsAnalystNode(state: typeof StateAnnotation.State) {
  const logs = [...state.logs, "📰 Sentiment Analyst: Reading recent news and market sentiment..."];
  
  const prompt = `You are an expert Sentiment Analyst. Review these recent news developments:
  ${state.newsData}
  
  Output EXACTLY 4 to 5 bullet points total summarizing the current market sentiment, product innovations, and competitive execution. Each bullet point must be a single concise sentence. Do NOT write paragraphs, markdown sections, introductory headers, or extra text. Keep it strictly to 4-5 lines total.`;
  
  const response = await invokeModelWithRetry(prompt);
  const newsAnalysis = typeof response.content === "string" ? response.content : "";
  
  return { newsAnalysis, logs };
}

// Node 4: Compile insights and render an investment decision
async function investmentCommitteeNode(state: typeof StateAnnotation.State) {
  const logs = [...state.logs, "🏦 Investment Committee: Deliberating over final decision..."];
  
  const prompt = `You are the Chairperson of an Investment Committee. Render a final definitive decision on whether to invest in ${state.companyName} (${state.ticker}).
  
  Financial Analysis Report:
  ${state.financialAnalysis}
  
  News & Sentiment Report:
  ${state.newsAnalysis}
  
  Return a clean JSON object matching this schema exactly:
  {
    "decision": "INVEST", 
    "reasoning": "A single continuous paragraph containing exactly 4 to 5 concise sentences explaining the final rationale. It must be a flat string on one line, with NO nested bullet points, NO markdown titles, and NO literal newlines."
  }
  Output ONLY the raw JSON object string. Do not wrap it inside markdown code fences.`;

  const response = await invokeModelWithRetry(prompt);
  const contentStr = typeof response.content === "string" ? response.content : JSON.stringify(response.content || {});
  
  // Clean raw wrapper fences if present
  let cleanText = contentStr.replace(/```json|```/gi, "").trim();

  try {
    // Attempt standard JSON parsing
    const parsed = JSON.parse(cleanText);
    return {
      decision: parsed.decision || "HOLD",
      reasoning: parsed.reasoning || "No explicit reasoning provided by the committee.",
      logs: [...logs, "✅ Workflow complete."],
    };
  } catch (error) {
    console.warn("⚠️ JSON.parse choked on string format. Initiating regex extraction fallback...");
    
    // REGEX FALLBACK: Guarantees your UI never crashes even if the AI returns malformed JSON structure
    const decisionMatch = cleanText.match(/"decision"\s*:\s*"([^"]+)"/i);
    const reasoningMatch = cleanText.match(/"reasoning"\s*:\s*"([\s\S]+?)"\s*\}/i) || cleanText.match(/"reasoning"\s*:\s*"([\s\S]+?)"/i);

    const extractedDecision = decisionMatch ? decisionMatch[1].trim() : "HOLD";
    let extractedReasoning = reasoningMatch ? reasoningMatch[1].trim() : "Analysis completed successfully, but output required sanitization.";
    
    // Strip layout artifacts to keep it readable
    extractedReasoning = extractedReasoning.replace(/\\n/g, " ").replace(/\s+/g, " ");

    return {
      decision: extractedDecision,
      reasoning: extractedReasoning,
      logs: [...logs, "✅ Workflow complete (via fallback parser)."],
    };
  }
}

// Construct the StateGraph Workflow
const workflow = new StateGraph<AgentState>(StateAnnotation)
  .addNode("info_gatherer", infoGathererNode)
  .addNode("financial_analyst", financialAnalystNode)
  .addNode("news_analyst", newsAnalystNode)
  .addNode("investment_committee", investmentCommitteeNode)
  
  .addEdge(START, "info_gatherer")
  .addEdge("info_gatherer", "financial_analyst")
  .addEdge("financial_analyst", "news_analyst")
  .addEdge("news_analyst", "investment_committee")
  .addEdge("investment_committee", END);

export const researchAgent = workflow.compile();
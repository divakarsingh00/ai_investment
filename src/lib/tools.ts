/**
 * Utility tools for gathering live market data and searching the web.
 */

export async function searchWeb(query: string): Promise<string> {
  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.TAVILY_API_KEY,
        query: query,
        search_depth: "advanced",
        max_results: 5,
      }),
    });
    const data = await response.json();
    return JSON.stringify(data.results || data);
  } catch (error) {
    console.error("Error fetching from Tavily:", error);
    return `Fallback: Search failed for query: ${query}`;
  }
}

export async function fetchFinancials(ticker: string): Promise<string> {
  // If an FMP API key is present, use it; otherwise, fall back to a structured web search tool
  if (process.env.FMP_API_KEY) {
    try {
      const res = await fetch(
        `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${process.env.FMP_API_KEY}`
      );
      const data = await res.json();
      return JSON.stringify(data);
    } catch (e) {
      console.error(e);
    }
  }
  
  // High-signal search fallback if specialized API isn't present
  return await searchWeb(`${ticker} stock fundamental metrics balance sheet income statement revenue growth profit margins`);
}
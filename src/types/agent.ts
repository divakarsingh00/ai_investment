export interface AgentState {
  companyName: string;
  ticker: string;
  financialData: string;
  newsData: string;
  financialAnalysis: string;
  newsAnalysis: string;
  decision: "INVEST" | "PASS" | "HOLD" | "";
  reasoning: string;
  logs: string[];
}
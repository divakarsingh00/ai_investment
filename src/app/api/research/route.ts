import { NextResponse } from "next/server";
import { researchAgent } from "@/lib/agent";

export async function POST(request: Request) {
  try {
    const { companyName } = await request.json();

    if (!companyName) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }

    // Run the compiled LangGraph workflow with an initial state
    const result = await researchAgent.invoke({
      companyName,
      ticker: "",
      financialData: "",
      newsData: "",
      financialAnalysis: "",
      newsAnalysis: "",
      decision: "",
      reasoning: "",
      logs: [],
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Agent Execution Error:", error);
    return NextResponse.json({ error: error.message || "Internal Agent Error" }, { status: 500 });
  }
}
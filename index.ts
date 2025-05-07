import type { SolanaAgentKit } from "solana-agent-kit";
import { chooseAgent } from "../utils";
import langchainAITests from "./langchain";
import vercelAITests from "./vercel-ai";

export default async function aiTests(agentKit: SolanaAgentKit) {
  const agent = await chooseAgent(["vercel-ai", "langchain"] as const);

  switch (agent) {
    case "vercel-ai":
      await vercelAITests(agentKit);
      break;
    case "langchain":
      await langchainAITests(agentKit);
      break;
  }
}

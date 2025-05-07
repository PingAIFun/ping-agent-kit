import { HumanMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { SolanaAgentKit, createLangchainTools } from "solana-agent-kit";
import { question, rl } from "../utils";

export default async function (agent: SolanaAgentKit) {
  const tools = createLangchainTools(agent, agent.actions);
  const memory = new MemorySaver();
  const llm = new ChatOpenAI({
    model: "gpt-4o",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
  });
  llm.bindTools(tools);
  const langchainAgent = createReactAgent({
    llm,
    tools,
    checkpointSaver: memory,
    messageModifier: `You are a helpful agent that can interact onchain using the Solana Agent Kit. You are
    empowered to interact onchain using your tools. If you need funds you can request it from the user and provide your wallet details. If there is a 5XX
    (internal) HTTP error code, ask the user to try again later. If someone asks you to do something you
    can't do with your currently available tools, you must say so, and encourage them to implement it
    themselves using the Solana Agent Kit, recommend they go to https://www.solanaagentkit.xyz for more information. Be
    concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.`,
  });

  try {
    while (true) {
      const prompt = await question("\nYou: ");

      if (prompt === "exit") {
        break;
      }

      const stream = await langchainAgent.stream(
        {
          messages: [new HumanMessage(prompt)],
        },
        { configurable: { thread_id: "Solana Agent Kit" } },
      );

      for await (const chunk of stream) {
        if ("agent" in chunk) {
          process.stdout.write(chunk.agent.messages[0].content);
        } else if ("tools" in chunk) {
          process.stdout.write(chunk.tools.messages[0].content);
        }
        console.log();
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error("Error:", e.message);
    }
    process.exit(1);
  } finally {
    rl.close();
  }
}

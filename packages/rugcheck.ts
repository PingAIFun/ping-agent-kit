import { Action } from "solana-agent-kit";
import { z } from "zod";
import { fetchTokenReportSummary } from "../tools";

const rugcheckAction: Action = {
  name: "RUGCHECK",
  description: "Check if a token is a rug pull",
  similes: [
    "check rug pull",
    "rug pull check",
    "rug pull detector",
    "rug pull scanner",
    "rug pull alert",
  ],
  examples: [
    [
      {
        input: {
          mint: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
        },
        output: {
          status: "success",
          message: "Token is not a rug pull",
        },
        explanation: "Check whether JUP is a rugpull",
      },
    ],
  ],
  schema: z.object({
    mint: z.string().min(1).describe("The token mint address"),
  }),
  handler: async (_agent, input) => {
    try {
      const res = await fetchTokenReportSummary(input.mint);
      return {
        status: "success",
        response: res,
      };
    } catch (error: any) {
      return {
        status: "error",
        message: error.message,
      };
    }
  },
};

export default rugcheckAction;

import { SolanaAgentKit } from "@packages/core/dist";

export function getWalletAddress(agent: SolanaAgentKit): string {
  return agent.wallet.publicKey.toBase58();
}

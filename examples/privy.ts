import { PrivyClient } from "@privy-io/server-auth";

export const privyClient = new PrivyClient(
  process.env.PRIVY_APP_ID as string,
  process.env.PRIVY_APP_SECRET as string,
);

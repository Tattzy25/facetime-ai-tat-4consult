import { AGENT_PROFILE_URL, MCP_ENDPOINT, getShopDomain } from "../GeminiTools/config";

export async function callCatalogMcp(
  name: string,
  id: string | undefined,
  args: unknown,
) {
  const shopDomain = getShopDomain();
  const response = await fetch(MCP_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream"
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name,
        arguments: {
          ...(typeof args === "object" && args !== null ? args : {}),
          ...(shopDomain
            ? { shop_domain: shopDomain, store_domain: shopDomain }
            : {}),
          meta: {
            "ucp-agent": {
              profile: AGENT_PROFILE_URL,
            },
          },
        },
      },
    }),
  });

  const rawBody = await response.text();
  return JSON.parse(
  rawBody
    .split(/\r?\n/)
    .find((line) => line.startsWith("data:"))
    ?.replace(/^data:\s*/, "") || rawBody,
);
}

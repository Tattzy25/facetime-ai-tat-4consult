import { AGENT_PROFILE_URL, CART_MCP_ENDPOINT, getShopDomain } from "../GeminiTools/config";

function parseMcpResponse(rawBody: string): unknown {
  const eventData = rawBody
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice("data:".length).trim())
    .filter(Boolean)
    .join("\n");

  return JSON.parse(eventData || rawBody);
}

export async function callCartMcp(
  name: string,
  id: string | undefined,
  args: unknown,
) {
  const shopDomain = getShopDomain();
  const response = await fetch(CART_MCP_ENDPOINT, {
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

  
  return parseMcpResponse(rawBody);
}

export function isCartTool(name: string): boolean {
  return [
    "create_cart",
    "get_cart",
    "update_cart",
  ].includes(name);
}
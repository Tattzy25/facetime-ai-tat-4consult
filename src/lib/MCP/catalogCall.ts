import { MCP_ENDPOINT, getShopDomain } from "../GeminiTools/config";
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
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: {
        name,
        arguments: {
          ...(typeof args === "object" && args !== null ? args : {}),
          ...(shopDomain ? { domain: shopDomain } : {}),
        },
      },
    }),
  });

  const rawBody = await response.text();

  const result = JSON.parse(
    rawBody
      .split(/\r?\n/)
      .find((line) => line.startsWith("data:"))
      ?.replace(/^data:\s*/, "") || rawBody,
  );

  if (result?.content?.[0]?.type === "text") {
    try {
      return JSON.parse(result.content[0].text);
    } catch {
      return result;
    }
  }

  return result;
}
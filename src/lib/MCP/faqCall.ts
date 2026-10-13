import { getShopDomain } from "../GeminiTools/config";

export async function callFaqMcp(
  name: string,
  id: string | undefined,
  args: unknown,
) {
  const shopDomain = getShopDomain();
  const faqResponse = await fetch(
    "https://mcp-faq-policies-agent.facetimefy.com/",
    {
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
            ...(shopDomain ? { store_domain: shopDomain } : {}),
          },
        },
      }),
    },
  );

  const faqRawBody = await faqResponse.text();

  return faqRawBody;
}
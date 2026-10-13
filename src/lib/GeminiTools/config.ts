export const AGENT_PROFILE_URL =
  "https://ucp-agent-profile.facetimefy.com/ucp/agent-profiles/2026-08-25/valid-with-capabilities.json";

export const MCP_ENDPOINT = "https://mcp-agents.tattty.com/mcp";
export const CART_MCP_ENDPOINT = "https://mcp-cart-agents.tattty.com/mcp";
export const FAQ_MCP_ENDPOINT = "https://mcp-faq-policies-agent.facetimefy.com/mcp";
export const CHECKOUT_MCP_ENDPOINT = "https://checkout-group-mcp.anigok.com/mcp";

function cleanDomain(d: string | null | undefined): string | null {
  if (!d) return null;
  const clean = d.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
  return clean || null;
}

export function getShopDomain(): string {
  if (typeof window === "undefined") return "";

  const params = new URLSearchParams(window.location.search);
  const fromQuery = cleanDomain(params.get("shop") || params.get("domain") || params.get("store"));
  if (fromQuery) return fromQuery;

  if (document.referrer) {
    try {
      const refHost = cleanDomain(new URL(document.referrer).hostname);
      if (refHost && refHost !== window.location.hostname) {
        return refHost;
      }
    } catch {}
  }

  if ((window as any).Shopify?.shop) {
    const shopifyShop = cleanDomain((window as any).Shopify.shop);
    if (shopifyShop) return shopifyShop;
  }

  return cleanDomain(window.location.hostname) || "";
}                                        
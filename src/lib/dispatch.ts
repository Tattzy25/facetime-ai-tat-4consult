import { callCartMcp } from "../lib/MCP/cartCall";
import { callCatalogMcp } from "../lib/MCP/catalogCall";
import { callFaqMcp } from "../lib/MCP/faqCall";
import { callCheckoutMcp } from "../lib/MCP/checkoutCall";

export type ToolCall = {
  name: string;
  id: string;
  args: any;
};

export async function dispatchToolCall(call: ToolCall): Promise<any> {
  const { name, id, args } = call;

  const handlers: Record<string, any> = {
    create_cart: callCartMcp,
    get_cart: callCartMcp,
    update_cart: callCartMcp,
    create_checkout: callCheckoutMcp,
    update_checkout: callCheckoutMcp,
    search_shop_policies_and_faqs: callFaqMcp,
    search_catalog: callCatalogMcp,
    get_product: callCatalogMcp,
    lookup_catalog: callCatalogMcp,
  };

  const handler = handlers[name];

  return await handler(name, id, args);
}

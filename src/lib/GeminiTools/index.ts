export { MCP_ENDPOINT } from "./config";

import { CATALOG_TOOLS } from "./catalog.tools";
import { CART_TOOLS } from "./cart.tools";
import { UI_TOOLS } from "./ui.tools";
import { FAQ_TOOLS } from "./faq.tools";
import { CHECKOUT_TOOLS } from "./checkout.tools";

export const AGENT_SHOP_TOOLS = [
  ...CATALOG_TOOLS,
  ...CART_TOOLS,
  ...UI_TOOLS,
  ...FAQ_TOOLS,
  ...CHECKOUT_TOOLS,
] as const;
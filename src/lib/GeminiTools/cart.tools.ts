export const CART_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "create_cart",
        description: "Create a new cart with line items and optional buyer context. Use this when the buyer asks to place selected catalog products into a cart. Do not send an id argument. A new cart has no cart ID. The response includes the merchant-assigned cart ID, validated line items, estimated totals, and a 'continue_url' for continuing on the merchant's storefront.",
        parameters: {
          type: "OBJECT",
          properties: {
            shop_domain: {
              type: "STRING",
              description:
                "The shop domain to call (no http:// or https://). This maps to https://{shop-domain}/api/ucp/mcp.",
            },
            cart: {
              type: "OBJECT",
              description: "The cart object containing the cart data.",
              properties: {
                line_items: {
                  type: "ARRAY",
                  description:
                    "Array of items to add to the cart. Each item must include quantity and an item object with the product variant id.",
                  items: {
                    type: "OBJECT",
                    properties: {
                      quantity: {
                        type: "INTEGER",
                        description:
                          "The quantity to add for this line item.",
                      },
                      item: {
                        type: "OBJECT",
                        properties: {
                          id: {
                            type: "STRING",
                            description:
                              "The product variant id for this line item.",
                          },
                        },
                        required: ["id"],
                      },
                    },
                    required: ["quantity", "item"],
                  },
                },
                context: {
                  type: "OBJECT",
                  description:
                    "Localization hints including address_country, address_region, and postal_code. Merchants may use these as a signal for pricing, availability, and currency estimates, but context is not authoritative for shipping. If omitted, the merchant falls back to geo-IP.",
                  properties: {
                    address_country: {
                      type: "STRING",
                      description:
                        "Localization hint for the buyer country.",
                    },
                    address_region: {
                      type: "STRING",
                      description:
                        "Localization hint for the buyer region.",
                    },
                    postal_code: {
                      type: "STRING",
                      description:
                        "Localization hint for the buyer postal code.",
                    },
                  },
                },
                attribution: {
                  type: "OBJECT",
                  description:
                    "Optional attribution metadata. Supported fields include referring_domain, click_id_tag, click_id_value, activity_id_tag, activity_id_value, utm_campaign, utm_source, utm_medium, utm_content, and utm_term.",
                  properties: {
                    referring_domain: { type: "STRING" },
                    click_id_tag: { type: "STRING" },
                    click_id_value: { type: "STRING" },
                    activity_id_tag: { type: "STRING" },
                    activity_id_value: { type: "STRING" },
                    utm_campaign: { type: "STRING" },
                    utm_source: { type: "STRING" },
                    utm_medium: { type: "STRING" },
                    utm_content: { type: "STRING" },
                    utm_term: { type: "STRING" },
                  },
                },
                buyer: {
                  type: "OBJECT",
                  description:
                    "Optional buyer information for personalized estimates.",
                },
                signals: {
                  type: "OBJECT",
                  description:
                    "Optional platform-provided environment data for authorization and abuse prevention.",
                },
              },
              required: ["line_items"],
            },
          },
          required: ["shop_domain", "cart"],
        },
      },

      {
        name: "update_cart",
        description:
          "Replace the contents of an existing cart. This tool uses PUT semantics: every request replaces the cart's full state with the supplied payload. Omitted fields, including 'line_items' or 'context', are removed. There is no server-side merge of partial updates. Preserve all existing state that the user has not asked to change. The response returns the updated cart state and a fresh continue_url.",
        parameters: {
          type: "OBJECT",
          properties: {
            shop_domain: {
              type: "STRING",
              description:
                "The shop domain to call (no http:// or https://). This maps to https://{shop-domain}/api/ucp/mcp.",
            },
            id: {
              type: "STRING",
              description: "The Shopify cart GID to update. Use only the gid://shopify/Cart/... value returned by create_cart, update_cart, or get_cart.",
            },
            cart: {
              type: "OBJECT",
              description:
                "The cart object containing the full desired cart state. Any field you omit is removed from the cart. update_cart uses PUT semantics and does not merge partial updates.",
              properties: {
                line_items: {
                  type: "ARRAY",
                  description: "Full replacement array of items. Preserve all existing lines that should remain in the cart.",
                  items: {
                    type: "OBJECT",
                    properties: {
                      quantity: {
                        type: "INTEGER",
                        description:
                          "The full replacement quantity for this line item.",
                      },
                      item: {
                        type: "OBJECT",
                        properties: {
                          id: {
                            type: "STRING",
                            description:
                              "The product variant id for this line item.",
                          },
                        },
                        required: ["id"],
                      },
                    },
                    required: ["quantity", "item"],
                  },
                },
                context: {
                  type: "OBJECT",
                  description:
                    "Localization signals. Context is a hint for pricing, availability, and currency and is not used as the shipping address at checkout.",
                  properties: {
                    address_country: {
                      type: "STRING",
                      description:
                        "Localization signal for the buyer country.",
                    },
                    address_region: {
                      type: "STRING",
                      description:
                        "Localization signal for the buyer region.",
                    },
                    postal_code: {
                      type: "STRING",
                      description:
                        "Localization signal for the buyer postal code.",
                    },
                  },
                },
                attribution: {
                  type: "OBJECT",
                  description:
                    "Attribution metadata. Because the cart object is replaced, resend attribution if you want to preserve it.",
                  properties: {
                    referring_domain: { type: "STRING" },
                    click_id_tag: { type: "STRING" },
                    click_id_value: { type: "STRING" },
                    activity_id_tag: { type: "STRING" },
                    activity_id_value: { type: "STRING" },
                    utm_campaign: { type: "STRING" },
                    utm_source: { type: "STRING" },
                    utm_medium: { type: "STRING" },
                    utm_content: { type: "STRING" },
                    utm_term: { type: "STRING" },
                  },
                },
                buyer: {
                  type: "OBJECT",
                  description: "Optional buyer information.",
                },
                signals: {
                  type: "OBJECT",
                  description: "Optional platform signals.",
                },
              },
              required: ["line_items"],
            },
          },
          required: ["shop_domain", "id", "cart"],
        },
      },
      {
        name: "get_cart",
        description:
          "Retrieve the current state of an existing cart. Use this before cart or checkout redirects, when the buyer asks what is in the cart, asks for the running cart total, or returns to the conversation. The response returns the current cart state and a fresh continue_url. If messages contains severity 'unrecoverable' or code 'cart_not_found', do not redirect.",
        parameters: {
          type: "OBJECT",
          properties: {
            shop_domain: {
              type: "STRING",
              description:
                "The shop domain to call (no http:// or https://). This maps to https://{shop-domain}/api/ucp/mcp.",
            },
            id: {
              type: "STRING",
              description: "The Shopify cart GID to retrieve. Use only the gid://shopify/Cart/... value returned by create_cart, update_cart, or get_cart.",
            },
          },
          required: ["shop_domain", "id"],
        },
      },
    ],
  },
] as const;
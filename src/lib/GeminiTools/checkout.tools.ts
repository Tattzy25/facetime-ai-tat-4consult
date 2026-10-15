export const CHECKOUT_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "create_checkout",
        description:
          'Create a new checkout session with line items, buyer information, and fulfillment preferences. Use this tool when a buyer is ready to purchase items and you need to initiate the checkout process. The response includes a `continue_url` for handing off to a trusted UI. When to use: Buyer says "I want to buy this item", or Agent has collected enough information to start checkout, and Buyer confirms their cart and wants to proceed.',
        parameters: {
          type: "OBJECT",
          properties: {
            shop_domain: {
              type: "STRING",
              description:
                "The shop domain to call (no http:// or https://). This maps to https://{shop-domain}/api/ucp/mcp.",
            },
            cart_id: {
              type: "STRING",
              description:
                "The optional ID of a cart built with Cart MCP to convert into this checkout.",
            },
            checkout: {
              type: "OBJECT",
              description:
                "The checkout object containing all checkout data. Optional when cart_id is provided, in which case the cart's contents are used instead.",
              properties: {
                currency: {
                  type: "STRING",
                  description:
                    "ISO 4217 currency code, for example USD, EUR, or GBP.",
                },
                line_items: {
                  type: "ARRAY",
                  description:
                    "Array of items to purchase. Each item must include quantity and an item object with the product variant id.",
                  items: {
                    type: "OBJECT",
                    properties: {
                      quantity: {
                        type: "INTEGER",
                        description:
                          "The quantity to purchase for this line item.",
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
                buyer: {
                  type: "OBJECT",
                  description:
                    "Buyer information. Contact method email or phone_number must be provided, per-merchant configuration.",
                },
                context: {
                  type: "OBJECT",
                  description:
                    "Provisional buyer signals for intent, localization, currency, and eligibility decisions. A shipping address supersedes these context hints.",
                  properties: {
                    address_country: {
                      type: "STRING",
                      description: "Provisional buyer signal for country.",
                    },
                    address_region: {
                      type: "STRING",
                      description: "Provisional buyer signal for region.",
                    },
                    postal_code: {
                      type: "STRING",
                      description: "Provisional buyer signal for postal code.",
                    },
                    intent: {
                      type: "STRING",
                      description: "Provisional buyer intent signal.",
                    },
                    language: {
                      type: "STRING",
                      description: "Provisional buyer language signal.",
                    },
                    currency: {
                      type: "STRING",
                      description: "Provisional buyer currency signal.",
                    },
                    eligibility: {
                      type: "ARRAY",
                      description: "Eligibility signals.",
                      items: { type: "STRING" },
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
                fulfillment: {
                  type: "OBJECT",
                  description:
                    "Fulfillment preferences including shipping methods and destinations.",
                },
                payment: {
                  type: "OBJECT",
                  description:
                    "Payment configuration including available instruments and selected_instrument_id.",
                },
              },
            },
          },
          required: ["shop_domain"],
        },
      },
      {
        name: "update_checkout",
        description:
          "Update an existing checkout session with new information. Use this tool to modify line items, update shipping address, change fulfillment method, or add buyer information before completing the checkout. When to use: Buyer wants to change quantity or remove items, Buyer provides or updates shipping address, Need to update buyer email or contact info, or Changing a delivery option. Caution: `update_checkout` uses PUT semantics. Each request replaces the full checkout state with the payload you send. Omit a field (for example `line_items` or `buyer`) and it is removed from the checkout. There is no server-side merge of partial updates. Before sending an update, remove response-only fields from the payload. `checkout.buyer.country_code` isn't accepted as input. `checkout.payment.instruments[].display` is response-only. For fulfillment updates, `checkout.fulfillment.methods[].id` is optional, but `line_item_ids` is required.",
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
              description: "The ID of the checkout session to update.",
            },
            checkout: {
              type: "OBJECT",
              description:
                "The checkout object containing the complete updated checkout state. update_checkout uses PUT semantics. Omit a field and it is removed from the checkout. There is no server-side merge of partial updates.",
              properties: {
                line_items: {
                  type: "ARRAY",
                  description:
                    "Updated array of items. Replaces existing line items.",
                  items: {
                    type: "OBJECT",
                    properties: {
                      id: {
                        type: "STRING",
                        description: "The existing checkout line item id.",
                      },
                      quantity: {
                        type: "INTEGER",
                        description:
                          "The updated quantity for this line item.",
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
                buyer: {
                  type: "OBJECT",
                  description:
                    "Updated buyer information. Contact method email or phone_number must be provided, per-merchant configuration.",
                },
                context: {
                  type: "OBJECT",
                  description:
                    "Updated provisional buyer signals for intent, localization, currency, and eligibility decisions. A shipping address supersedes these context hints.",
                  properties: {
                    address_country: {
                      type: "STRING",
                      description:
                        "Updated provisional buyer signal for country.",
                    },
                    address_region: {
                      type: "STRING",
                      description:
                        "Updated provisional buyer signal for region.",
                    },
                    postal_code: {
                      type: "STRING",
                      description:
                        "Updated provisional buyer signal for postal code.",
                    },
                    intent: {
                      type: "STRING",
                      description: "Updated provisional buyer intent signal.",
                    },
                    language: {
                      type: "STRING",
                      description:
                        "Updated provisional buyer language signal.",
                    },
                    currency: {
                      type: "STRING",
                      description:
                        "Updated provisional buyer currency signal.",
                    },
                    eligibility: {
                      type: "ARRAY",
                      description: "Updated eligibility signals.",
                      items: { type: "STRING" },
                    },
                  },
                },
                attribution: {
                  type: "OBJECT",
                  description:
                    "Attribution metadata. Because the checkout object is replaced, resend attribution if you want to preserve it.",
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
                fulfillment: {
                  type: "OBJECT",
                  description:
                    "Updated fulfillment preferences. Each method must include line_item_ids.",
                },
                payment: {
                  type: "OBJECT",
                  description:
                    "Updated payment configuration. Do not send response-only display fields from payment.instruments.",
                },
              },
              required: ["line_items", "buyer"],
            },
          },
          required: ["shop_domain", "id", "checkout"],
        },
      },
    ],
  },
] as const;
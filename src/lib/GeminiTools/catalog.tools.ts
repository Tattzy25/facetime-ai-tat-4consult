export const CATALOG_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "search_catalog",
        description:
          'Searches the store\'s product catalog. Use when a customer asks "Do you have any organic coffee?", when you need to find products matching specific criteria, or when a customer wants to browse items in a category. Input conforms to dev.ucp.shopping.catalog.search. Response conforms to the UCP catalog search response including products with title, description, price range (minor units), media, and variants. Prices in the response are integers in the currency\'s ISO 4217 minor units, paired with a currency code: {"amount": 600, "currency": "USD"} is $6.00 and {"amount": 2500, "currency": "USD"} is $25.00. Convert to major units before quoting a price to a buyer (divide by 100 for two-decimal currencies such as USD and EUR; zero-decimal currencies such as JPY are already whole units).',
        parameters: {
          type: "OBJECT",
          properties: {
            catalog: {
              type: "OBJECT",
              properties: {
                query: {
                  type: "STRING",
                  description:
                    'Free-text search query. For example, "organic coffee beans", "winter jacket". This may be an empty string when using other search inputs.',
                },
                filters: {
                  type: "OBJECT",
                  properties: {
                    price: {
                      type: "OBJECT",
                      properties: {
                        min: {
                          type: "NUMBER",
                          description:
                            "Minimum price in the currency minor unit used by the catalog.",
                        },
                        max: {
                          type: "NUMBER",
                          description:
                            "Maximum price in the currency minor unit used by the catalog.",
                        },
                      },
                    },
                    categories: {
                      type: "ARRAY",
                      items: { type: "STRING" },
                      description:
                        "Optional product categories to include in the search.",
                    },
                  },
                },
                pagination: {
                  type: "OBJECT",
                  properties: {
                    limit: {
                      type: "INTEGER",
                      description:
                        "Maximum number of catalog results to return (min 1, default 10, max 250).",
                    },
                    cursor: {
                      type: "STRING",
                      description:
                        "Opaque cursor from a previous search result page.",
                    },
                  },
                },
              },
            },
          },
          required: ["catalog"],
        },
      },
      {
        name: "get_product",
        description:
          'Retrieves full details for a single product from the store\'s product catalog. Use when a customer has selected a product and needs full details, when you need to check variant options with availability signals, or when a customer is making option selections (Color, Size, etc.). Input conforms to dev.ucp.shopping.catalog.lookup. Prices in the response are integers in the currency\'s ISO 4217 minor units, paired with a currency code: {"amount": 600, "currency": "USD"} is $6.00 and {"amount": 2500, "currency": "USD"} is $25.00. Convert to major units before quoting a price to a buyer (divide by 100 for two-decimal currencies such as USD and EUR; zero-decimal currencies such as JPY are already whole units).',
        parameters: {
          type: "OBJECT",
          properties: {
            catalog: {
              type: "OBJECT",
              properties: {
                id: {
                  type: "STRING",
                  description:
                    'Product or variant identifier returned by a prior catalog result. For example, "gid://shopify/Product/123".',
                },
              },
              required: ["id"],
            },
          },
          required: ["catalog"],
        },
      },
      {
        name: "lookup_catalog",
        description:
          'Retrieve products or variants by identifier from the store\'s product catalog. Use when you have product or variant IDs from search results or deep links, when you need to resolve multiple identifiers in a single request, or when validating cart items against current catalog data. Supports Product IDs (gid://shopify/Product/{id}) and Variant IDs (gid://shopify/ProductVariant/{id}). Input and response conform to dev.ucp.shopping.catalog.lookup. Prices in the response are integers in the currency\'s ISO 4217 minor units, paired with a currency code: {"amount": 600, "currency": "USD"} is $6.00 and {"amount": 2500, "currency": "USD"} is $25.00. Convert to major units before quoting a price to a buyer (divide by 100 for two-decimal currencies such as USD and EUR; zero-decimal currencies such as JPY are already whole units).',
        parameters: {
          type: "OBJECT",
          properties: {
            catalog: {
              type: "OBJECT",
              properties: {
                ids: {
                  type: "ARRAY",
                  items: { type: "STRING" },
                  description:
                    'Array of product or variant identifiers from prior catalog results (up to 10). For example, ["gid://shopify/Product/123"].',
                },
              },
              required: ["ids"],
            },
          },
          required: ["catalog"],
        },
      },
    ],
  },
] as const;
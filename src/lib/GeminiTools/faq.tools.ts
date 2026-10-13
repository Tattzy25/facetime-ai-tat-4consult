export const FAQ_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "search_shop_policies_and_faqs",
        description:
          'Answers questions about the store\'s policies, products, and services to build customer trust. When to use: A customer asks "What\'s your return policy?", You need to clarify shipping or payment options, or A customer has questions about product care or warranties. Use natural language to query the search or the search will fail.',
        parameters: {
          type: "OBJECT",
          properties: {
            store_domain: {
              type: "STRING",
              description:
                "The store domain to call (no http:// or https://). This maps to https://{storedomain}/api/mcp.",
            },
            query: {
              type: "STRING",
              description:
                "The question about policies or FAQs. For example, 'What is your return policy for sale items?'",
            },
            context: {
              type: "STRING",
              description:
                "Additional context like the current product being viewed or the customer's situation.",
            },
          },
          required: ["store_domain", "query"],
        },
      },
    ],
  },
] as const;
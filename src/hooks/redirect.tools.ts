export const REDIRECT_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "notify_cart_redirect",
        description:
          "Open the buyer's current cart on the merchant storefront in a new tab. Call this ONLY when the buyer explicitly asks to see or edit their cart or to review their running total. Do NOT call this merely because an item was added to the cart — assume the buyer is still browsing until they say otherwise.",
        parameters: {
          type: "OBJECT",
          properties: {
            url: {
              type: "STRING",
              description: "The exact cart URL returned by the merchant.",
            },
          },
          required: ["url"],
        },
      },
      {
        name: "notify_checkout_redirect",
        description:
          "Open checkout for the buyer's current cart on the merchant storefront in a new tab. Call this ONLY when the buyer confirms they are ready to pay and complete their purchase. Do NOT call this merely because a cart or checkout tool returned a checkout or continuation URL — wait for the buyer to say they are ready.",
        parameters: {
          type: "OBJECT",
          properties: {
            url: {
              type: "STRING",
              description: "The exact checkout URL returned by the merchant.",
            },
          },
          required: ["url"],
        },
      },
    ],
  },
] as const;

export function openRedirect(args: unknown) {
  const url =
    typeof (args as { url?: unknown } | null)?.url === "string"
      ? (args as { url: string }).url
      : "";

  if (!url) {
    return {
      success: false,
      error:
        "Missing required url. Call this tool again with the exact continue_url returned for this merchant.",
    };
  }

  window.open(url, "_blank", "noopener,noreferrer");
  return { success: true, url };
}
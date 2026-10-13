export const UI_TOOLS = [
  {
    functionDeclarations: [
      {
        name: "get_ui_state",
        description: "Retrieve the current visual screen display state. Use this tool to verify what products or search results the buyer is currently viewing on their screen.",
        parameters: {
          type: "OBJECT",
          properties: {},
        },
      },
    ],
  },
] as const;

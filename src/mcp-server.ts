import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { McpHandlers } from "./mcp-handlers";

export function createMcpServer(mcpHandlers: McpHandlers): McpServer {
  const server = new McpServer({
    name: "Vue MCP Server",
    version: "1.0.0",
  });

  // ──────────────── MCP Tools ────────────────

  server.registerTool(
    "getInspectorTree",
    {
      description: "Get the Vue component tree in markdown tree syntax format.",
    },
    async () => {
      const tree = await mcpHandlers.getInspectorTree();
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(tree),
          },
        ],
      };
    },
  );

  server.registerTool(
    "getComponentState",
    {
      description: "Get the state of a Vue component.",
      inputSchema: {
        nodeId: z
          .string()
          .describe("The node ID from the inspector tree (e.g. 'app-1:20')"),
      },
    },
    async ({ nodeId }) => {
      const state = await mcpHandlers.getComponentState(nodeId);
      return {
        content: [{ type: "text" as const, text: JSON.stringify(state) }],
      };
    },
  );

  return server;
}

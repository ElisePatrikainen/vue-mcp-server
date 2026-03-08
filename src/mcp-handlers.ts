import type { CallClient } from "./channel/server";
import type { ClientFunctions } from "./client-functions";

export function createMcpHandlers(callClient: CallClient<ClientFunctions>) {
  return {
    async getInspectorTree() {
      return await callClient("getInspectorTree");
    },
    async getComponentState(nodeId: string) {
      return await callClient("getComponentState", nodeId);
    },
  };
}

export type McpHandlers = ReturnType<typeof createMcpHandlers>;

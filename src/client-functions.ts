import { devtools } from "@vue/devtools-kit";

type Devtools = typeof devtools;

function stripCircular<T>(obj: T): T {
  const seen = new WeakSet();
  return JSON.parse(
    JSON.stringify(obj, (_key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) return "[Circular]";
        seen.add(value);
      }
      return value;
    }),
  );
}

export function createClientFunctions(devtools: Devtools) {
  return {
    async getInspectorTree() {
      const tree = await devtools.api.getInspectorTree({
        inspectorId: "components",
        filter: "",
      });
      return tree;
    },
    async getComponentState(nodeId: string) {
      const state = await devtools.api.getInspectorState({
        inspectorId: "components",
        nodeId,
      });
      const strippedState = stripCircular(state);
      const componentState = strippedState.state?.filter(
        (s: any) => s.type === "setup",
      );
      return componentState;
    },
  };
}

export type ClientFunctions = ReturnType<typeof createClientFunctions>;

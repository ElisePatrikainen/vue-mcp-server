# vue-mcp-server

A Vite plugin that exposes a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server for Vue applications. It lets AI agents (Cursor, Claude Desktop, etc.) inspect your running Vue app in real time — component tree, component state, and more.

> **Warning** — This project is experimental and not production ready.

## Credits

This project is heavily inspired by:

- [vite-plugin-vue-mcp](https://github.com/webfansplz/vite-plugin-vue-mcp) by [Arlo (@webfansplz)](https://github.com/webfansplz)
- [vite-plugin-mcp](https://github.com/antfu/nuxt-mcp-dev/tree/main/packages/vite-plugin-mcp) by [Anthony Fu (@antfu)](https://github.com/antfu)
- [vite-dev-rpc](https://github.com/antfu/vite-dev-rpc) by [Anthony Fu (@antfu)](https://github.com/antfu)

## Install

```bash
npm install vue-mcp-server
```

## Setup

Add the plugin to your `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueMcpPlugin from "vue-mcp-server";

export default defineConfig({
  plugins: [vue(), VueMcpPlugin()],
});
```

Start your dev server as usual (`vite` / `npm run dev`). The MCP endpoint is available at `http://localhost:5173/__mcp`.

### Connect your AI agent

Add the MCP server to your agent's configuration. For example, in Cursor (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "vue-mcp": {
      "url": "http://localhost:5173/__mcp"
    }
  }
}
```

Adjust the port if your Vite dev server runs on a different one.

## MCP Tools

| Tool | Description | Parameters |
|------|-------------|------------|
| `getInspectorTree` | Returns the full Vue component tree | — |
| `getComponentState` | Returns the reactive state (refs, computed) of a component | `nodeId` — the node ID from the inspector tree (e.g. `app-1:3`) |

### Example workflow

1. Call `getInspectorTree` to get the component tree and find the `nodeId` of the component you're interested in.
2. Call `getComponentState` with that `nodeId` to inspect its reactive state.

## How it works

The plugin runs only in dev mode (`apply: 'serve'`). It:

1. Injects a client runtime into your app that connects to the [Vue DevTools Kit](https://github.com/vuejs/devtools) API.
2. Exposes a [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) MCP endpoint at `/__mcp` via Vite's dev server middleware.
3. Bridges MCP tool calls to the browser via Vite's WebSocket (HMR) channel.

## License

[MIT](./LICENSE)

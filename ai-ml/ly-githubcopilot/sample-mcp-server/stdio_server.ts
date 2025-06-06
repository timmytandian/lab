import {
    McpServer,
    ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create an MCP server
const server = new McpServer({
    name: "Demo",
    version: "1.0.0",
});

// Add an addition tool
server.tool(
    "add",
    "Add two numbers",
    { a: z.number(), b: z.number() },
    async ({ a, b }) => ({
        content: [{ type: "text", text: String(a + b) }],
    })
);

// Add a tool that reverses a string
server.tool(
    "reverse",
    "Reverse a string",
    { text: z.string() },
    async ({ text }) => ({
        content: [{ type: "text", text: text.split("").reverse().join("") }],
    })
);

// Get a snippet from the json file
server.tool(
    "getSnippet",
    "Get a snippet from the json file",
    { name: z.string() },
    async ({ name }) => {
        const data = fs.readFileSync(`${__dirname}/snippets.json`, "utf8");
        const snippetData = JSON.parse(data);
        const snippet = snippetData[name];
        if (!snippet) {
            return { content: [{ type: "text", text: "Snippet not found" }] };
        } else {
            return { content: [{ type: "text", text: snippet }] };
        }
    }
);

// Save a snippet to the json file
server.tool(
    "saveSnippet",
    "Save a snippet to the json file",
    { name: z.string(), value: z.string() },
    async ({ name, value }) => {
        const data = fs.readFileSync(`${__dirname}/snippets.json`, "utf8");
        const snippetData = JSON.parse(data);
        snippetData[name] = value;
        fs.writeFileSync(
            `${__dirname}/snippets.json`,
            JSON.stringify(snippetData, null, 2)
        );
        return { content: [{ type: "text", text: `Snippet ${name} saved` }] };
    }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);

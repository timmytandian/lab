import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const app = express();
app.use(express.json());

const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
});

function getServer(): McpServer {
    const server = new McpServer({
        name: "example-server",
        version: "1.0.0",
    });

    server.tool(
        "add",
        "Add two numbers",
        { a: z.number(), b: z.number() },
        async ({ a, b }) => ({
            content: [{ type: "text", text: String(a + b) }],
        })
    );

    return server;
}

app.post("/mcp", async (req, res) => {
    // In stateless mode, create a new instance of transport and server for each request
    // to ensure complete isolation. A single instance would cause request ID collisions
    // when multiple clients connect concurrently.

    try {
        const server = getServer();
        const transport: StreamableHTTPServerTransport =
            new StreamableHTTPServerTransport({
                sessionIdGenerator: undefined,
            });
        res.on("close", () => {
            console.log("Request closed");
            transport.close();
            server.close();
        });
        await server.connect(transport);
        await transport.handleRequest(req, res, req.body);
    } catch (error) {
        console.error("Error handling MCP request:", error);
        if (!res.headersSent) {
            res.status(500).json({
                jsonrpc: "2.0",
                error: {
                    code: -32603,
                    message: "Internal server error",
                },
                id: null,
            });
        }
    }
});

// GET リクエストは SSE エンドポイントとの互換性のために実装する必要がある
// SSE エンドポイントを実装しない場合は、405 Method Not Allowed を返す
app.get("/mcp", async (req, res) => {
    console.log("Received GET MCP request");
    res.writeHead(405).end(
        JSON.stringify({
            jsonrpc: "2.0",
            error: {
                code: -32000,
                message: "Method not allowed.",
            },
            id: null,
        })
    );
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

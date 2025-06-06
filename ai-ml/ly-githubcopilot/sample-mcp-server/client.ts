import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import {
    CallToolRequest,
    CallToolResultSchema,
    ListToolsRequest,
    ListToolsResultSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { createInterface } from "readline/promises";

// セッション ID と transport を保持する変数
let sessionId: string | undefined;
let transport: StreamableHTTPClientTransport | undefined;

const client = new Client({
    name: "example-stateful-client",
    version: "0.0.1",
});

// ...

// グローバル readline インターフェースを作成
const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function main() {
    transport = new StreamableHTTPClientTransport(
        new URL("http://localhost:3000/mcp"),
        {
            sessionId,
        }
    );
    // 初期化リクエストを送信
    await client.connect(transport);
    // サーバーで生成されたセッション ID を取得
    console.log("Session ID:", transport.sessionId);
    sessionId = transport.sessionId;

    while (true) {
        console.log("available commands:");
        console.log("1. list-tools");
        console.log("2. call-tool");
        console.log("3. exit");
        console.log("4. terminate-session");
        console.log("------------------------------");

        const answer = await readline.question("Enter your input: ");

        switch (answer) {
            case "list-tools":
                await listTools();
                break;
            case "call-tool":
                await callTool();
                break;
            // terminate-session コマンドを追加
            case "terminate-session":
                await terminateSession();
                break;
            case "exit":
                await disconnect(transport);
                console.log("Disconnected from server.");
                readline.close();
                return;

            default:
                console.log("You entered:", answer);
                break;
        }
    }
}

async function disconnect(transport: StreamableHTTPClientTransport) {
    await transport.close();
    await client.close();
    readline.close();
    console.log("Disconnected from server.");
    process.exit(0);
}

async function listTools() {
    const req: ListToolsRequest = {
        method: "tools/list",
        params: {},
    };

    const res = await client.request(req, ListToolsResultSchema);

    if (res.tools.length === 0) {
        console.log("No tools available.");
    } else {
        for (const tool of res.tools) {
            console.log(`Tool Name: ${tool.name}`);
            console.log(`Tool Description: ${tool.description}`);
            console.log("------------------------------");
        }
    }
}

async function callTool() {
    const firstNumber = await readline.question("Enter the first number: ");
    const secondNumber = await readline.question("Enter the second number: ");

    const firstNum = Number(firstNumber);
    const secondNum = Number(secondNumber);

    if (isNaN(firstNum) || isNaN(secondNum)) {
        console.error("Invalid input. Please enter valid numbers.");
        return;
    }

    const req: CallToolRequest = {
        method: "tools/call",
        params: {
            name: "add",
            arguments: { a: firstNum, b: secondNum },
        },
    };

    try {
        const res = await client.request(req, CallToolResultSchema);
        console.log(`Tool response: ${firstNum} + ${secondNum} = `);

        if (res.content) {
            res.content.forEach((item) => {
                if (item.type === "text") {
                    console.log(item.text);
                } else {
                    console.log(item.type + "content", item);
                }
            });
        } else {
            console.log("No content returned from tool.");
        }
        console.log("------------------------------");
    } catch (error) {
        console.error("Error calling tool:", error);
    }
}

// セッションを終了するメソッド
async function terminateSession() {
    if (!transport) {
        console.log("No active transport to terminate.");
        return;
    }
    await transport.terminateSession();
    console.log("Session terminated.");

    // sessionId が正しく消えているか確認
    if (!transport.sessionId) {
        console.log("Session ID:", transport.sessionId);
        sessionId = undefined;
    } else {
        // server が DELETE リクエストをサポートしていない
        console.log("Session ID not available. Unable to terminate session.");
    }
}

main();

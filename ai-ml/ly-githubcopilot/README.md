# LY-GithubCopilot-McpServer

This small project contains some sample codes to create MCP server for Github Copilot.
Inside the `sample-mcp-server` directory we can find several files that can be utilized to create different types of MCP server. 
-   `stdio_server.ts`: Standard I/O-based MCP server
-   `streamable_http_server.ts`: Streamable HTTP-based MCP server
-   `stateful_http_server.ts`: Statefull streamable HTTP-based MCP server
-   `client.ts`: a MCP client that interacts with statefull MCP server

## Working on This Project
This project use devcontainer technology to bootstrap the development environment. 

### Prerequisite
1. Install DevPod or DevPod CLI. See [installation instruction](https://devpod.sh/docs/getting-started/install).
2. Add Docker as DevPod provider. 
    - Instruction if you use [DevPod Desktop App](https://devpod.sh/docs/quickstart/browser#add-a-provider)
    - If you use [DevPod CLI](https://devpod.sh/docs/quickstart/devpod-cli#add-a-provider), run command below
        ```shell
        devpod provider add docker
        ```

### Getting Started

1. Download this directory, `cd` to the root of this directory.
2. **Open in Dev Container**. Use the VS Code "Reopen in Container" feature. The dev container includes uv and nodejs.
    ```shell
    devpod up . --ide vscode
    ```
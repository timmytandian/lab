#!/bin/bash

# trust the mounted mise.toml file, and then install all packages
/usr/local/bin/mise trust /workspaces/devcontainer-tutorial/mise.toml && /usr/local/bin/mise install

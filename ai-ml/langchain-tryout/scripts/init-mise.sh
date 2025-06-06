#!/bin/bash

# trust the mounted mise.toml file, and then install all packages
/usr/local/bin/mise trust $PWD/mise.toml && /usr/local/bin/mise install

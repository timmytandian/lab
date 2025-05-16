# Use Ubuntu devcontainer image from Microsoft
FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

# Copy the mise binary from jdxcode/mise container to /usr/local/bin
COPY --from=jdxcode/mise /usr/local/bin/mise /usr/local/bin/

# Make sure mise is activated in both zsh and bash. Might be overridden by a user's dotfiles.
# `mise activate` automatically loads the mise context (tools and environment variables) in our shell session.
# note: In this Microsoft's container image, the user name being used is "vscode".
RUN echo 'eval "$(mise activate bash)"' >> /home/vscode/.bashrc && \
    echo 'eval "$(mise activate zsh)"' >> /home/vscode/.zshrc

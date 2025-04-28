# Stage 1: Builder
FROM ghcr.io/astral-sh/uv:python3.13-bookworm-slim AS builder

# Install uv
RUN apt-get update && apt-get install -y curl && \
  curl -LsSf https://astral.sh/uv/install.sh | sh

# Set working directory
WORKDIR /app

# Copy project files
COPY pyproject.toml uv.lock ./

# Install the project's dependencies using the lockfile and settings
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --frozen --no-install-project --no-dev

# Then, add the rest of the project source code and install it
ADD . /app
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev

# Stage 2: Runtime - using Python distroless
FROM python:3.13-slim-bookworm

# Set working directory
WORKDIR /app

# Copy only what's needed from the builder stage
COPY --from=builder /app /app

# Python path setup for the virtual environment
ENV PATH="/app/.venv/bin:$PATH"

# Expose the port
EXPOSE 8000

# Run the app
CMD ["python", "main.py"]

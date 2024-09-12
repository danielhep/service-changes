# Use a Debian-based Node.js image
FROM node:18-bullseye-slim AS base

# Install necessary dependencies for DuckDB
RUN apt-get update && apt-get install -y \
    libc6 \
    libstdc++6 \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN pnpm run build

# Start a new stage for a smaller production image
FROM node:18-bullseye-slim AS production

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install necessary dependencies for DuckDB
RUN apt-get update && apt-get install -y \
    libc6 \
    libstdc++6 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy built assets and necessary files from the base stage
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/next.config.js ./next.config.js
COPY --from=base /app/public ./public
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
# Use a Debian-based Node.js image
FROM node:20-bullseye-slim AS deps

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN npm install -g pnpm && SKIP_ENV_VALIDATION=1 pnpm install --frozen-lockfile

#### BUILDER STAGE ####
FROM node:20-bullseye-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application code
COPY . .

# Install necessary dependencies for DuckDB
RUN apt-get update && apt-get install -y \
    libc6 \
    libstdc++6 \
    && rm -rf /var/lib/apt/lists/*

# Build the Next.js application
RUN npm install -g pnpm && SKIP_ENV_VALIDATION=1 pnpm run build

# Start a new stage for a smaller production image
FROM gcr.io/distroless/nodejs20-debian12 AS production

WORKDIR /app

# Copy built assets and necessary files from the base stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the port the app will run on
EXPOSE 3000
ENV PORT=3000

# Start the application
CMD ["server.js"]
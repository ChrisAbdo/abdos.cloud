FROM oven/bun:1 as base

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Set environment variables
ENV PORT=4000
ENV NODE_ENV=production

# Expose the port
EXPOSE 4000

# Start the application
CMD ["bun", "start"] 
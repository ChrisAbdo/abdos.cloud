# Abdos.Cloud API

A simple Bun HTTP server for the abdos.cloud application.

## Features

- High-performance HTTP server built with Bun
- RESTful API endpoints
- Type-safe route parameters
- Error handling
- Docker support

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/version` - Returns API version information
- `GET /api/users/:id` - Returns user data for a specific ID
- `/api/data` - Supports multiple HTTP methods (GET, POST, PUT, DELETE)

## Development

### Prerequisites

- [Bun](https://bun.sh/) 1.0.0 or higher

### Setup

1. Clone the repository
2. Navigate to the API directory:
   ```bash
   cd api
   ```
3. Install dependencies:
   ```bash
   bun install
   ```
4. Start the development server:
   ```bash
   bun run dev
   ```

The server will be available at http://localhost:4000.

## Docker

The API can be run in a Docker container:

```bash
# Build the Docker image
docker build -t abdos-api .

# Run the container
docker run -p 4000:4000 abdos-api
```

## Production

For production deployment, the API is configured to work with the Next.js frontend through Traefik reverse proxy.

## Environment Variables

- `PORT` - The port to listen on (default: 4000)
- `NODE_ENV` - The environment (development, production) 
# Abdos.Cloud Website

A modern Next.js website deployed with Docker and Traefik, secured with HTTPS.

## Components

- **Next.js**: Modern React framework for the frontend
- **Bun**: JavaScript runtime and package manager for fast builds
- **Traefik**: Reverse proxy handling HTTPS and automatic certificate renewal
- **Docker**: Container orchestration

## Setup

The website is deployed using Docker Compose with the following services:

1. **Traefik**: Handles routing, HTTPS, and automatic certificate renewal via Let's Encrypt
2. **Next.js**: Next.js application in standalone mode for optimal performance

## Domains

- Main website: https://abdos.cloud and https://www.abdos.cloud
- Traefik dashboard: https://traefik.abdos.cloud

## Deployment

To deploy the website:

```bash
docker-compose up -d
```

To update the Next.js application:

1. Make your changes to the Next.js code
2. Rebuild and restart the container:

```bash
docker-compose up -d --build nextjs
```

## Development

To develop locally:

```bash
cd nextjs
bun install
bun run dev
```

## Security

- HTTPS is enforced with automatic redirects from HTTP to HTTPS
- Modern TLS configurations with secure cipher suites
- Security headers for protection against common web vulnerabilities

## Maintenance

- Let's Encrypt certificates are automatically renewed by Traefik
- Logs can be viewed with `docker-compose logs` 
# Abdos.Cloud Website

A simple website deployed with Docker and Traefik, secured with HTTPS.

## Components

- **Website**: Simple HTML website served by Nginx
- **Traefik**: Reverse proxy handling HTTPS and automatic certificate renewal
- **Docker**: Container orchestration

## Setup

The website is deployed using Docker Compose with the following services:

1. **Traefik**: Handles routing, HTTPS, and automatic certificate renewal via Let's Encrypt
2. **Website**: Nginx container serving the static HTML content

## Domains

- Main website: https://abdos.cloud and https://www.abdos.cloud
- Traefik dashboard: https://traefik.abdos.cloud

## Deployment

To deploy the website:

```bash
docker-compose up -d
```

To update the website content, modify the files in the `html` directory and restart the containers:

```bash
docker-compose restart website
```

## Security

- HTTPS is enforced with automatic redirects from HTTP to HTTPS
- Modern TLS configurations with secure cipher suites
- Security headers for protection against common web vulnerabilities

## Maintenance

- Let's Encrypt certificates are automatically renewed by Traefik
- Logs can be viewed with `docker-compose logs` 
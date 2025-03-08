# abdos.cloud Website Deployment

This repository contains the necessary files to deploy a static HTML website to abdos.cloud using Docker and Traefik.

## Deployment Instructions

### Prerequisites
- SSH access to your server
- Docker and Docker Compose installed on the server
- Traefik proxy already set up and running on the server

### Deployment Steps

1. Clone this repository to your local machine
2. SSH into your server:
   ```
   ssh username@your-server-ip
   ```
3. Create a directory for the project:
   ```
   mkdir -p /path/to/abdos-website
   cd /path/to/abdos-website
   ```
4. Copy all files from your local repository to the server (using scp or rsync)
5. Build and start the Docker containers:
   ```
   ./deploy.sh
   ```
6. Your website should now be accessible at abdos.cloud

### Setting up DNS

Ensure your domain's DNS records point to your server's IP address:
- Create an A record for abdos.cloud pointing to your server's IP
- Create an A record for www.abdos.cloud pointing to your server's IP

### Traefik Configuration

This setup assumes you have Traefik already configured with:
- HTTPS entrypoint
- A certificate resolver named "simple-resolver"
- A network named "web-network" (or it will be created by the deploy script)

If your Traefik configuration uses different names, update the labels in the docker-compose.yml file accordingly.

## Maintenance

- To update the website, modify the HTML files in the `site` directory and rebuild:
  ```
  ./deploy.sh
  ```
- To view logs:
  ```
  docker-compose logs -f
  ``` 
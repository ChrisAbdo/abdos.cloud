# abdos.cloud Website Deployment

This repository contains the necessary files to deploy a static HTML website to abdos.cloud using Docker and Nginx.

## Deployment Instructions

### Prerequisites
- SSH access to your server
- Docker and Docker Compose installed on the server

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
   docker-compose up -d
   ```
6. Your website should now be accessible at abdos.cloud

### Setting up DNS

Ensure your domain's DNS records point to your server's IP address:
- Create an A record for abdos.cloud pointing to your server's IP
- Create an A record for www.abdos.cloud pointing to your server's IP

### SSL Configuration (Optional)

To enable HTTPS, you can use Certbot with the Nginx Docker container. Add the following steps after deployment:

1. Install Certbot on your server
2. Run Certbot to obtain SSL certificates:
   ```
   certbot --nginx -d abdos.cloud -d www.abdos.cloud
   ```
3. Certbot will automatically update your Nginx configuration

## Maintenance

- To update the website, modify the HTML files in the `site` directory and rebuild:
  ```
  docker-compose down
  docker-compose up -d --build
  ```
- To view logs:
  ```
  docker-compose logs -f
  ``` 
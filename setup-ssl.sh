#!/bin/bash

# Exit on error
set -e

echo "Setting up SSL for abdos.cloud..."

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    echo "Certbot is not installed. Installing..."
    
    # Check the OS and install accordingly
    if [ -f /etc/debian_version ]; then
        # Debian/Ubuntu
        apt-get update
        apt-get install -y certbot python3-certbot-nginx
    elif [ -f /etc/redhat-release ]; then
        # CentOS/RHEL
        yum install -y epel-release
        yum install -y certbot python3-certbot-nginx
    else
        echo "Unsupported OS. Please install Certbot manually."
        exit 1
    fi
fi

# Get SSL certificate
echo "Obtaining SSL certificate for abdos.cloud and www.abdos.cloud..."
certbot --nginx -d abdos.cloud -d www.abdos.cloud

echo "SSL setup completed!"
echo "Your website should now be accessible via HTTPS at https://abdos.cloud" 
#!/bin/bash

# Exit on error
set -e

echo "Starting deployment of abdos.cloud..."

# Check if the network exists, create if it doesn't
if ! docker network inspect web-network &>/dev/null; then
    echo "Creating web-network..."
    docker network create web-network
fi

# Build and start containers
echo "Building and starting Docker containers..."
docker-compose down
docker-compose up -d --build

echo "Checking if containers are running..."
docker-compose ps

echo "Deployment completed successfully!"
echo "Your website should now be accessible at abdos.cloud"
echo ""
echo "To view logs, run: docker-compose logs -f" 
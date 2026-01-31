#!/bin/bash

# Update packages
sudo apt-get update && sudo apt-get upgrade -y

# Install Docker
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    sudo apt-get install -y docker-compose-plugin
    # Alias if needed, or rely on 'docker compose'
fi

# Install Nginx and Certbot
sudo apt-get install -y nginx certbot python3-certbot-nginx

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# Configure Firewall (Basic UFW)
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
echo "y" | sudo ufw enable

echo "Setup complete! Please relogin to apply group changes."

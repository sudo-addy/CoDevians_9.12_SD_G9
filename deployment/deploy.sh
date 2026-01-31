#!/bin/bash

VM_IP="20.197.1.61"
VM_USER="PranayGajbhiye"
SSH_KEY="/home/pranay/Downloads/docs/PranayGajbhiye.pem"
PROJECT_DIR="/home/pranay/Documents/GitHub/CoDevians_9.12_SD_G9"
REMOTE_DIR="/home/$VM_USER/CoDevians"

echo "Deploying to $VM_USER@$VM_IP..."

# Ensure permissions
chmod 400 $SSH_KEY
chmod +x $PROJECT_DIR/deployment/setup_vm.sh

# Sync files
echo "Syncing files..."
rsync -avz -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no" --exclude 'node_modules' --exclude '.git' --exclude '.next' --exclude 'dist' $PROJECT_DIR/ $VM_USER@$VM_IP:$REMOTE_DIR

# Execute remote commands
echo "Executing remote setup..."
ssh -i $SSH_KEY -o StrictHostKeyChecking=no $VM_USER@$VM_IP << EOF
    cd $REMOTE_DIR

    # Run setup if first time (you might want to comment this out after first run)
    chmod +x deployment/setup_vm.sh
    ./deployment/setup_vm.sh

    # Setup Nginx
    sudo cp deployment/codevians.nginx /etc/nginx/sites-available/codevians
    sudo ln -sf /etc/nginx/sites-available/codevians /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo nginx -t && sudo systemctl restart nginx

    # Start Services
    # Docker Compose V2 uses 'docker compose'
    docker compose up -d --build

    # Setup SSL (Interactive on first run, but we can try non-interactive or just print instruction)
    # sudo certbot --nginx -d codevians.online -d www.codevians.online --non-interactive --agree-tos -m pranay@example.com
    echo "To setup SSL run: sudo certbot --nginx -d codevians.online"
EOF

echo "Deployment complete!"

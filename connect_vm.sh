#!/bin/bash

# Azure VM SSH Connection Script
# VM IP: 20.197.1.61
# User: PranayGajbhiye

# Ensure the private key has correct permissions
chmod 400 /home/pranay/Downloads/docs/PranayGajbhiye.pem

# Connect to Azure VM
ssh -i /home/pranay/Downloads/docs/PranayGajbhiye.pem PranayGajbhiye@20.197.1.61

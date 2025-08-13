#!/bin/bash
set -e

echo "🚀 Setting up devcontainer..."

# Fix for git dubious ownership issue in Codespaces
git config --global --add safe.directory /workspaces/wchl-ts-workshop

# Install Azle CLI
echo "🔗 Installing Azle CLI..."
npm install -g azle@latest

# Install npm dependencies
echo "📦 Installing npm dependencies..."
npm install

# Set up dfx identity for codespace
echo "🔑 Setting up dfx identity..."
dfx identity new codespace_dev --storage-mode=plaintext || echo "Identity may already exist"
dfx identity use codespace_dev
dfx start --background
dfx stop

echo "✅ Devcontainer setup complete!"

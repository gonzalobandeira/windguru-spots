#!/bin/sh

# Exit on error
set -e

echo "Starting post-clone script..."

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install Node.js using Homebrew if not already installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    brew install node@18
    echo 'export PATH="/usr/local/opt/node@18/bin:$PATH"' >> ~/.zshrc
    source ~/.zshrc
else
    echo "Node.js is already installed"
fi

# Install CocoaPods using Homebrew if not already installed
if ! command -v pod &> /dev/null; then
    echo "Installing CocoaPods..."
    brew install cocoapods --cask
else
    echo "CocoaPods is already installed"
fi

# Print versions for debugging
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "CocoaPods version: $(pod --version)"

# Install project dependencies
echo "Installing project dependencies..."
cd "$CI_WORKSPACE"
npm install

# Install CocoaPods dependencies
echo "Installing CocoaPods dependencies..."
cd "$CI_WORKSPACE/ios"
pod install

echo "Post-clone script completed successfully"
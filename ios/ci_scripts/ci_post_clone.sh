#!/bin/sh

# Exit on error
set -e

echo "Starting post-clone script..."

# Set up paths
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
IOS_DIR="$PROJECT_ROOT/ios"

# Print environment for debugging
echo "Current directory: $(pwd)"
echo "Project root: $PROJECT_ROOT"
echo "iOS directory: $IOS_DIR"

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    # Add Homebrew to PATH if not already there
    eval "$(/opt/homebrew/bin/brew shellenv)"
fi

# Install Node.js 22 using Homebrew
echo "Installing Node.js 22..."
brew install node@22

# Set up Node.js environment
NODE_PATH="/usr/local/opt/node@22"
export PATH="$NODE_PATH/bin:$PATH"
export NODE_PATH="$NODE_PATH/lib/node_modules"

# Create a .node-version file for version tracking
echo "v22.15.0" > "$PROJECT_ROOT/.node-version"

# Verify Node.js installation
if ! command -v node &> /dev/null; then
    echo "Error: Node.js installation failed"
    exit 1
fi

# Install CocoaPods using Homebrew
echo "Installing CocoaPods..."
brew install cocoapods

# Verify CocoaPods installation
if ! command -v pod &> /dev/null; then
    echo "Error: CocoaPods installation failed"
    exit 1
fi

# Print versions for debugging
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "CocoaPods version: $(pod --version)"

# Install project dependencies
echo "Installing project dependencies..."
cd "$PROJECT_ROOT"
if ! npm install; then
    echo "Error: npm install failed"
    exit 1
fi

# Install CocoaPods dependencies
echo "Installing CocoaPods dependencies..."
cd "$IOS_DIR"
if ! pod install; then
    echo "Error: pod install failed"
    exit 1
fi

# Verify Podfile.lock exists
if [ ! -f "Podfile.lock" ]; then
    echo "Error: Podfile.lock was not generated"
    exit 1
fi

echo "Post-clone script completed successfully"
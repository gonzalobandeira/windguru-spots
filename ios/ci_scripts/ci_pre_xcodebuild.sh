#!/bin/sh

# Exit on error
set -e

echo "Starting pre-xcodebuild script..."

# Print environment for debugging
echo "Current directory: $(pwd)"
echo "XCODE_WORKSPACE: $XCODE_WORKSPACE"
echo "XCODE_SCHEME: $XCODE_SCHEME"

# Set up paths
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
IOS_DIR="$PROJECT_ROOT/ios"
BUILD_DIR="$IOS_DIR/build"

# Ensure Node.js is available
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    brew install node@18
    export PATH="/usr/local/opt/node@18/bin:$PATH"
fi

# Print versions
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Clean build artifacts
echo "Cleaning build folder..."
rm -rf "$BUILD_DIR"
rm -rf "$IOS_DIR/DerivedData"

# Install dependencies
echo "Installing React Native dependencies..."
cd "$PROJECT_ROOT"
npm install --save-dev @react-native-community/cli react-native

# Create build directory
mkdir -p "$BUILD_DIR/generated/ios"

# Run codegen
echo "Generating React Native code for iOS..."
export CODEGEN_OUTPUT_DIR="$BUILD_DIR/generated/ios"
npx react-native codegen --platform ios

# Set up build settings
export CODE_SIGN_IDENTITY="-"
export AD_HOC_CODE_SIGNING_ALLOWED=YES
export CODE_SIGN_STYLE=Automatic
export DEVELOPMENT_TEAM=4R3JX54K82
export COMPILER_INDEX_STORE_ENABLE=NO

echo "Pre-xcodebuild script completed successfully" 
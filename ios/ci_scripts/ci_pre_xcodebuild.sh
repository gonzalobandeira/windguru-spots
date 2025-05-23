#!/bin/sh

# Exit on error
set -e

echo "Starting pre-xcodebuild script..."

# Set up paths
PROJECT_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
IOS_DIR="$PROJECT_ROOT/ios"
BUILD_DIR="$IOS_DIR/build"
DERIVED_DATA_DIR="$IOS_DIR/DerivedData"

# Print environment for debugging
echo "Current directory: $(pwd)"
echo "Project root: $PROJECT_ROOT"
echo "iOS directory: $IOS_DIR"
echo "Build directory: $BUILD_DIR"
echo "XCODE_WORKSPACE: $XCODE_WORKSPACE"
echo "XCODE_SCHEME: $XCODE_SCHEME"

# Set up Node.js environment
NODE_PATH="/usr/local/opt/node@22"
export PATH="$NODE_PATH/bin:$PATH"
export NODE_PATH="$NODE_PATH/lib/node_modules"

# Verify Node.js installation and version
if ! command -v node &> /dev/null; then
    echo "Node.js not found in PATH, attempting to install..."
    if ! command -v brew &> /dev/null; then
        echo "Error: Homebrew is not installed"
        exit 1
    fi
    brew install node@22
    export PATH="$NODE_PATH/bin:$PATH"
    export NODE_PATH="$NODE_PATH/lib/node_modules"
fi

# Verify Node.js version
NODE_VERSION=$(node --version)
if [[ ! $NODE_VERSION =~ ^v22 ]]; then
    echo "Warning: Expected Node.js v22, but found $NODE_VERSION"
    echo "Attempting to switch to Node.js v22..."
    brew unlink node
    brew link node@22
    export PATH="$NODE_PATH/bin:$PATH"
    export NODE_PATH="$NODE_PATH/lib/node_modules"
    
    # Verify version again
    NODE_VERSION=$(node --version)
    if [[ ! $NODE_VERSION =~ ^v22 ]]; then
        echo "Error: Failed to switch to Node.js v22"
        exit 1
    fi
fi

# Print versions
echo "Node version: $NODE_VERSION"
echo "NPM version: $(npm --version)"

# Clean build artifacts
echo "Cleaning build artifacts..."
if [ -d "$BUILD_DIR" ]; then
    rm -rf "$BUILD_DIR"
fi
if [ -d "$DERIVED_DATA_DIR" ]; then
    rm -rf "$DERIVED_DATA_DIR"
fi

# Create build directory
echo "Creating build directory..."
mkdir -p "$BUILD_DIR/generated/ios"

# Install dependencies
echo "Installing React Native dependencies..."
cd "$PROJECT_ROOT"
if ! npm install --save-dev @react-native-community/cli react-native; then
    echo "Error: Failed to install React Native dependencies"
    exit 1
fi

# Run codegen with error handling
echo "Generating React Native code for iOS..."
export CODEGEN_OUTPUT_DIR="$BUILD_DIR/generated/ios"

# Run codegen and capture its output
if ! npx react-native codegen --platform ios; then
    echo "Codegen failed, but continuing with build..."
    # Check if essential files were generated
    ESSENTIAL_FILES=(
        "$BUILD_DIR/generated/ios/RCTThirdPartyComponentsProvider.h"
        "$BUILD_DIR/generated/ios/RCTModuleProviders.h"
        "$BUILD_DIR/generated/ios/RCTAppDependencyProvider.h"
    )
    
    MISSING_FILES=0
    for file in "${ESSENTIAL_FILES[@]}"; do
        if [ ! -f "$file" ]; then
            echo "Error: Missing essential file: $file"
            MISSING_FILES=1
        fi
    done
    
    if [ $MISSING_FILES -eq 1 ]; then
        echo "Error: Critical codegen files are missing, aborting build"
        exit 1
    else
        echo "Essential codegen files were generated, proceeding with build..."
    fi
fi

# Set up build settings
echo "Setting up build environment..."
export CODE_SIGN_IDENTITY="-"
export AD_HOC_CODE_SIGNING_ALLOWED=YES
export CODE_SIGN_STYLE=Automatic
export DEVELOPMENT_TEAM=4R3JX54K82
export COMPILER_INDEX_STORE_ENABLE=NO

# Verify workspace and scheme
if [ -z "$XCODE_WORKSPACE" ]; then
    echo "Warning: XCODE_WORKSPACE is not set"
fi
if [ -z "$XCODE_SCHEME" ]; then
    echo "Warning: XCODE_SCHEME is not set"
fi

echo "Pre-xcodebuild script completed successfully" 
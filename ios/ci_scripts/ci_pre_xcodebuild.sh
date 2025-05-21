#!/bin/sh

# Exit on error
set -e

echo "Starting pre-xcodebuild script..."

# Print environment for debugging
echo "Current directory: $(pwd)"
echo "XCODE_WORKSPACE: $XCODE_WORKSPACE"
echo "XCODE_SCHEME: $XCODE_SCHEME"

# Ensure we're in the iOS directory
cd "$(dirname "$0")/.."
echo "iOS directory: $(pwd)"

# Clean build folder
echo "Cleaning build folder..."
rm -rf build/
rm -rf DerivedData/

# Set up build settings
export CODE_SIGN_IDENTITY="-"
export AD_HOC_CODE_SIGNING_ALLOWED=YES
export CODE_SIGN_STYLE=Automatic
export DEVELOPMENT_TEAM=4R3JX54K82
export COMPILER_INDEX_STORE_ENABLE=NO

echo "Pre-xcodebuild script completed successfully" 
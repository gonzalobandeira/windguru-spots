#!/bin/sh

# Exit on error
set -e

echo "Starting post-build script for release..."

# This script runs after a successful build in Xcode Cloud
# It can be used to perform additional tasks after the build is complete

# Print environment variables for debugging
echo "CI_PRODUCT: $CI_PRODUCT"
echo "CI_ARCHIVE_PATH: $CI_ARCHIVE_PATH"
echo "CI_DERIVED_DATA_PATH: $CI_DERIVED_DATA_PATH"
echo "CI_XCODE_PROJECT: $CI_XCODE_PROJECT"
echo "CI_XCODE_SCHEME: $CI_XCODE_SCHEME"
echo "CI_WORKFLOW: $CI_WORKFLOW"
echo "CI_BUILD_NUMBER: $CI_BUILD_NUMBER"
echo "CI_COMMIT: $CI_COMMIT"
echo "CI_TAG: $CI_TAG"
echo "CI_PULL_REQUEST_NUMBER: $CI_PULL_REQUEST_NUMBER"

# If this is a GitHub release build, we can perform additional tasks
if [ -n "$CI_TAG" ]; then
    echo "This is a release build for tag: $CI_TAG"
    
    # Example: You could notify your team about the successful release build
    # curl -X POST -H "Content-Type: application/json" -d "{\"text\":\"🚀 New release $CI_TAG has been built and uploaded to App Store Connect!\"}" YOUR_WEBHOOK_URL
    
    # Example: You could update a release notes file or database
    echo "Release $CI_TAG was built on $(date)" >> release_history.txt
fi

echo "Post-build script completed successfully"


#!/bin/sh

# Exit on error
set -e

echo "Setting up Xcode Cloud workflow for automatic releases..."

# This script is a guide for setting up Xcode Cloud
# Note: Some steps require manual configuration in Xcode Cloud UI

# 1. Make sure you have the Apple Developer Program membership
echo "Prerequisites:"
echo "- Apple Developer Program membership"
echo "- GitHub repository connected to Xcode Cloud"
echo "- Proper app signing certificates and provisioning profiles"

# 2. Instructions for setting up Xcode Cloud in Xcode
echo ""
echo "To set up Xcode Cloud, follow these steps in Xcode:"
echo "1. Open the WindguruSpots.xcworkspace in Xcode"
echo "2. Go to Product > Xcode Cloud > Create Workflow..."
echo "3. Select the WindguruSpots app"
echo "4. Configure the workflow with the following settings:"
echo "   - Name: Release Workflow"
echo "   - Trigger: GitHub Release (When a release is created)"
echo "   - Branch: main (or your release branch)"
echo "   - Actions: Build for App Store Connect distribution"
echo "   - Post-actions: Automatically submit for App Store review (optional)"
echo "5. Click 'Next' and then 'Create Workflow'"

# 3. Instructions for testing the workflow
echo ""
echo "To test the workflow (for development purposes):"
echo "1. In Xcode, go to Product > Xcode Cloud > Start New Build..."
echo "2. Select the Release Workflow"
echo "3. Choose the branch to build from"
echo "4. Click 'Start Build'"

# 4. Instructions for GitHub release trigger
echo ""
echo "To trigger a build with a GitHub release:"
echo "1. Go to your GitHub repository"
echo "2. Click on 'Releases' in the right sidebar"
echo "3. Click 'Create a new release'"
echo "4. Choose a tag version (e.g., v1.0.0)"
echo "5. Add a title and description"
echo "6. Click 'Publish release'"
echo "7. This will automatically trigger the Xcode Cloud workflow"

echo ""
echo "Note: The first time you set up Xcode Cloud, you may need to authorize it to access your GitHub repository."
echo "This setup script serves as a guide. Some steps require manual configuration in the Xcode UI."


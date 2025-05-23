# Xcode Cloud Setup for Automatic Releases

This document explains how to set up and use Xcode Cloud for automatic builds and releases of the WindguruSpots iOS app.

## Overview

Xcode Cloud is Apple's continuous integration and delivery service built into Xcode. It automatically builds your app, runs tests, and distributes it to testers and the App Store.

In this setup, Xcode Cloud will automatically build and upload the app to App Store Connect when a new release is created in GitHub.

## Prerequisites

- Apple Developer Program membership
- GitHub repository connected to Xcode Cloud
- Proper app signing certificates and provisioning profiles
- Xcode 13 or later

## Setup Instructions

### 1. Initial Setup in Xcode

1. Open the WindguruSpots.xcworkspace in Xcode
2. Go to Product > Xcode Cloud > Create Workflow...
3. Select the WindguruSpots app
4. Configure the workflow with the following settings:
   - Name: Release Workflow
   - Trigger: GitHub Release (When a release is created)
   - Branch: main (or your release branch)
   - Actions: Build for App Store Connect distribution
   - Post-actions: Automatically submit for App Store review (optional)
5. Click 'Next' and then 'Create Workflow'

### 2. CI Scripts

The following CI scripts are included in the project:

- `ci_post_clone.sh`: Runs after the repository is cloned, sets up the environment
- `ci_pre_xcodebuild.sh`: Runs before the Xcode build process starts
- `ci_release_post_build.sh`: Runs after a successful build (for releases)

These scripts handle the necessary setup and configuration for the build process.

### 3. Testing the Workflow

To test the workflow (for development purposes):

1. In Xcode, go to Product > Xcode Cloud > Start New Build...
2. Select the Release Workflow
3. Choose the branch to build from
4. Click 'Start Build'

### 4. Triggering Builds with GitHub Releases

To trigger a build with a GitHub release:

1. Go to your GitHub repository
2. Click on 'Releases' in the right sidebar
3. Click 'Create a new release'
4. Choose a tag version (e.g., v1.0.0)
5. Add a title and description
6. Click 'Publish release'
7. This will automatically trigger the Xcode Cloud workflow

## Monitoring Builds

You can monitor your builds in Xcode:

1. Go to Product > Xcode Cloud > View All Workflows...
2. Select the workflow to see its build history
3. Click on a build to see its details, logs, and status

## Troubleshooting

If you encounter issues with Xcode Cloud builds:

1. Check the build logs in Xcode
2. Verify that your signing certificates and provisioning profiles are valid
3. Ensure that the CI scripts have the correct permissions
4. Check that your GitHub repository is properly connected to Xcode Cloud

## Additional Resources

- [Xcode Cloud Documentation](https://developer.apple.com/documentation/xcode/xcode-cloud)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)


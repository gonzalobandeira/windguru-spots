# CI Scripts for Xcode Cloud

This directory contains scripts and configuration files for Xcode Cloud continuous integration and delivery.

## Scripts

- `ci_post_clone.sh`: Runs after the repository is cloned in Xcode Cloud. Sets up the environment, installs dependencies, and prepares the project for building.

- `ci_pre_xcodebuild.sh`: Runs before the Xcode build process starts. Performs additional setup tasks specific to the build process.

- `ci_release_post_build.sh`: Runs after a successful build for releases. Can be used to perform additional tasks after the build is complete.

- `setup_xcode_cloud.sh`: A guide script that provides instructions for setting up Xcode Cloud workflows in Xcode.

## Configuration Files

- `xcode_cloud_workflow.json`: Configuration for the main release workflow that builds and uploads the app when a new GitHub release is created.

- `xcode_cloud_test_workflow.json`: Configuration for a test workflow that can be used to test the Xcode Cloud setup on the current branch.

## Usage

These scripts are automatically used by Xcode Cloud during the build process. You don't need to run them manually.

To set up Xcode Cloud, follow the instructions in the `setup_xcode_cloud.sh` script or refer to the `XcodeCloudSetup.md` document in the iOS directory.

## Testing

To test the Xcode Cloud setup without creating a GitHub release, you can use the test workflow configuration. This will trigger a build when changes are pushed to the specified branch.

## Notes

- The workflow configuration files (`xcode_cloud_workflow.json` and `xcode_cloud_test_workflow.json`) are for reference only. The actual workflow configuration is done in the Xcode Cloud UI.

- Make sure all scripts have executable permissions (`chmod +x script_name.sh`).

- These scripts assume that the project is set up with the correct signing certificates and provisioning profiles.


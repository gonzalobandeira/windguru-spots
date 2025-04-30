#!/bin/bash

# Create the directory if it doesn't exist
mkdir -p assets/images/ios

# Generate iOS icons
convert assets/images/icon.png -resize 120x120 assets/images/ios/icon-120.png
convert assets/images/icon.png -resize 152x152 assets/images/ios/icon-152.png

echo "iOS icons generated successfully!" 
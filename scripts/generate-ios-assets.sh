#!/bin/bash

# Create necessary directories
mkdir -p ios/windguruspots/Images.xcassets/AppIcon.appiconset
mkdir -p ios/windguruspots/Images.xcassets/SplashScreen.imageset

# Source image paths
SOURCE_ICON="./assets/images/icon.png"
SOURCE_SPLASH="./assets/images/splash-icon.png"

# Generate all required iOS icon sizes
# iPhone
convert "$SOURCE_ICON" -resize 40x40 ios/windguruspots/Images.xcassets/AppIcon.appiconset/Icon-40.png
convert "$SOURCE_ICON" -resize 60x60 ios/windguruspots/Images.xcassets/AppIcon.appiconset/Icon-60.png
convert "$SOURCE_ICON" -resize 58x58 ios/windguruspots/Images.xcassets/AppIcon.appiconset/Icon-58.png
convert "$SOURCE_ICON" -resize 87x87 ios/windguruspots/Images.xcassets/AppIcon.appiconset/Icon-87.png
convert "$SOURCE_ICON" -resize 80x80 ios/windguruspots/Images.xcassets/AppIcon.appiconset/Icon-80.png
convert "$SOURCE_ICON" -resize 120x120 ios/windguruspots/Images.xcassets/AppIcon.appiconset/Icon-120.png
convert "$SOURCE_ICON" -resize 180x180 ios/windguruspots/Images.xcassets/AppIcon.appiconset/Icon-180.png

# iPad
convert "$SOURCE_ICON" -resize 20x20 ios/windguruspots/Images.xcassets/AppIcon.appiconset/Icon-20.png
convert "$SOURCE_ICON" -resize 29x29 ios/windguruspots/Images.xcassets/AppIcon.appiconset/Icon-29.png
convert "$SOURCE_ICON" -resize 76x76 ios/windguruspots/Images.xcassets/AppIcon.appiconset/Icon-76.png
convert "$SOURCE_ICON" -resize 152x152 ios/windguruspots/Images.xcassets/AppIcon.appiconset/Icon-152.png
convert "$SOURCE_ICON" -resize 167x167 ios/windguruspots/Images.xcassets/AppIcon.appiconset/Icon-167.png
convert "$SOURCE_ICON" -resize 1024x1024 ios/windguruspots/Images.xcassets/AppIcon.appiconset/Icon-1024.png

# Copy splash screen image
convert "$SOURCE_SPLASH" -resize 1242x2688 ios/windguruspots/Images.xcassets/SplashScreen.imageset/splash.png

# Create Contents.json for AppIcon
cat > ios/windguruspots/Images.xcassets/AppIcon.appiconset/Contents.json << 'EOL'
{
  "images" : [
    {
      "size" : "20x20",
      "idiom" : "iphone",
      "filename" : "Icon-40.png",
      "scale" : "2x"
    },
    {
      "size" : "20x20",
      "idiom" : "iphone",
      "filename" : "Icon-60.png",
      "scale" : "3x"
    },
    {
      "size" : "29x29",
      "idiom" : "iphone",
      "filename" : "Icon-58.png",
      "scale" : "2x"
    },
    {
      "size" : "29x29",
      "idiom" : "iphone",
      "filename" : "Icon-87.png",
      "scale" : "3x"
    },
    {
      "size" : "40x40",
      "idiom" : "iphone",
      "filename" : "Icon-80.png",
      "scale" : "2x"
    },
    {
      "size" : "40x40",
      "idiom" : "iphone",
      "filename" : "Icon-120.png",
      "scale" : "3x"
    },
    {
      "size" : "60x60",
      "idiom" : "iphone",
      "filename" : "Icon-120.png",
      "scale" : "2x"
    },
    {
      "size" : "60x60",
      "idiom" : "iphone",
      "filename" : "Icon-180.png",
      "scale" : "3x"
    },
    {
      "size" : "20x20",
      "idiom" : "ipad",
      "filename" : "Icon-20.png",
      "scale" : "1x"
    },
    {
      "size" : "20x20",
      "idiom" : "ipad",
      "filename" : "Icon-40.png",
      "scale" : "2x"
    },
    {
      "size" : "29x29",
      "idiom" : "ipad",
      "filename" : "Icon-29.png",
      "scale" : "1x"
    },
    {
      "size" : "29x29",
      "idiom" : "ipad",
      "filename" : "Icon-58.png",
      "scale" : "2x"
    },
    {
      "size" : "40x40",
      "idiom" : "ipad",
      "filename" : "Icon-40.png",
      "scale" : "1x"
    },
    {
      "size" : "40x40",
      "idiom" : "ipad",
      "filename" : "Icon-80.png",
      "scale" : "2x"
    },
    {
      "size" : "76x76",
      "idiom" : "ipad",
      "filename" : "Icon-76.png",
      "scale" : "1x"
    },
    {
      "size" : "76x76",
      "idiom" : "ipad",
      "filename" : "Icon-152.png",
      "scale" : "2x"
    },
    {
      "size" : "83.5x83.5",
      "idiom" : "ipad",
      "filename" : "Icon-167.png",
      "scale" : "2x"
    },
    {
      "size" : "1024x1024",
      "idiom" : "ios-marketing",
      "filename" : "Icon-1024.png",
      "scale" : "1x"
    }
  ],
  "info" : {
    "version" : 1,
    "author" : "xcode"
  }
}
EOL

# Create Contents.json for SplashScreen
cat > ios/windguruspots/Images.xcassets/SplashScreen.imageset/Contents.json << 'EOL'
{
  "images" : [
    {
      "filename" : "splash.png",
      "idiom" : "universal",
      "scale" : "1x"
    },
    {
      "idiom" : "universal",
      "scale" : "2x"
    },
    {
      "idiom" : "universal",
      "scale" : "3x"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
EOL

echo "iOS assets generated successfully!" 
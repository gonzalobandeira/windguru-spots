# Sailing Spots App

A React Native application built with Expo that allows users to check their preferred sailing/surf spots in one place using Windguru forecasts.

## Features

- View Windguru forecasts for your favorite sailing/surf spots
- Add new locations with custom names and Windguru spot IDs
- Delete locations you no longer need
- Cross-platform support for iOS, Android, and Web

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS testing) or Xcode
- Android Studio and Android Emulator (for Android testing)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd sailing-spots-app
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm start
```

4. Run on your preferred platform
```
npm run ios     # for iOS
npm run android # for Android
npm run web     # for Web
```

## How to Use

### Adding a New Location

1. Open the app and tap the "+ Add" button on the home screen
2. Enter a name for your location (e.g., "My Favorite Beach")
3. Enter the Windguru spot ID
   - You can find this in the URL of the Windguru forecast page (e.g., https://www.windguru.cz/48743 where 48743 is the spot ID)
4. Optionally, customize the model ID (default is 100)
5. Tap "Add Location" to save

### Viewing a Forecast

1. Tap on any location from your list on the home screen
2. The Windguru forecast will load in a full-screen view
3. Tap "← Back" to return to your locations list

### Deleting a Location

1. On the home screen, find the location you want to remove
2. Tap the "Delete" button next to the location
3. Confirm deletion when prompted

## Project Structure

- `src/components/WindguruWidget.js`: WebView component for displaying Windguru forecasts
- `src/models/Location.js`: Data model for sailing/surf spots
- `src/services/LocationService.js`: Handles storing and retrieving locations
- `src/screens/`: Contains all UI screens (Home, AddLocation, LocationDetail)
- `src/navigation/AppNavigator.js`: Manages navigation between screens

## Building for Production

### iOS/Android

To build standalone apps for iOS and Android, you can use EAS Build:

```
npm install -g eas-cli
eas build:configure
eas build --platform ios
eas build --platform android
```

### Web

To build for web deployment:

```
npm run web:build
```

## Customization

### Changing Default Parameters

You can modify the default Windguru widget parameters in the `WindguruWidget.js` component:

- Wind speed units (knots, m/s, etc.)
- Temperature units (Celsius, Fahrenheit)
- Displayed forecast parameters
- Forecast hours

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Check that you have the correct Windguru spot ID
3. Ensure you have an active internet connection
4. For web version issues, try clearing your browser cache

## License

This project is licensed under the MIT License - see the LICENSE file for details.

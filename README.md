# Windguru Spots
<img src="assets/images/icon.png" alt="Windguru Spots Icon" width="100" height="100" />

A React Native application built with Expo that allows users to check their preferred sailing/surf spots in one place using Windguru forecasts. This app is designed for sailors and surfers who want to quickly check conditions at their favorite spots without having to visit multiple websites or remember different spot IDs.

## Features

- View Windguru forecasts for your favorite sailing/surf spots
- Organize spots into custom groups
- Drag and drop to reorder spots and groups
- Add new locations with custom names and Windguru spot IDs
- Choose from different forecast models
- Delete locations and groups
- Export and import your spots and groups
- Cross-platform support for iOS and Android (on the roadmap)

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS testing) or Xcode
- Android Studio and Android Emulator (for Android testing)

### Installation

1. Clone the repository
```bash
git clone https://github.com/gonzalobandeira/windguru-spots.git
cd windguru-spots
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Run on your preferred platform
```bash
npm run ios     # for iOS
npm run android # for Android
```

## Download the App

Get Windguru Spots on your device:

<p>
  <a href="https://apps.apple.com/es/app/windguruspots/id6745230519?l=en-GB">
    <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" width="150" height="45" alt="Download on the App Store" />
  </a>
  </span>
</p>

## How to Use

### Adding a New Location

1. Open the app and tap the "+ Add" button on the home screen
2. Enter a name for your location (e.g., "My Favorite Beach")
3. Enter the Windguru spot ID
   - You can find this in the URL of the Windguru forecast page (e.g., https://www.windguru.cz/48743 where 48743 is the spot ID)
4. Select a forecast model (default is WG)
5. Optionally, add the spot to a group
6. Tap "Add Location" to save

### Managing Groups

1. When adding a new spot, you can:
   - Select an existing group
   - Create a new group
2. Groups can be:
   - Expanded/collapsed to show/hide spots
   - Reordered via drag and drop
   - Deleted (spots will also be deleted)

### Viewing Forecasts

1. Your spots are organized in groups and ungrouped spots
2. Each spot shows a Windguru forecast widget
3. Pull to refresh to update forecasts
4. Tap on a group to expand/collapse it

### Exporting and Importing

1. Tap the import/export icon in the header
2. To export:
   - Tap "Export" to save your spots and groups
   - Share the exported file
3. To import:
   - Tap "Import" and select an export file
   - Confirm to replace current data

## Project Structure

- `docs/`: Documentation files
  - `LICENSE`: MIT License file
  - `PRIVACY.md` and `PRIVACY.html`: Privacy policy
  - `SUPPORT.md` and `SUPPORT.html`: Support information
  - `TERMS_OF_USE.md` and `TERMS_OF_USE.html`: Terms of use
- `src/components/`: Reusable UI components
  - `WindguruWidget.js`: WebView component for displaying Windguru forecasts
- `src/constants/`: App-wide constants and configurations
  - `Models.js`: Available forecast models
  - `Styles.js`: UI styling constants
  - `Limits.js`: App limits and restrictions
- `src/hooks/`: Custom React hooks
- `src/models/`: Data models
  - `Location.js`: Spot data model
  - `Group.js`: Group data model
- `src/navigation/`: Navigation configuration
- `src/screens/`: UI screens
  - `HomeScreen.js`: Main screen with spots and groups
  - `AddLocationScreen.js`: Add new spots
  - `ExportImportScreen.js`: Data backup and restore
- `src/services/`: Data management
  - `LocationService.js`: Spot data operations
  - `GroupService.js`: Group data operations
- `src/styles/`: Screen-specific styles

## Known Issues and Limitations

- The app currently supports iOS and Android only
- There's a limit of 20 spots per user (to follow Windguru limitations)
- Widget loading might be slow on poor internet connections

## Contributing

Contributions are welcome! If you find a bug or have an idea for a new feature, please:

1. Check if there's already an open issue about it
2. If not, create a new issue describing the bug or feature
3. Fork the repository
4. Create a new branch for your changes
5. Make your changes
6. Submit a pull request

You can also report issues and bugs directly to gonzalobandeira@gmail.com

### Development Guidelines

- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed
- Test your changes on both iOS and Android
- Keep pull requests focused and small

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Check that you have the correct Windguru spot ID
3. Ensure you have an active internet connection
4. If groups or spots aren't saving, check your device's storage permissions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Supporting the Project

If you find this app useful and want to support its development, you can:

- Star the repository on GitHub
- Share it with other sailors and surfers
- Report bugs and suggest improvements
- Contribute code through pull requests
- Make a donation through [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/gonzalobandeira?country.x=ES&locale.x=es_ES)
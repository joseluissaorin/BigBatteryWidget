# BigBatteryWidget

A simple, accessible Android battery widget app built with Expo and React Native. Designed for users with vision problems or elderly users who need a large, clear battery percentage display.

## Features

- Large, clear battery percentage display
- 4x1 home screen widget for Android
- Auto-updates battery level
- Battery optimization exemption request
- Color-coded battery levels (Green > 30%, Orange 15-30%, Red < 15%)
- Charging indicator

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Expo CLI and EAS CLI:
```bash
npm install -g expo-cli eas-cli
```

3. Create placeholder assets (required for build):
```bash
# Create placeholder images in assets directory
# You'll need: icon.png, adaptive-icon.png, splash.png, widget-preview.png
```

## Development

Since this app uses native Android widgets, you cannot use Expo Go. You need to create a development build:

```bash
# Prebuild the native projects
npx expo prebuild

# Run on Android device/emulator
npx expo run:android
```

## Building for Production

1. Configure your EAS account:
```bash
eas login
eas build:configure
```

2. Build APK for testing:
```bash
eas build --platform android --profile preview
```

3. Build for Google Play Store:
```bash
eas build --platform android --profile production
```

## Widget Installation

After installing the app:
1. Long press on your Android home screen
2. Select "Widgets"
3. Find "BigBatteryWidget" or "Battery Status"
4. Drag the 4x1 widget to your home screen

## Permissions

The app will request:
- Battery optimization exemption (for reliable widget updates)
- Auto-start permission (manufacturer-specific)

## Troubleshooting

- **Widget not updating**: Force stop the app and restart
- **Battery optimization dialog not showing**: Go to Settings > Apps > BigBatteryWidget > Battery > Unrestricted
- **Widget not appearing**: Reinstall the app and check widget list again

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
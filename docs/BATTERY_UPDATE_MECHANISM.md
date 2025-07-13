# Battery Update Mechanism Documentation

## Overview

FloriBattery uses a dual-layer approach to ensure instant battery updates for both the main app and the home screen widget. This document details how the battery monitoring and update system works.

## Architecture

### 1. React Native Layer (JavaScript)
- **Battery Monitoring**: Uses `expo-battery` to monitor battery level changes
- **Data Storage**: Stores battery data in both AsyncStorage and SharedPreferences
- **Widget Updates**: Triggers widget updates through `react-native-android-widget`

### 2. Native Android Layer (Java/Kotlin)
- **Battery Receiver**: Listens to system battery change broadcasts
- **Shared Storage**: Updates SharedPreferences accessible by the widget
- **Widget Provider**: Renders the widget UI with current battery data

## Key Components

### BatteryChangeReceiver.java
Located at: `android/app/src/main/java/com/floribattery/app/BatteryChangeReceiver.java`

This broadcast receiver:
1. Listens for `ACTION_BATTERY_CHANGED` system broadcasts
2. Calculates battery percentage from level and scale
3. Stores the value in SharedPreferences
4. Forces immediate widget updates using multiple methods:
   - `notifyAppWidgetViewDataChanged()` - Forces data refresh
   - Sends `ACTION_APPWIDGET_UPDATE` broadcast
   - Calls `onUpdate()` directly on the widget provider

**Important**: `ACTION_BATTERY_CHANGED` is a sticky broadcast that must be registered dynamically at runtime, not in the manifest.

### Registration Points

The BatteryChangeReceiver is registered in two places to ensure it's always active:

1. **MainApplication.kt** (Application level)
   - Registers on app startup
   - Ensures battery monitoring even when app is in background
   - Immediately processes current battery status on registration

2. **MainActivity.kt** (Activity level)
   - Provides redundant registration
   - Ensures receiver is active when app is in foreground

### React Native Integration

**App.js** handles battery updates from the JavaScript side:
1. Subscribes to battery level changes using `expo-battery`
2. Updates both AsyncStorage and SharedPreferences
3. Triggers widget updates asynchronously without blocking

**SharedPreferencesModule.java** provides a bridge between React Native and Android SharedPreferences, allowing JavaScript code to write battery data that the native widget can read.

## Data Flow

### When Battery Changes:

1. **System Broadcast**
   ```
   Android System → ACTION_BATTERY_CHANGED → BatteryChangeReceiver
   ```

2. **Native Update Path**
   ```
   BatteryChangeReceiver → SharedPreferences → Widget Update
   ```

3. **React Native Update Path**
   ```
   expo-battery → App.js → SharedPreferences & AsyncStorage → Widget Update
   ```

### Widget Update Process:

1. Battery change detected (either native or RN)
2. New battery level stored in SharedPreferences
3. Widget update triggered through:
   - AppWidgetManager broadcasts
   - Direct onUpdate() calls
   - React Native widget update requests
4. Widget reads from SharedPreferences and renders new UI

## SharedPreferences Structure

- **Preferences Name**: `"BatteryWidget"`
- **Key**: `"batteryLevel"`
- **Value**: Integer (0-100) representing battery percentage

## Widget Configuration

The widget provider (`widgetprovider_batterywidget.xml`) is configured with:
- **Update Period**: 30 minutes (1800000ms) - system minimum
- **Size**: 4x1 cells (250dp x 40dp)
- **Features**: Reconfigurable

Note: The 30-minute update period is a fallback. Actual updates happen instantly through the broadcast receiver.

## Why Instant Updates Work

1. **Sticky Broadcast**: `ACTION_BATTERY_CHANGED` is sent whenever battery level changes
2. **Dynamic Registration**: Receiver is registered at runtime, allowing it to receive sticky broadcasts
3. **Multiple Update Triggers**: Uses three different methods to ensure widget updates
4. **Dual Implementation**: Both native and React Native layers can trigger updates independently

## Troubleshooting

### Widget Not Updating
1. Check if BatteryChangeReceiver is registered in logcat
2. Verify SharedPreferences are being written
3. Ensure widget IDs are found by AppWidgetManager

### Delayed Updates
1. Check if battery optimization is affecting the app
2. Verify both MainApplication and MainActivity register the receiver
3. Ensure immediate battery status processing on registration

### Development Notes

- The manifest should NOT contain a receiver for `ACTION_BATTERY_CHANGED`
- Always register the receiver dynamically at runtime
- Use multiple update methods for maximum compatibility across Android versions
- Test on real devices as emulators may not properly simulate battery changes
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import { registerWidgetTaskHandler, registerWidgetConfigurationScreen } from 'react-native-android-widget';
import React from 'react';
import App from './App';
import { widgetTaskHandler } from './widget-task-handler';
import BatteryWidgetConfigScreen from './components/BatteryWidgetConfigScreen';

// Register the main app component
registerRootComponent(App);

// Register a placeholder BatteryWidget component for React Native
// This prevents the "View config getter callback" error
const PlaceholderBatteryWidget = () => null;
AppRegistry.registerComponent('BatteryWidget', () => PlaceholderBatteryWidget);

// Register the widget task handler
registerWidgetTaskHandler(widgetTaskHandler);

// Register widget configuration screen
// IMPORTANT: Pass the component directly, not a factory function
registerWidgetConfigurationScreen(BatteryWidgetConfigScreen);
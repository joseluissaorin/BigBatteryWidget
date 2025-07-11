import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import { registerWidgetTaskHandler, registerWidgetConfigurationScreen } from 'react-native-android-widget';
import React from 'react';
import App from './App';
import { widgetTaskHandler } from './widget-task-handler';
import BatteryWidgetConfigScreen from './components/BatteryWidgetConfigScreen';
import SafeBatteryWidget from './components/SafeBatteryWidget';
import testWidgetComponents from './test-widget-components';

// Run component availability test
testWidgetComponents();

console.log('[INDEX] Starting app registration');

// Register the main app component
registerRootComponent(App);
console.log('[INDEX] Main app registered');

// CRITICAL: Register BatteryWidget component with AppRegistry
// This is required because the configuration screen might try to render it
AppRegistry.registerComponent('BatteryWidget', () => {
  console.log('[INDEX] BatteryWidget component factory called');
  return SafeBatteryWidget;
});
console.log('[INDEX] BatteryWidget registered with SafeBatteryWidget');

// Register the widget task handler with logging
const loggingWidgetTaskHandler = async (props) => {
  console.log('[INDEX] Widget task handler called with props:', JSON.stringify(props));
  return widgetTaskHandler(props);
};
registerWidgetTaskHandler(loggingWidgetTaskHandler);
console.log('[INDEX] Widget task handler registered');

// Register widget configuration screen with extensive logging
const configFactory = () => {
  console.log('[INDEX] Configuration screen factory called');
  console.log('[INDEX] Returning BatteryWidgetConfigScreen component');
  return BatteryWidgetConfigScreen;
};

// Try minimal configuration first
import MinimalConfigScreen from './components/MinimalConfigScreen';

console.log('[INDEX] About to register configuration screen');
try {
  // Test with minimal config screen
  registerWidgetConfigurationScreen(() => {
    console.log('[INDEX] Minimal config factory called');
    return MinimalConfigScreen;
  });
  console.log('[INDEX] Minimal configuration screen registered successfully');
} catch (error) {
  console.error('[INDEX] Error registering configuration screen:', error);
}
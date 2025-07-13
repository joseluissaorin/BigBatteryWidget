import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, AppState, Platform, AppRegistry, NativeModules } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Battery from 'expo-battery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  BatteryOptEnabled, 
  OpenOptimizationSettings, 
  RequestDisableOptimization 
} from 'react-native-battery-optimization-check';
import BatteryDisplay from './components/BatteryDisplay';
import { requestWidgetUpdate } from 'react-native-android-widget';
import BasicWidget from './components/BasicWidget';
import { checkAndRequestAutoStart } from './modules/AutoStartHelper';

const SharedPreferences = NativeModules.SharedPreferences;

const BATTERY_OPT_REQUESTED_KEY = 'battery_optimization_requested';

export default function App() {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    initializeBattery();
    checkBatteryOptimization();
    checkAndRequestAutoStart(); // Add auto-start check

    const batteryLevelSubscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      handleBatteryUpdate(batteryLevel);
    });

    const batteryStateSubscription = Battery.addBatteryStateListener(({ batteryState }) => {
      setIsCharging(batteryState === Battery.BatteryState.CHARGING);
    });

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      batteryLevelSubscription.remove();
      batteryStateSubscription.remove();
      appStateSubscription.remove();
    };
  }, []);

  const initializeBattery = async () => {
    try {
      const level = await Battery.getBatteryLevelAsync();
      const state = await Battery.getBatteryStateAsync();
      
      handleBatteryUpdate(level);
      setIsCharging(state === Battery.BatteryState.CHARGING);
    } catch (error) {
      console.error('Error initializing battery:', error);
    }
  };

  const handleBatteryUpdate = async (level) => {
    const percentage = Math.round(level * 100);
    setBatteryLevel(percentage);
    
    // Update AsyncStorage for widget
    await AsyncStorage.setItem('@battery_level', percentage.toString());
    
    // Update SharedPreferences for native widget access
    if (SharedPreferences && SharedPreferences.setInt) {
      try {
        await SharedPreferences.setInt('BatteryWidget', 'batteryLevel', percentage);
        console.log('Updated SharedPreferences with battery level:', percentage);
      } catch (error) {
        console.error('Error updating SharedPreferences:', error);
      }
    }
    
    // Force immediate widget update - don't wait for the promise
    requestWidgetUpdate({
      widgetName: 'BatteryWidget',
      renderWidget: () => <BasicWidget batteryLevel={percentage} />,
      widgetNotFound: () => {
        console.log('No BatteryWidget found on home screen');
      },
    }).then(() => {
      console.log('Widget update completed with battery level:', percentage);
    }).catch(error => {
      console.error('Error updating widget:', error);
    });
  };

  const checkBatteryOptimization = async () => {
    if (Platform.OS !== 'android') return;

    try {
      // Always check current status
      const isOptEnabled = await BatteryOptEnabled();
      console.log('Battery optimization enabled:', isOptEnabled);
      
      if (isOptEnabled) {
        // Check if we've shown the dialog before
        const hasRequested = await AsyncStorage.getItem(BATTERY_OPT_REQUESTED_KEY);
        const lastRequestDate = hasRequested ? new Date(hasRequested) : null;
        const daysSinceLastRequest = lastRequestDate 
          ? (new Date() - lastRequestDate) / (1000 * 60 * 60 * 24)
          : Infinity;
        
        // Show dialog if never shown or if it's been more than 7 days
        if (!hasRequested || daysSinceLastRequest > 7) {
          Alert.alert(
            'Battery Optimization Detected',
            'Battery optimization is currently enabled for BigBatteryWidget. This may prevent the widget from updating properly in the background.\n\nDisabling battery optimization ensures accurate real-time battery updates.',
            [
              {
                text: 'Disable Now',
                onPress: async () => {
                  await AsyncStorage.setItem(BATTERY_OPT_REQUESTED_KEY, new Date().toISOString());
                  try {
                    // Try direct exemption first (may be blocked by Play Store policies)
                    await RequestDisableOptimization();
                  } catch (error) {
                    // Fallback to settings
                    OpenOptimizationSettings();
                  }
                }
              },
              {
                text: 'Open Settings',
                onPress: async () => {
                  await AsyncStorage.setItem(BATTERY_OPT_REQUESTED_KEY, new Date().toISOString());
                  OpenOptimizationSettings();
                }
              },
              {
                text: 'Later',
                style: 'cancel',
                onPress: async () => {
                  // Store date but don't disable
                  await AsyncStorage.setItem(BATTERY_OPT_REQUESTED_KEY, new Date().toISOString());
                }
              }
            ]
          );
        }
      } else {
        console.log('Battery optimization is already disabled');
      }
    } catch (error) {
      console.error('Error checking battery optimization:', error);
    }
  };

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      initializeBattery();
      // Check battery optimization when app comes to foreground
      checkBatteryOptimization();
    }
    setAppState(nextAppState);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />
      <BatteryDisplay 
        batteryLevel={batteryLevel} 
        isCharging={isCharging}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
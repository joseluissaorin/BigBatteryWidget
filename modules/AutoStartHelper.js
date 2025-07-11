import { Alert, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTO_START_REQUESTED_KEY = '@auto_start_requested';

// Manufacturer-specific auto-start settings
const AUTO_START_INTENTS = {
  xiaomi: {
    package: 'com.miui.securitycenter',
    activity: 'com.miui.permcenter.autostart.AutoStartManagementActivity',
  },
  oppo: {
    package: 'com.coloros.safecenter',
    activity: 'com.coloros.safecenter.permission.startup.StartupAppListActivity',
  },
  vivo: {
    package: 'com.vivo.permissionmanager',
    activity: 'com.vivo.permissionmanager.activity.BgStartUpManagerActivity',
  },
  honor: {
    package: 'com.huawei.systemmanager',
    activity: 'com.huawei.systemmanager.startupmgr.ui.StartupNormalAppListActivity',
  },
  huawei: {
    package: 'com.huawei.systemmanager',
    activity: 'com.huawei.systemmanager.startupmgr.ui.StartupNormalAppListActivity',
  },
  samsung: {
    package: 'com.samsung.android.lool',
    activity: 'com.samsung.android.sm.ui.battery.BatteryActivity',
  },
  oneplus: {
    package: 'com.oneplus.security',
    activity: 'com.oneplus.security.chainlaunch.view.ChainLaunchAppListActivity',
  },
};

export const getManufacturer = () => {
  const manufacturer = Platform.constants?.Manufacturer?.toLowerCase() || '';
  console.log('Device manufacturer:', manufacturer);
  return manufacturer;
};

export const hasAutoStartIntent = () => {
  const manufacturer = getManufacturer();
  return Object.keys(AUTO_START_INTENTS).some(key => 
    manufacturer.includes(key)
  );
};

export const openAutoStartSettings = async () => {
  const manufacturer = getManufacturer();
  let intentInfo = null;
  
  // Find matching manufacturer
  for (const [key, value] of Object.entries(AUTO_START_INTENTS)) {
    if (manufacturer.includes(key)) {
      intentInfo = value;
      break;
    }
  }
  
  if (!intentInfo) {
    Alert.alert(
      'Auto-start Settings',
      'Please manually enable auto-start for BigBatteryWidget in your device settings to ensure the widget updates properly.',
      [{ text: 'OK' }]
    );
    return;
  }
  
  try {
    // Try to open manufacturer-specific auto-start settings
    const url = `intent://${intentInfo.activity}#Intent;package=${intentInfo.package};end`;
    const canOpen = await Linking.canOpenURL(url);
    
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      // Fallback to general app settings
      await Linking.openSettings();
    }
  } catch (error) {
    console.error('Error opening auto-start settings:', error);
    // Fallback to general settings
    try {
      await Linking.openSettings();
    } catch (e) {
      Alert.alert(
        'Error',
        'Could not open settings. Please manually enable auto-start for BigBatteryWidget.',
        [{ text: 'OK' }]
      );
    }
  }
};

export const checkAndRequestAutoStart = async () => {
  if (Platform.OS !== 'android') return;
  
  try {
    // Check if we've already requested auto-start
    const hasRequested = await AsyncStorage.getItem(AUTO_START_REQUESTED_KEY);
    if (hasRequested) return;
    
    // Only show for supported manufacturers
    if (!hasAutoStartIntent()) {
      console.log('Auto-start not needed for this manufacturer');
      return;
    }
    
    // Show auto-start permission dialog
    Alert.alert(
      'Enable Auto-start',
      'To ensure the battery widget updates properly in the background, please enable auto-start for BigBatteryWidget.',
      [
        {
          text: 'Enable Now',
          onPress: async () => {
            await AsyncStorage.setItem(AUTO_START_REQUESTED_KEY, 'true');
            await openAutoStartSettings();
          }
        },
        {
          text: 'Later',
          style: 'cancel'
        }
      ]
    );
  } catch (error) {
    console.error('Error checking auto-start:', error);
  }
};

export default {
  checkAndRequestAutoStart,
  openAutoStartSettings,
  hasAutoStartIntent,
  getManufacturer,
};
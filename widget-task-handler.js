import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';

const BATTERY_LEVEL_KEY = '@battery_level';
const SharedPreferences = NativeModules.SharedPreferences;

// Map widget names to their components
const nameToWidget = {
  BatteryWidget: 'BasicWidget',
  BatteryWidget1x1Percentage: 'Widget1x1Percentage',
  BatteryWidget1x1Battery: 'Widget1x1Battery',
  BatteryWidget2x1Combo: 'Widget2x1Combo',
  BatteryWidget2x1Battery: 'Widget2x1Battery',
};

export async function widgetTaskHandler(props) {
  console.log('[WIDGET HANDLER] Called with action:', props?.widgetAction);
  console.log('[WIDGET HANDLER] Widget info:', JSON.stringify(props?.widgetInfo));
  
  // Handle cases where props might be undefined
  if (!props || !props.widgetInfo) {
    console.error('[WIDGET HANDLER] Called without proper props');
    return null;
  }

  const widgetInfo = props.widgetInfo;

  // Don't render widget during configuration
  if (props.widgetAction === 'WIDGET_CONFIGURE') {
    console.log('[WIDGET HANDLER] Skipping render for WIDGET_CONFIGURE');
    return null;
  }

  const widgetComponentName = nameToWidget[widgetInfo.widgetName];

  if (!widgetComponentName) {
    console.error('Widget not found:', widgetInfo.widgetName);
    return null;
  }

  // Return the actual widget component based on widget name
  let Widget;
  switch (widgetComponentName) {
    case 'Widget1x1Percentage':
      Widget = require('./components/Widget1x1Percentage').default;
      break;
    case 'Widget1x1Battery':
      Widget = require('./components/Widget1x1Battery').default;
      break;
    case 'Widget2x1Combo':
      Widget = require('./components/Widget2x1Combo').default;
      break;
    case 'Widget2x1Battery':
      Widget = require('./components/Widget2x1Battery').default;
      break;
    case 'BasicWidget':
    default:
      Widget = require('./components/BasicWidget').default;
      break;
  }
  console.log('[WIDGET HANDLER] Using', widgetComponentName);

  try {
    // Get battery level from native SharedPreferences (updated by BatteryChangeReceiver)
    let batteryLevel = 0;
    
    try {
      // Try to get from native SharedPreferences first
      if (SharedPreferences && SharedPreferences.getInt) {
        const nativeBatteryLevel = await SharedPreferences.getInt('BatteryWidget', 'batteryLevel');
        if (nativeBatteryLevel !== null && nativeBatteryLevel !== undefined) {
          batteryLevel = nativeBatteryLevel;
          console.log('[WIDGET HANDLER] Got battery level from SharedPreferences:', batteryLevel);
        }
      }
    } catch (error) {
      console.log('[WIDGET HANDLER] SharedPreferences not available, falling back to AsyncStorage');
    }
    
    // Fallback to AsyncStorage if SharedPreferences not available
    if (batteryLevel === 0) {
      try {
        const batteryLevelString = await AsyncStorage.getItem(BATTERY_LEVEL_KEY);
        batteryLevel = batteryLevelString ? parseInt(batteryLevelString, 10) : 0;
        console.log('[WIDGET HANDLER] Got battery level from AsyncStorage:', batteryLevel);
      } catch (error) {
        console.log('[WIDGET HANDLER] AsyncStorage not available, using default');
      }
    }
    
    console.log('[WIDGET HANDLER] Final battery level:', batteryLevel);

    // Log widget actions for debugging
    console.log(`[WIDGET HANDLER] Widget ${props.widgetAction}:`, widgetInfo.widgetId);

    // Render the widget using props.renderWidget for WIDGET_ADDED and WIDGET_UPDATE
    switch (props.widgetAction) {
      case 'WIDGET_ADDED':
      case 'WIDGET_UPDATE':
      case 'WIDGET_RESIZED':
        console.log('[WIDGET HANDLER] Calling props.renderWidget');
        if (props.renderWidget) {
          props.renderWidget(<Widget batteryLevel={batteryLevel} />);
        } else {
          console.error('[WIDGET HANDLER] No renderWidget function in props!');
        }
        break;
      
      case 'WIDGET_DELETED':
        console.log('[WIDGET HANDLER] Widget deleted');
        break;
        
      case 'WIDGET_CLICK':
        console.log('[WIDGET HANDLER] Widget clicked');
        if (props.clickAction === 'OPEN_APP') {
          console.log('[WIDGET HANDLER] Opening app');
        }
        break;
        
      default:
        console.log('[WIDGET HANDLER] Unknown action:', props.widgetAction);
    }
    
    // Don't return anything - the widget is rendered via props.renderWidget
    return null;
  } catch (error) {
    console.error('[WIDGET HANDLER] Error:', error);
    // In case of error, still try to render widget with 0 battery
    if (props.renderWidget) {
      props.renderWidget(<Widget batteryLevel={0} />);
    }
  }
}
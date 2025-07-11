package com.floribattery.app;

import android.appwidget.AppWidgetManager;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.os.BatteryManager;
import android.util.Log;

import com.floribattery.app.widget.BatteryWidget;

public class BatteryChangeReceiver extends BroadcastReceiver {
    private static final String TAG = "BatteryChangeReceiver";
    private static final String PREFS_NAME = "BatteryWidget";
    private static final String BATTERY_LEVEL_KEY = "batteryLevel";
    
    @Override
    public void onReceive(Context context, Intent intent) {
        if (Intent.ACTION_BATTERY_CHANGED.equals(intent.getAction())) {
            int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
            int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
            
            if (level != -1 && scale != -1) {
                int batteryPct = (level * 100) / scale;
                Log.d(TAG, "Battery level changed: " + batteryPct + "%");
                
                // Store in SharedPreferences
                SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
                prefs.edit().putInt(BATTERY_LEVEL_KEY, batteryPct).apply();
                
                // Request widget update via AppWidgetManager
                try {
                    AppWidgetManager appWidgetManager = AppWidgetManager.getInstance(context);
                    int[] widgetIds = appWidgetManager.getAppWidgetIds(
                        new ComponentName(context, BatteryWidget.class)
                    );
                    
                    if (widgetIds != null && widgetIds.length > 0) {
                        // Send update broadcast
                        Intent updateIntent = new Intent(context, BatteryWidget.class);
                        updateIntent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
                        updateIntent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, widgetIds);
                        context.sendBroadcast(updateIntent);
                        Log.d(TAG, "Widget update broadcast sent for " + widgetIds.length + " widgets");
                    } else {
                        Log.d(TAG, "No widgets found to update");
                    }
                } catch (Exception e) {
                    Log.e(TAG, "Failed to request widget update", e);
                }
            }
        }
    }
    
    public static void register(Context context) {
        IntentFilter filter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
        context.registerReceiver(new BatteryChangeReceiver(), filter);
        Log.d(TAG, "BatteryChangeReceiver registered");
    }
}
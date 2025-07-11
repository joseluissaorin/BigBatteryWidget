package com.floribattery.app;

import android.content.Context;
import android.content.SharedPreferences;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SharedPreferencesModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public SharedPreferencesModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "SharedPreferences";
    }

    @ReactMethod
    public void setInt(String prefsName, String key, int value, Promise promise) {
        try {
            SharedPreferences prefs = reactContext.getSharedPreferences(prefsName, Context.MODE_PRIVATE);
            prefs.edit().putInt(key, value).apply();
            promise.resolve(true);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void getInt(String prefsName, String key, Promise promise) {
        try {
            SharedPreferences prefs = reactContext.getSharedPreferences(prefsName, Context.MODE_PRIVATE);
            int value = prefs.getInt(key, 0);
            promise.resolve(value);
        } catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }
}
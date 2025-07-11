import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, Animated } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const BatteryDisplay = ({ batteryLevel, isCharging }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Smooth animation for battery level changes
    Animated.timing(animatedValue, {
      toValue: batteryLevel,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [batteryLevel]);

  useEffect(() => {
    // Pulse animation when charging
    if (isCharging) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnimation.setValue(1);
    }
  }, [isCharging]);

  // Simple, accessible colors
  const getColor = () => {
    if (batteryLevel <= 20) return '#FF3737';
    if (batteryLevel <= 40) return '#FF9500';
    return '#34C759';
  };

  const color = getColor();
  
  const animatedWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, screenWidth - 40],
  });

  return (
    <View style={styles.container}>
      {/* Main display */}
      <Animated.View 
        style={[
          styles.mainDisplay,
          {
            transform: [{ scale: pulseAnimation }]
          }
        ]}
      >
        {/* Large battery percentage */}
        <View style={styles.percentageRow}>
          <Text style={[styles.percentageNumber, { color }]}>
            {batteryLevel}
          </Text>
          <Text style={[styles.percentageSymbol, { color: color + 'AA' }]}>
            %
          </Text>
        </View>
        
        {/* Status text */}
        <Text style={[styles.statusText, { color: color }]}>
          {batteryLevel > 80 ? 'Excellent' : 
           batteryLevel > 50 ? 'Good' : 
           batteryLevel > 20 ? 'Fair' : 'Low'}
        </Text>
      </Animated.View>
      
      {/* Minimal progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <Animated.View 
            style={[
              styles.progressFill,
              {
                width: animatedWidth,
                backgroundColor: color,
              }
            ]}
          >
            {/* Gradient overlay */}
            <View style={[styles.progressGradient, { backgroundColor: color + '30' }]} />
          </Animated.View>
          
          {/* Percentage text inside bar */}
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>
              {batteryLevel}%
            </Text>
          </View>
        </View>
      </View>
      
      {/* Charging indicator */}
      {isCharging && (
        <View style={styles.chargingContainer}>
          <Text style={[styles.chargingText, { color }]}>
            ⚡ Charging
          </Text>
        </View>
      )}
      
      {/* Minimal info cards */}
      <View style={styles.infoContainer}>
        <View style={[styles.infoCard, { borderColor: color + '20' }]}>
          <Text style={styles.infoLabel}>Battery Level</Text>
          <Text style={[styles.infoValue, { color }]}>{batteryLevel}%</Text>
        </View>
        <View style={[styles.infoCard, { borderColor: color + '20' }]}>
          <Text style={styles.infoLabel}>Status</Text>
          <Text style={[styles.infoValue, { color }]}>
            {isCharging ? 'Charging' : 'Discharging'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mainDisplay: {
    alignItems: 'center',
    marginBottom: 50,
  },
  percentageRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  percentageNumber: {
    fontSize: 120,
    fontWeight: '800',
    letterSpacing: -6,
  },
  percentageSymbol: {
    fontSize: 48,
    fontWeight: '300',
    marginLeft: 4,
  },
  statusText: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 40,
  },
  progressBackground: {
    width: '100%',
    height: 48,
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: {
    height: '100%',
    borderRadius: 24,
    position: 'relative',
  },
  progressGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 24,
    borderRadius: 24,
  },
  progressTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: '#000000AA',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  chargingContainer: {
    marginBottom: 30,
  },
  chargingText: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  infoCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    padding: 20,
    flex: 0.48,
    alignItems: 'center',
    borderWidth: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default BatteryDisplay;
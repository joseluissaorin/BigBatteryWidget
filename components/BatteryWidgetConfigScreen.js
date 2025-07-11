import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

console.log('[CONFIG SCREEN] BatteryWidgetConfigScreen module loaded');

const { width: screenWidth } = Dimensions.get('window');

// This is a completely separate component for configuration
// It does NOT use any widget components (FlexWidget, TextWidget, etc.)
const BatteryWidgetConfigScreen = (props) => {
  // Based on our testing, props are passed directly, not in initialProps
  const { widgetInfo, setResult } = props;
  
  // Handle case where widgetInfo might not be available yet
  if (!widgetInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  const handleAdd = () => {
    if (setResult) {
      setResult('ok');
    }
  };

  const handleCancel = () => {
    if (setResult) {
      setResult('cancel');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BigBatteryWidget</Text>
      <Text style={styles.description}>
        Add a battery level widget to your home screen
      </Text>
      
      {/* Widget Preview */}
      <View style={styles.previewCard}>
        <Text style={styles.previewLabel}>Widget Preview</Text>
        <View style={styles.preview}>
          <View style={styles.previewLeft}>
            <Text style={styles.previewPercentage}>75</Text>
            <Text style={styles.previewPercentSymbol}>%</Text>
          </View>
          <View style={styles.previewBarContainer}>
            <View style={styles.previewBar}>
              <View style={styles.previewFill} />
            </View>
          </View>
        </View>
      </View>

      {/* Feature highlights */}
      <View style={styles.featuresContainer}>
        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>⚡</Text>
          <Text style={styles.featureTitle}>Instant Updates</Text>
          <Text style={styles.featureDescription}>
            Real-time battery level updates
          </Text>
        </View>
        
        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>👁️</Text>
          <Text style={styles.featureTitle}>Clear Display</Text>
          <Text style={styles.featureDescription}>
            Large, easy-to-read numbers
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoIcon}>ℹ️</Text>
        <Text style={styles.infoText}>
          Updates instantly when battery level changes
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Add Widget</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
        <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '500',
  },
  previewCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#1A1A1A',
  },
  previewLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  preview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  previewLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginRight: 16,
  },
  previewPercentage: {
    fontSize: 36,
    fontWeight: '800',
    color: '#34C759',
    letterSpacing: -2,
  },
  previewPercentSymbol: {
    fontSize: 20,
    fontWeight: '300',
    color: '#34C759AA',
    marginLeft: 2,
  },
  previewBarContainer: {
    flex: 1,
  },
  previewBar: {
    height: 24,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#34C759',
    borderRadius: 12,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  featureCard: {
    backgroundColor: '#0A0A0A',
    borderRadius: 16,
    padding: 16,
    flex: 0.48,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#34C75920',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34C75910',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#34C75920',
  },
  infoIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#34C759',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#34C759',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 28,
    marginBottom: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
  },
  buttonText: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cancelButtonText: {
    color: '#FFFFFF',
  },
});

export default BatteryWidgetConfigScreen;
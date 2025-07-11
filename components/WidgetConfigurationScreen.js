import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WidgetConfigurationScreen = ({ widgetInfo, setResult }) => {
  // Handle case where widgetInfo might not be available yet
  if (!widgetInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery Widget Configuration</Text>
      <Text style={styles.info}>Widget ID: {widgetInfo.widgetId}</Text>
      <Text style={styles.info}>Widget Size: {widgetInfo.width}x{widgetInfo.height}</Text>
      <Text style={styles.description}>
        The battery widget will automatically update to show your current battery level.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // Configuration complete - accept the widget
          setResult('ok');
        }}
      >
        <Text style={styles.buttonText}>Add Widget</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => {
          // Cancel widget addition
          setResult('cancel');
        }}
      >
        <Text style={styles.buttonText}>Cancel</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#AAAAAA',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#00FF00',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#666666',
    marginTop: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WidgetConfigurationScreen;
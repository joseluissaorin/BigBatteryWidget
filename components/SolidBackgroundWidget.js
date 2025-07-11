import React from 'react';

const SolidBackgroundWidget = ({ batteryLevel = 0 }) => {
  console.log('[SOLID WIDGET] Rendering with batteryLevel:', batteryLevel);
  
  const { FlexWidget, TextWidget } = require('react-native-android-widget');
  
  const getColor = () => {
    if (batteryLevel <= 15) return '#FF3B30';
    if (batteryLevel <= 30) return '#FF9500';
    return '#34C759';
  };

  // Use opaque colors instead of transparency
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#000000', // Solid black - NO transparency
        borderRadius: 16,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      clickAction="OPEN_APP"
    >
      <TextWidget
        text={`${batteryLevel}%`}
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: getColor(),
          marginRight: 16,
          minWidth: 80,
          textAlign: 'center',
        }}
      />
      
      <FlexWidget
        style={{
          flex: 1,
          height: 24,
          backgroundColor: '#1C1C1C', // Solid dark gray
          borderRadius: 12,
          padding: 2,
        }}
      >
        <FlexWidget
          style={{
            width: `${batteryLevel}%`,
            height: '100%',
            backgroundColor: getColor(),
            borderRadius: 10,
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

export default SolidBackgroundWidget;
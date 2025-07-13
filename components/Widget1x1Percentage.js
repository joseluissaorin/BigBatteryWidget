import React from 'react';

const Widget1x1Percentage = ({ batteryLevel = 0 }) => {
  console.log('[1x1 PERCENTAGE WIDGET] Rendering with batteryLevel:', batteryLevel);
  
  const { FlexWidget, TextWidget } = require('react-native-android-widget');
  
  // Color based on battery level
  const getColor = () => {
    if (batteryLevel <= 20) return '#DC2626'; // Red
    if (batteryLevel <= 40) return '#F59E0B'; // Amber
    return '#10B981'; // Green
  };

  const color = getColor();
  
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#00000000', // Transparent background
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
      }}
      clickAction="OPEN_APP"
    >
      {/* Battery percentage sticker centered */}
      <FlexWidget
        style={{
          backgroundColor: '#E5E7EB', // Same gray as battery background
          borderRadius: 12,
          paddingHorizontal: 10,
          paddingVertical: 5,
          elevation: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TextWidget
          text={`${batteryLevel}%`}
          style={{
            fontSize: 18,
            fontWeight: '900',
            color: color, // Same color as battery bar (red/amber/green)
            fontFamily: 'sans-serif-black',
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

export default Widget1x1Percentage;
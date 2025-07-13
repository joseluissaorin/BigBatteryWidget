import React from 'react';

const Widget2x1Battery = ({ batteryLevel = 0 }) => {
  console.log('[2x1 BATTERY WIDGET] Rendering with batteryLevel:', batteryLevel);
  
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
        padding: 8,
      }}
      clickAction="OPEN_APP"
    >
      {/* Battery container */}
      <FlexWidget
        style={{
          width: '100%',
          height: 36,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* Main battery body */}
        <FlexWidget
          style={{
            flex: 1,
            height: '100%',
            backgroundColor: '#E5E7EB', // Gray background
            borderRadius: 12,
            flexDirection: 'row',
            overflow: 'hidden',
            elevation: 2,
          }}
        >
          {/* Create 100 segments for smooth continuous progress bar */}
          {[...Array(100)].map((_, index) => {
            const shouldFill = index < batteryLevel;
            
            return (
              <FlexWidget
                key={index}
                style={{
                  flex: 1,
                  height: '100%',
                  backgroundColor: shouldFill ? color : '#E5E7EB',
                }}
              />
            );
          })}
        </FlexWidget>
        
        {/* Battery terminal/tip */}
        <FlexWidget
          style={{
            width: 5,
            height: 14,
            backgroundColor: batteryLevel === 100 ? color : '#E5E7EB', // Fill with color when 100%
            borderTopRightRadius: 2.5,
            borderBottomRightRadius: 2.5,
            marginLeft: -1,
            elevation: 2,
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

export default Widget2x1Battery;
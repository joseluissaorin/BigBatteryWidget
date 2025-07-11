import React from 'react';

const BasicWidget = ({ batteryLevel = 0 }) => {
  console.log('[BASIC WIDGET] Rendering with batteryLevel:', batteryLevel);
  
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
      }}
      clickAction="OPEN_APP"
    >
      {/* Battery percentage sticker on the left */}
      <FlexWidget
        style={{
          backgroundColor: '#E5E7EB', // Same gray as battery background
          borderRadius: 14,
          paddingHorizontal: 12,
          paddingVertical: 6,
          elevation: 2,
          marginRight: 10,
        }}
      >
        <TextWidget
          text={`${batteryLevel}%`}
          style={{
            fontSize: 20,
            fontWeight: '900',
            color: color, // Same color as battery bar (red/amber/green)
            fontFamily: 'sans-serif-black',
          }}
        />
      </FlexWidget>
      
      {/* Battery container */}
      <FlexWidget
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* Main battery body */}
        <FlexWidget
          style={{
            flex: 1,
            height: 40,
            backgroundColor: '#E5E7EB', // Gray background
            borderRadius: 14,
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
            width: 6,
            height: 16,
            backgroundColor: batteryLevel === 100 ? color : '#E5E7EB', // Fill with color when 100%
            borderTopRightRadius: 3,
            borderBottomRightRadius: 3,
            marginLeft: -1,
            elevation: 2,
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

export default BasicWidget;
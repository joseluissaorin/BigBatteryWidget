import React from 'react';

const Widget2x1Combo = ({ batteryLevel = 0 }) => {
  console.log('[2x1 COMBO WIDGET] Rendering with batteryLevel:', batteryLevel);
  
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
        padding: 6,
      }}
      clickAction="OPEN_APP"
    >
      {/* Battery percentage sticker on the left */}
      <FlexWidget
        style={{
          backgroundColor: '#E5E7EB', // Same gray as battery background
          borderRadius: 12,
          paddingHorizontal: 10,
          paddingVertical: 5,
          elevation: 2,
          marginRight: 8,
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
            height: 28,
            backgroundColor: '#E5E7EB', // Gray background
            borderRadius: 10,
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
            width: 4,
            height: 12,
            backgroundColor: batteryLevel === 100 ? color : '#E5E7EB', // Fill with color when 100%
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
            marginLeft: -1,
            elevation: 2,
          }}
        />
      </FlexWidget>
    </FlexWidget>
  );
};

export default Widget2x1Combo;
import React from 'react';

const FullWidth4x1Widget = ({ batteryLevel = 0 }) => {
  console.log('[FULL WIDTH 4x1 WIDGET] Rendering with batteryLevel:', batteryLevel);
  
  const { FlexWidget, TextWidget } = require('react-native-android-widget');
  
  // Color based on battery level
  const getColor = () => {
    if (batteryLevel <= 20) return '#DC2626'; // Red
    if (batteryLevel <= 40) return '#F59E0B'; // Amber
    return '#10B981'; // Green
  };

  const color = getColor();
  
  // Calculate filled segments for smooth progress (40 segments for 4x1 widget)
  const totalSegments = 40;
  const filledSegments = Math.round((batteryLevel / 100) * totalSegments);
  
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#FFFFFF', // Solid white background
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 4, // Minimal padding
      }}
      clickAction="OPEN_APP"
    >
      {/* Single full-width progress bar */}
      <FlexWidget
        style={{
          height: 40, // Taller bar for 4x1 widget
          backgroundColor: '#E5E5E5', // Solid light gray
          borderRadius: 20,
          marginHorizontal: 4, // Very minimal margins
          padding: 3,
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        {/* Progress fill */}
        <FlexWidget
          style={{
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            borderRadius: 17,
            overflow: 'hidden',
          }}
        >
          {/* Filled segments */}
          {[...Array(totalSegments)].map((_, index) => (
            <FlexWidget
              key={index}
              style={{
                flex: 1,
                height: '100%',
                backgroundColor: index < filledSegments ? color : '#E5E5E5',
                // Smooth rounded corners
                borderTopLeftRadius: index === 0 ? 17 : 0,
                borderBottomLeftRadius: index === 0 ? 17 : 0,
                borderTopRightRadius: 
                  (index === filledSegments - 1 && filledSegments < totalSegments) || 
                  index === totalSegments - 1 ? 17 : 0,
                borderBottomRightRadius: 
                  (index === filledSegments - 1 && filledSegments < totalSegments) || 
                  index === totalSegments - 1 ? 17 : 0,
              }}
            />
          ))}
        </FlexWidget>
        
        {/* Percentage text centered inside the bar */}
        <FlexWidget
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextWidget
            text={`${batteryLevel}%`}
            style={{
              fontSize: 22,
              fontWeight: '900',
              color: batteryLevel > 50 ? '#FFFFFF' : '#333333', // White on filled, dark on empty
              fontFamily: 'sans-serif-black',
              textShadowColor: batteryLevel > 50 ? '#00000080' : '#FFFFFF80',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}
          />
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
};

export default FullWidth4x1Widget;
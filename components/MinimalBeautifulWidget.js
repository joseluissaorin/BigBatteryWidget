import React from 'react';

const MinimalBeautifulWidget = ({ batteryLevel = 0 }) => {
  console.log('[MINIMAL WIDGET] Rendering with batteryLevel:', batteryLevel);
  
  const { FlexWidget, TextWidget } = require('react-native-android-widget');
  
  // Color based on battery level - works in both light and dark modes
  const getColor = () => {
    if (batteryLevel <= 20) return '#DC2626'; // Red
    if (batteryLevel <= 40) return '#F59E0B'; // Amber
    return '#10B981'; // Green
  };

  const color = getColor();
  
  // Calculate the number of filled boxes (out of 20 total)
  const totalBoxes = 20;
  const filledBoxes = Math.ceil((batteryLevel / 100) * totalBoxes);
  
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#00000000', // Transparent to adapt to wallpaper
        padding: 8,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      clickAction="OPEN_APP"
    >
      {/* Main container with subtle background */}
      <FlexWidget
        style={{
          backgroundColor: '#00000080', // Semi-transparent black
          borderRadius: 16,
          padding: 12,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#FFFFFF20', // Subtle white border
        }}
      >
        {/* Large percentage number on the left */}
        <FlexWidget
          style={{
            backgroundColor: color + '20', // 20% opacity of battery color
            borderRadius: 12,
            padding: 8,
            marginRight: 12,
            minWidth: 72,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: color,
          }}
        >
          <TextWidget
            text={`${batteryLevel}%`}
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#FFFFFF',
              textAlign: 'center',
              fontFamily: 'sans-serif-medium',
            }}
          />
        </FlexWidget>
        
        {/* Progress bar container */}
        <FlexWidget
          style={{
            flex: 1,
            height: 36,
            backgroundColor: '#00000060', // 60% black
            borderRadius: 18,
            padding: 2,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#FFFFFF10',
          }}
        >
          {/* Filled portion using boxes */}
          {[...Array(totalBoxes)].map((_, index) => (
            <FlexWidget
              key={index}
              style={{
                flex: 1,
                height: '100%',
                backgroundColor: index < filledBoxes ? color : '#00000000',
                borderRadius: index === 0 ? 16 : 0,
                borderTopRightRadius: index === filledBoxes - 1 && filledBoxes < totalBoxes ? 16 : 
                                     index === totalBoxes - 1 ? 16 : 0,
                borderBottomRightRadius: index === filledBoxes - 1 && filledBoxes < totalBoxes ? 16 : 
                                        index === totalBoxes - 1 ? 16 : 0,
                marginRight: index < totalBoxes - 1 && index < filledBoxes - 1 ? 1 : 0,
              }}
            />
          ))}
          
          {/* Percentage text overlay in the center of the bar */}
          <FlexWidget
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextWidget
              text={`${batteryLevel}%`}
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: batteryLevel > 50 ? '#FFFFFF' : '#FFFFFF',
                textAlign: 'center',
                fontFamily: 'sans-serif-medium',
                textShadowColor: '#00000080',
                textShadowRadius: 2,
              }}
            />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
};

export default MinimalBeautifulWidget;
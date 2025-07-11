import React from 'react';

const AdaptiveFullWidthWidget = ({ batteryLevel = 0 }) => {
  console.log('[ADAPTIVE FULL WIDTH WIDGET] Rendering with batteryLevel:', batteryLevel);
  
  const { FlexWidget, TextWidget } = require('react-native-android-widget');
  
  // Color based on battery level
  const getColor = () => {
    if (batteryLevel <= 20) return '#FF3737';
    if (batteryLevel <= 40) return '#FF9500';
    return '#34C759';
  };

  const color = getColor();
  
  // Calculate filled segments (using 30 for smoother appearance on full width)
  const totalSegments = 30;
  const filledSegments = Math.round((batteryLevel / 100) * totalSegments);
  
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#00000000', // Fully transparent to show wallpaper
        padding: 0, // Remove padding to maximize width
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      clickAction="OPEN_APP"
    >
      {/* Main container with adaptive colors */}
      <FlexWidget
        style={{
          backgroundColor: '#FFFFFF', // White background for light mode
          borderRadius: 20,
          paddingVertical: 8,
          paddingHorizontal: 12,
          marginHorizontal: 8, // Small margin from edges
          flexDirection: 'row',
          alignItems: 'center',
          // Shadow effect for depth
          elevation: 4,
        }}
      >
        {/* Battery percentage on the left */}
        <FlexWidget
          style={{
            backgroundColor: color + '15', // 15% opacity of battery color
            borderRadius: 12,
            paddingVertical: 6,
            paddingHorizontal: 12,
            marginRight: 12,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: color,
          }}
        >
          <TextWidget
            text={`${batteryLevel}%`}
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: color, // Use battery color for text
              textAlign: 'center',
              fontFamily: 'sans-serif-medium',
            }}
          />
        </FlexWidget>
        
        {/* Full width progress bar */}
        <FlexWidget
          style={{
            flex: 1, // Take all available width
            height: 28,
            backgroundColor: '#F0F0F0', // Light gray for empty portion
            borderRadius: 14,
            padding: 2,
            flexDirection: 'row',
            overflow: 'hidden',
          }}
        >
          {/* Smooth fill using multiple segments */}
          <FlexWidget
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'row',
            }}
          >
            {[...Array(totalSegments)].map((_, index) => (
              <FlexWidget
                key={index}
                style={{
                  flex: 1,
                  height: '100%',
                  backgroundColor: index < filledSegments ? color : '#00000000',
                  borderRadius: index === 0 ? 12 : 0,
                  borderTopRightRadius: index === filledSegments - 1 && filledSegments < totalSegments ? 12 : 
                                       index === totalSegments - 1 ? 12 : 0,
                  borderBottomRightRadius: index === filledSegments - 1 && filledSegments < totalSegments ? 12 : 
                                          index === totalSegments - 1 ? 12 : 0,
                }}
              />
            ))}
          </FlexWidget>
          
          {/* Percentage text overlay inside the bar */}
          <FlexWidget
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '100%',
              justifyContent: 'center',
              paddingLeft: 10,
            }}
          >
            <TextWidget
              text={`${batteryLevel}%`}
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: batteryLevel > 50 ? '#FFFFFF' : '#333333', // White on filled, dark on empty
                fontFamily: 'sans-serif-medium',
              }}
            />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
};

export default AdaptiveFullWidthWidget;
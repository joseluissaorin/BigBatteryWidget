import React from 'react';

const UltraMinimalWidget = ({ batteryLevel = 0 }) => {
  console.log('[ULTRA MINIMAL WIDGET] Rendering with batteryLevel:', batteryLevel);
  
  const { FlexWidget, TextWidget } = require('react-native-android-widget');
  
  // Simple, accessible colors
  const getColor = () => {
    if (batteryLevel <= 20) return '#FF3737'; // Bright red
    if (batteryLevel <= 40) return '#FF9500'; // Orange
    return '#34C759'; // Green
  };

  const color = getColor();
  
  // Calculate filled segments (using 25 segments for smooth appearance)
  const totalSegments = 25;
  const filledSegments = Math.round((batteryLevel / 100) * totalSegments);
  
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#00000000', // Fully transparent
        padding: 4,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      clickAction="OPEN_APP"
    >
      {/* Single row design */}
      <FlexWidget
        style={{
          backgroundColor: '#000000E6', // 90% black - works on any wallpaper
          borderRadius: 24,
          paddingVertical: 14,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* Large percentage */}
        <TextWidget
          text={`${batteryLevel}`}
          style={{
            fontSize: 36,
            fontWeight: '800',
            color: '#FFFFFF',
            marginRight: 4,
            fontFamily: 'sans-serif-black',
          }}
        />
        <TextWidget
          text="%"
          style={{
            fontSize: 20,
            fontWeight: '400',
            color: '#FFFFFFAA',
            marginRight: 16,
            marginTop: 4,
            fontFamily: 'sans-serif',
          }}
        />
        
        {/* Elegant progress bar */}
        <FlexWidget
          style={{
            flex: 1,
            height: 32,
            backgroundColor: '#FFFFFF0D', // Very subtle white
            borderRadius: 16,
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
                  borderRadius: index === 0 ? 14 : 0,
                  borderTopRightRadius: index === filledSegments - 1 && filledSegments < totalSegments ? 14 : 
                                       index === totalSegments - 1 ? 14 : 0,
                  borderBottomRightRadius: index === filledSegments - 1 && filledSegments < totalSegments ? 14 : 
                                          index === totalSegments - 1 ? 14 : 0,
                }}
              />
            ))}
          </FlexWidget>
          
          {/* Clean percentage overlay */}
          <FlexWidget
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '100%',
              justifyContent: 'center',
              paddingLeft: 12,
            }}
          >
            <TextWidget
              text={`${batteryLevel}%`}
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: '#FFFFFF',
                fontFamily: 'sans-serif-bold',
                textShadowColor: '#000000AA',
                textShadowRadius: 1,
                textShadowOffset: { width: 0, height: 1 },
              }}
            />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
};

export default UltraMinimalWidget;
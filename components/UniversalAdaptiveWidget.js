import React from 'react';

const UniversalAdaptiveWidget = ({ batteryLevel = 0 }) => {
  console.log('[UNIVERSAL ADAPTIVE WIDGET] Rendering with batteryLevel:', batteryLevel);
  
  const { FlexWidget, TextWidget } = require('react-native-android-widget');
  
  // Color based on battery level
  const getColor = () => {
    if (batteryLevel <= 20) return '#DC2626'; // Red
    if (batteryLevel <= 40) return '#F59E0B'; // Amber
    return '#10B981'; // Green
  };

  const color = getColor();
  
  // Calculate filled segments (35 for ultra-smooth on full width)
  const totalSegments = 35;
  const filledSegments = Math.round((batteryLevel / 100) * totalSegments);
  
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#00000000', // Transparent
        padding: 0, // No padding to maximize space
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      clickAction="OPEN_APP"
    >
      {/* Outer container with subtle shadow effect */}
      <FlexWidget
        style={{
          marginHorizontal: 6, // Minimal margins
          marginVertical: 4,
          borderRadius: 22,
          backgroundColor: '#00000010', // Very subtle shadow
          padding: 2,
        }}
      >
        {/* Main container with semi-transparent adaptive background */}
        <FlexWidget
          style={{
            backgroundColor: '#FFFFFFCC', // 80% white - works on both light and dark
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 14,
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#00000010', // Subtle border
          }}
        >
          {/* Battery percentage display */}
          <FlexWidget
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              paddingVertical: 8,
              paddingHorizontal: 14,
              marginRight: 14,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: color,
              minWidth: 76,
              // Shadow for depth
              elevation: 2,
            }}
          >
            <TextWidget
              text={`${batteryLevel}%`}
              style={{
                fontSize: 24,
                fontWeight: '800',
                color: color,
                textAlign: 'center',
                fontFamily: 'sans-serif-black',
              }}
            />
          </FlexWidget>
          
          {/* Full width progress bar container */}
          <FlexWidget
            style={{
              flex: 1, // Take all remaining width
              height: 32,
              backgroundColor: '#00000008', // Very subtle background
              borderRadius: 16,
              padding: 3,
              flexDirection: 'row',
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: '#00000008',
            }}
          >
            {/* Progress bar fill */}
            <FlexWidget
              style={{
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                borderRadius: 13,
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
                    // First segment rounded left
                    borderTopLeftRadius: index === 0 ? 13 : 0,
                    borderBottomLeftRadius: index === 0 ? 13 : 0,
                    // Last filled segment rounded right if not full
                    borderTopRightRadius: 
                      (index === filledSegments - 1 && filledSegments < totalSegments) || 
                      index === totalSegments - 1 ? 13 : 0,
                    borderBottomRightRadius: 
                      (index === filledSegments - 1 && filledSegments < totalSegments) || 
                      index === totalSegments - 1 ? 13 : 0,
                  }}
                />
              ))}
            </FlexWidget>
            
            {/* Battery level text overlay */}
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
                text={batteryLevel > 80 ? 'Excellent' : batteryLevel > 50 ? 'Good' : batteryLevel > 20 ? 'Fair' : 'Low'}
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: '#333333',
                  fontFamily: 'sans-serif-medium',
                  letterSpacing: 0.5,
                }}
              />
            </FlexWidget>
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
};

export default UniversalAdaptiveWidget;
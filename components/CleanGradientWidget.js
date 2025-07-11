import React from 'react';

const CleanGradientWidget = ({ batteryLevel = 0 }) => {
  console.log('[CLEAN GRADIENT WIDGET] Rendering with batteryLevel:', batteryLevel);
  
  const { FlexWidget, TextWidget } = require('react-native-android-widget');
  
  // Modern color palette
  const getColorScheme = () => {
    if (batteryLevel <= 20) {
      return {
        primary: '#EF4444',   // Red
        secondary: '#FCA5A5', // Light red
        text: '#FFFFFF',
      };
    } else if (batteryLevel <= 40) {
      return {
        primary: '#F59E0B',   // Amber
        secondary: '#FCD34D', // Light amber
        text: '#FFFFFF',
      };
    } else {
      return {
        primary: '#10B981',   // Emerald
        secondary: '#6EE7B7', // Light emerald
        text: '#FFFFFF',
      };
    }
  };

  const colors = getColorScheme();
  
  // Simple calculation for filled width (using fixed steps)
  const getFilledWidth = () => {
    // Use 10 discrete steps for smoother appearance
    const step = Math.floor(batteryLevel / 10);
    return step * 10;
  };
  
  const filledPercentage = getFilledWidth();
  
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#00000000', // Transparent
        padding: 6,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      clickAction="OPEN_APP"
    >
      {/* Adaptive container */}
      <FlexWidget
        style={{
          backgroundColor: '#000000CC', // 80% black for contrast
          borderRadius: 20,
          padding: 16,
          flexDirection: 'row',
          alignItems: 'center',
          // Subtle glass effect
          borderWidth: 1,
          borderColor: '#FFFFFF15',
        }}
      >
        {/* Battery percentage - left side */}
        <TextWidget
          text={`${batteryLevel}%`}
          style={{
            fontSize: 32,
            fontWeight: '900',
            color: colors.primary,
            marginRight: 16,
            minWidth: 80,
            textAlign: 'right',
            fontFamily: 'sans-serif-black',
            letterSpacing: -1,
          }}
        />
        
        {/* Beautiful progress bar */}
        <FlexWidget
          style={{
            flex: 1,
            height: 44,
            backgroundColor: '#FFFFFF10', // 10% white
            borderRadius: 22,
            padding: 3,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#FFFFFF08',
          }}
        >
          {/* Progress fill container */}
          <FlexWidget
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'row',
            }}
          >
            {/* Create 10 segments for smooth progress */}
            {[...Array(10)].map((_, index) => {
              const segmentPercentage = (index + 1) * 10;
              const isVisible = segmentPercentage <= filledPercentage;
              const isPartial = segmentPercentage > filledPercentage && 
                               segmentPercentage - 10 < filledPercentage;
              
              return (
                <FlexWidget
                  key={index}
                  style={{
                    flex: 1,
                    height: '100%',
                    backgroundColor: isVisible ? colors.primary : '#00000000',
                    opacity: isPartial ? 0.5 : 1,
                    borderRadius: index === 0 ? 19 : 0,
                    borderTopRightRadius: isVisible && index === Math.floor(filledPercentage / 10) - 1 ? 19 : 0,
                    borderBottomRightRadius: isVisible && index === Math.floor(filledPercentage / 10) - 1 ? 19 : 0,
                  }}
                />
              );
            })}
          </FlexWidget>
          
          {/* Overlay with percentage text */}
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
              text={batteryLevel > 50 ? 'Charged' : batteryLevel > 20 ? 'Good' : 'Low'}
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#FFFFFFCC',
                textAlign: 'center',
                fontFamily: 'sans-serif-medium',
                letterSpacing: 0.5,
              }}
            />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
};

export default CleanGradientWidget;
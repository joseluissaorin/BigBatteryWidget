import React from 'react';

const BeautifulBatteryWidget = ({ batteryLevel = 0 }) => {
  console.log('[BEAUTIFUL WIDGET] Rendering with batteryLevel:', batteryLevel);
  
  const { FlexWidget, TextWidget, ImageWidget } = require('react-native-android-widget');
  
  // Color scheme based on battery level
  const getColorScheme = () => {
    if (batteryLevel <= 15) {
      return {
        primary: '#FF3B30',    // Red
        secondary: '#FF6B6B',  // Light red
        background: '#2D1F1F', // Dark red tint
        glow: '#FF3B3020'      // Red glow
      };
    } else if (batteryLevel <= 30) {
      return {
        primary: '#FF9500',    // Orange
        secondary: '#FFB84D',  // Light orange
        background: '#2D2519', // Dark orange tint
        glow: '#FF950020'      // Orange glow
      };
    } else {
      return {
        primary: '#34C759',    // Green
        secondary: '#5DD87A',  // Light green
        background: '#1F2D23', // Dark green tint
        glow: '#34C75920'      // Green glow
      };
    }
  };

  const colors = getColorScheme();
  
  // Create progress segments (10 segments for better visual)
  const totalSegments = 10;
  const filledSegments = Math.floor((batteryLevel / 100) * totalSegments);
  
  const renderProgressBar = () => {
    const segments = [];
    
    for (let i = 0; i < totalSegments; i++) {
      const isFilled = i < filledSegments;
      const isLastFilled = i === filledSegments - 1;
      
      segments.push(
        <FlexWidget
          key={i}
          style={{
            flex: 1,
            height: 24,
            backgroundColor: isFilled ? colors.primary : '#1A1A1A',
            marginRight: i < totalSegments - 1 ? 3 : 0,
            borderRadius: 4,
            // Add gradient effect to last filled segment
            opacity: isFilled ? (isLastFilled ? 0.9 : 1) : 1,
          }}
        />
      );
    }
    
    return segments;
  };

  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#0A0A0A',
        borderRadius: 20,
        padding: 16,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      clickAction="OPEN_APP"
    >
      {/* Main container with gradient background effect */}
      <FlexWidget
        style={{
          flex: 1,
          backgroundColor: colors.background,
          borderRadius: 16,
          padding: 14,
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: colors.primary + '30',
        }}
      >
        {/* Battery percentage with modern styling */}
        <FlexWidget
          style={{
            backgroundColor: '#0A0A0A',
            borderRadius: 12,
            padding: 12,
            marginRight: 16,
            borderWidth: 2,
            borderColor: colors.primary,
            minWidth: 100,
            alignItems: 'center',
          }}
        >
          <TextWidget
            text={`${batteryLevel}`}
            style={{
              fontSize: 36,
              fontWeight: 'bold',
              color: colors.primary,
              textAlign: 'center',
              fontFamily: 'sans-serif-medium',
            }}
          />
          <TextWidget
            text="%"
            style={{
              fontSize: 20,
              color: colors.secondary,
              textAlign: 'center',
              marginTop: -8,
              fontFamily: 'sans-serif',
            }}
          />
        </FlexWidget>
        
        {/* Progress bar container */}
        <FlexWidget
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Battery status text */}
          <TextWidget
            text={batteryLevel > 80 ? "Excellent" : batteryLevel > 50 ? "Good" : batteryLevel > 20 ? "Fair" : "Low Battery"}
            style={{
              fontSize: 12,
              color: colors.secondary,
              marginBottom: 6,
              fontFamily: 'sans-serif',
            }}
          />
          
          {/* Segmented progress bar */}
          <FlexWidget
            style={{
              height: 24,
              flexDirection: 'row',
              backgroundColor: '#0A0A0A',
              borderRadius: 6,
              padding: 3,
            }}
          >
            {renderProgressBar()}
          </FlexWidget>
          
          {/* Additional info */}
          <TextWidget
            text="Tap for details"
            style={{
              fontSize: 10,
              color: '#666666',
              marginTop: 6,
              fontFamily: 'sans-serif',
            }}
          />
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
};

export default BeautifulBatteryWidget;
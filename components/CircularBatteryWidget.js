import React from 'react';

const CircularBatteryWidget = ({ batteryLevel = 0 }) => {
  console.log('[CIRCULAR WIDGET] Rendering with batteryLevel:', batteryLevel);
  
  const { FlexWidget, TextWidget, SvgWidget } = require('react-native-android-widget');
  
  // Color scheme based on battery level
  const getColor = () => {
    if (batteryLevel <= 15) return '#FF3B30';
    if (batteryLevel <= 30) return '#FF9500';
    return '#34C759';
  };

  const color = getColor();
  
  // Calculate SVG arc for circular progress
  const radius = 35;
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (batteryLevel / 100) * circumference;

  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#000000',
        borderRadius: 20,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      clickAction="OPEN_APP"
    >
      {/* Circular progress with battery icon */}
      <FlexWidget
        style={{
          width: 80,
          height: 80,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}
      >
        <SvgWidget
          style={{
            width: 80,
            height: 80,
          }}
          svg={`
            <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
              <!-- Background circle -->
              <circle
                stroke="#1C1C1C"
                fill="none"
                stroke-width="${strokeWidth}"
                r="${normalizedRadius}"
                cx="40"
                cy="40"
              />
              <!-- Progress circle -->
              <circle
                stroke="${color}"
                fill="none"
                stroke-width="${strokeWidth}"
                stroke-dasharray="${circumference} ${circumference}"
                stroke-dashoffset="${strokeDashoffset}"
                r="${normalizedRadius}"
                cx="40"
                cy="40"
                transform="rotate(-90 40 40)"
                stroke-linecap="round"
              />
              <!-- Inner glow effect -->
              <circle
                fill="${color}20"
                r="${normalizedRadius - strokeWidth}"
                cx="40"
                cy="40"
              />
            </svg>
          `}
        />
        
        {/* Percentage text in center */}
        <FlexWidget
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
          }}
        >
          <TextWidget
            text={`${batteryLevel}`}
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: color,
              textAlign: 'center',
            }}
          />
          <TextWidget
            text="%"
            style={{
              fontSize: 14,
              color: color,
              textAlign: 'center',
              marginTop: -4,
            }}
          />
        </FlexWidget>
      </FlexWidget>
      
      {/* Battery info section */}
      <FlexWidget
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingRight: 12,
        }}
      >
        <TextWidget
          text="Battery Status"
          style={{
            fontSize: 14,
            color: '#888888',
            marginBottom: 4,
          }}
        />
        <TextWidget
          text={batteryLevel > 80 ? "Excellent" : batteryLevel > 50 ? "Good" : batteryLevel > 20 ? "Fair" : "Low"}
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: color,
            marginBottom: 8,
          }}
        />
        
        {/* Mini bar indicator */}
        <FlexWidget
          style={{
            height: 4,
            backgroundColor: '#1C1C1C',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <FlexWidget
            style={{
              width: Math.min(100, batteryLevel * 2), // Max width 200 (flex doesn't work with %)
              height: 4,
              backgroundColor: color,
            }}
          />
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
};

export default CircularBatteryWidget;
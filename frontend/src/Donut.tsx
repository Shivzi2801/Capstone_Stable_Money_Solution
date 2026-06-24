import React from 'react';
import Svg, { Circle, G } from 'react-native-svg';
import { View, Text, StyleSheet } from 'react-native';
import { colors, font } from './theme';

type Props = {
  size?: number;
  thickness?: number;
  safePct: number; // 0..100
  safeColor?: string;
  ladderColor?: string;
  centerLabel?: string;
  centerSub?: string;
};

export const Donut: React.FC<Props> = ({
  size = 200,
  thickness = 22,
  safePct,
  safeColor = colors.brand,
  ladderColor = colors.lime,
  centerLabel,
  centerSub,
}) => {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeLen = (safePct / 100) * circumference;
  const ladderLen = circumference - safeLen;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          {/* Safe segment */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={safeColor}
            strokeWidth={thickness}
            fill="none"
            strokeDasharray={`${safeLen} ${circumference}`}
            strokeLinecap="butt"
          />
          {/* Ladder segment */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={ladderColor}
            strokeWidth={thickness}
            fill="none"
            strokeDasharray={`${ladderLen} ${circumference}`}
            strokeDashoffset={-safeLen}
            strokeLinecap="butt"
          />
        </G>
      </Svg>
      {(centerLabel || centerSub) && (
        <View style={styles.center} pointerEvents="none">
          {centerLabel && <Text style={styles.label}>{centerLabel}</Text>}
          {centerSub && <Text style={styles.sub}>{centerSub}</Text>}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: { color: colors.ink, fontFamily: font.extrabold, fontSize: 26 },
  sub: { color: colors.slate, fontFamily: font.medium, fontSize: 12, marginTop: 2 },
});

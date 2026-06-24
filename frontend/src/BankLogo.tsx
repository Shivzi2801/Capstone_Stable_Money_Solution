import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, font, radius } from './theme';

export const BankLogo: React.FC<{ name: string; color: string; size?: number }> = ({
  name,
  color,
  size = 40,
}) => {
  const initials = name
    .split(' ')
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
  return (
    <View
      style={[
        styles.box,
        { width: size, height: size, backgroundColor: color, borderRadius: radius.md },
      ]}
    >
      <Text style={[styles.text, { fontSize: size * 0.36 }]}>{initials || name[0]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: { justifyContent: 'center', alignItems: 'center' },
  text: { color: '#fff', fontFamily: font.extrabold, letterSpacing: 0.5 },
});

import React from 'react';
import { Pressable, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, font, radius, spacing, shadow } from './theme';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'lime' | 'ghost';
  icon?: React.ReactNode;
  testID?: string;
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
};

export const PrimaryButton: React.FC<Props> = ({
  label,
  onPress,
  variant = 'primary',
  icon,
  testID,
  disabled,
  loading,
  full = true,
}) => {
  const isLime = variant === 'lime';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';

  const bg =
    isLime
      ? colors.lime
      : isSecondary
      ? colors.surface
      : isGhost
      ? 'transparent'
      : colors.brand;
  const fg = isLime || isSecondary || isGhost ? colors.ink : colors.surface;

  return (
    <Pressable
      onPress={() => {
        if (disabled || loading) return;
        try {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        } catch {}
        onPress?.();
      }}
      testID={testID}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: bg,
          alignSelf: full ? 'stretch' : 'flex-start',
          borderWidth: isSecondary ? 1 : 0,
          borderColor: colors.border,
        },
        !isGhost && shadow.soft,
        pressed && { transform: [{ scale: 0.985 }], opacity: 0.92 },
        disabled && { opacity: 0.5 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <View style={styles.row}>
          {icon}
          <Text style={[styles.text, { color: fg }]}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 15,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  text: { fontFamily: font.bold, fontSize: 15, letterSpacing: 0.1 },
});

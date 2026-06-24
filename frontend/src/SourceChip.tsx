import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStableMoney } from './store';
import { SourceKey } from './data/sources';
import { colors, font, radius, spacing } from './theme';

type Props = {
  source: SourceKey;
  label?: string;
  variant?: 'chip' | 'inline' | 'block';
  // optional override text for `block` variant (full sentence)
  children?: React.ReactNode;
  testID?: string;
};

export const SourceChip: React.FC<Props> = ({ source, label, variant = 'inline', children, testID }) => {
  const { openSource } = useStableMoney();

  if (variant === 'chip') {
    return (
      <Pressable
        onPress={() => openSource(source)}
        style={({ pressed }) => [styles.chip, pressed && styles.pressed]}
        testID={testID ?? `source-chip-${source}`}
      >
        <Ionicons name="shield-checkmark" size={12} color={colors.factGreen} />
        <Text style={styles.chipText}>{label ?? 'source'}</Text>
      </Pressable>
    );
  }
  if (variant === 'block') {
    return (
      <Pressable
        onPress={() => openSource(source)}
        style={({ pressed }) => [styles.block, pressed && styles.pressed]}
        testID={testID ?? `source-block-${source}`}
      >
        <View style={styles.blockIcon}>
          <Ionicons name="shield-checkmark" size={14} color={colors.factGreen} />
        </View>
        <Text style={styles.blockText}>{children ?? label ?? 'source'}</Text>
      </Pressable>
    );
  }
  return (
    <Pressable
      onPress={() => openSource(source)}
      hitSlop={8}
      style={({ pressed }) => [styles.inline, pressed && styles.pressed]}
      testID={testID ?? `source-inline-${source}`}
    >
      <Text style={styles.inlineText}>{label ?? 'source'}</Text>
      <Ionicons name="open-outline" size={11} color={colors.factGreen} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.factChipBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  chipText: { color: colors.factGreen, fontFamily: font.semibold, fontSize: 11 },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.factChipBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.sm,
    alignSelf: 'flex-start',
  },
  inlineText: { color: colors.factGreen, fontFamily: font.semibold, fontSize: 10.5, letterSpacing: 0.1 },
  block: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.factChipBg,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  blockIcon: { paddingTop: 1 },
  blockText: { flex: 1, color: colors.factGreen, fontFamily: font.medium, fontSize: 12.5, lineHeight: 18 },
  pressed: { opacity: 0.65 },
});

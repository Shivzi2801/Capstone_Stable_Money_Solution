import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStableMoney } from './store';
import { SOURCES } from './data/sources';
import { colors, font, radius, spacing, shadow } from './theme';

export const SourceModal: React.FC = () => {
  const { activeSource, closeSource } = useStableMoney();
  const entry = activeSource ? SOURCES[activeSource] : null;

  return (
    <Modal
      transparent
      visible={!!entry}
      animationType="fade"
      onRequestClose={closeSource}
      statusBarTranslucent
    >
      <Pressable style={styles.backdrop} onPress={closeSource} testID="source-modal-backdrop">
        <Pressable style={styles.card} onPress={() => {}} testID="source-modal">
          <View style={styles.iconWrap}>
            <Ionicons name="shield-checkmark" size={22} color={colors.factGreen} />
          </View>
          <Text style={styles.label}>Where this comes from</Text>
          <Text style={styles.title} testID="source-modal-title">
            {entry?.title}
          </Text>
          <Text style={styles.publisher}>{entry?.publisher}</Text>
          <View style={styles.divider} />
          <Text style={styles.body}>{entry?.oneLiner}</Text>
          <View style={styles.asOfRow}>
            <Ionicons name="time-outline" size={13} color={colors.slate} />
            <Text style={styles.asOf}>As of {entry?.asOf}</Text>
          </View>
          <View style={styles.note}>
            <Text style={styles.noteText}>
              In the live app this links straight to the named source so you can verify it yourself.
              Showing the source — not asking you to trust us — is the whole idea.
            </Text>
          </View>
          <Pressable style={styles.btn} onPress={closeSource} testID="source-modal-close">
            <Text style={styles.btnText}>Got it</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(26,22,38,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...shadow.card,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.factChipBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    color: colors.slate,
    fontFamily: font.medium,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.ink,
    fontFamily: font.bold,
    fontSize: 19,
    marginTop: 4,
    lineHeight: 25,
  },
  publisher: {
    color: colors.factGreen,
    fontFamily: font.semibold,
    fontSize: 13,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.lg,
  },
  body: {
    color: colors.ink,
    fontFamily: font.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  asOfRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: spacing.md },
  asOf: { color: colors.slate, fontFamily: font.medium, fontSize: 12 },
  note: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.bg,
    borderRadius: radius.md,
  },
  noteText: {
    color: colors.slate,
    fontFamily: font.regular,
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  btn: {
    marginTop: spacing.lg,
    backgroundColor: colors.ink,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnText: { color: colors.surface, fontFamily: font.semibold, fontSize: 15 },
});

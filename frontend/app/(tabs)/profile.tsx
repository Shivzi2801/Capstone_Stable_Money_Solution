import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, font, radius, spacing, shadow } from "@/src/theme";
import { SourceChip } from "@/src/SourceChip";

const ROWS: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }[] = [
  { icon: "person-outline", label: "Name", value: "Priya R." },
  { icon: "shield-checkmark-outline", label: "KYC", value: "Verified" },
  { icon: "wallet-outline", label: "Linked bank", value: "Unity SFB ····3421" },
  { icon: "receipt-outline", label: "Tax slab (assumed)", value: "20%" },
];

export default function Profile() {
  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.header}>
        <View style={styles.avatar}><Text style={styles.avatarText}>P</Text></View>
        <Text style={styles.name}>Priya R.</Text>
        <Text style={styles.handle}>Member since June 2026</Text>
      </SafeAreaView>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.section}>ACCOUNT</Text>
        <View style={styles.card}>
          {ROWS.map((r, i) => (
            <View key={r.label} style={[styles.row, i !== ROWS.length - 1 && styles.rowBorder]}>
              <Ionicons name={r.icon} size={18} color={colors.brand} />
              <Text style={styles.rowLabel}>{r.label}</Text>
              <Text style={styles.rowValue}>{r.value}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.section}>WHY YOU CAN TRUST US</Text>
        <View style={styles.card}>
          <View style={styles.trustRow}>
            <Ionicons name="shield-checkmark" size={18} color={colors.factGreen} />
            <Text style={styles.trustText}>
              Stable Money is a SEBI-registered distributor; partner banks are RBI-licensed.
            </Text>
          </View>
          <View style={[styles.trustRow, { borderTopWidth: 1, borderTopColor: colors.divider, paddingTop: spacing.md }]}>
            <Ionicons name="information-circle" size={18} color={colors.factGreen} />
            <Text style={styles.trustText}>
              We earn a commission from the bank on every booking. The commission is similar across banks — we have no reason to steer you.
            </Text>
          </View>
          <View style={{ marginTop: spacing.md }}>
            <SourceChip source="commission_disclosure" label="commission disclosure" variant="chip" />
          </View>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Prototype build · June 2026</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: {
    backgroundColor: colors.brand, padding: spacing.lg, paddingBottom: spacing.xl,
    alignItems: "center", gap: 6,
  },
  avatar: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: colors.lime,
    justifyContent: "center", alignItems: "center", marginTop: spacing.sm,
  },
  avatarText: { color: colors.brandDark, fontFamily: font.extrabold, fontSize: 26 },
  name: { color: "#fff", fontFamily: font.bold, fontSize: 18, marginTop: 4 },
  handle: { color: "rgba(255,255,255,0.75)", fontFamily: font.medium, fontSize: 12 },
  scroll: { padding: spacing.lg, paddingBottom: spacing.xxl },
  section: {
    fontFamily: font.bold, fontSize: 11, color: colors.slate, letterSpacing: 0.7,
    marginBottom: spacing.sm, marginTop: spacing.md,
  },
  card: { backgroundColor: "#fff", borderRadius: radius.lg, paddingHorizontal: spacing.lg, ...shadow.soft },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.md, gap: spacing.md },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  rowLabel: { flex: 1, color: colors.ink, fontFamily: font.medium, fontSize: 13 },
  rowValue: { color: colors.slate, fontFamily: font.semibold, fontSize: 13 },
  trustRow: { flexDirection: "row", gap: spacing.sm, alignItems: "flex-start", paddingVertical: spacing.md },
  trustText: { flex: 1, color: colors.ink, fontFamily: font.medium, fontSize: 12.5, lineHeight: 18 },
  footerRow: { alignItems: "center", marginTop: spacing.xl },
  footerText: { color: colors.muted, fontFamily: font.medium, fontSize: 11 },
});

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useStableMoney, fmtINR } from "@/src/store";
import { colors, font, radius, spacing, shadow } from "@/src/theme";
import { SourceChip } from "@/src/SourceChip";

export default function Passbook() {
  const { fds } = useStableMoney();
  const total = fds.reduce((s, f) => s + f.amount, 0);

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.header}>
        <Text style={styles.h1}>Passbook</Text>
        <Text style={styles.sub}>All your fixed deposits, in one place.</Text>
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Total invested</Text>
          <Text style={styles.totalAmt} testID="passbook-total">{fmtINR(total)}</Text>
          <Text style={styles.totalSub}>{fds.length} fixed deposit{fds.length > 1 ? "s" : ""}</Text>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {fds.map((fd, idx) => (
          <View key={fd.id} style={styles.card} testID={`passbook-fd-${idx}`}>
            <View style={styles.row}>
              <View style={[styles.logo, { backgroundColor: fd.bankId === "unity" ? colors.ink : colors.brand }]}>
                <Text style={styles.logoText}>{fd.bank[0]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.bankName}>{fd.bank}</Text>
                <Text style={styles.tenure}>{fd.tenureMonths}-month FD · booked {fd.bookedAt}</Text>
              </View>
              {fd.label && (
                <View style={styles.pill}>
                  <Text style={styles.pillText}>{fd.label}</Text>
                </View>
              )}
            </View>
            <View style={styles.grid}>
              <View style={styles.gridCell}>
                <Text style={styles.gridLabel}>Amount</Text>
                <Text style={styles.gridValue}>{fmtINR(fd.amount)}</Text>
              </View>
              <View style={styles.gridCell}>
                <Text style={styles.gridLabel}>Rate</Text>
                <Text style={styles.gridValue}>{fd.rate.toFixed(2)}%</Text>
              </View>
              <View style={styles.gridCell}>
                <Text style={styles.gridLabel}>DICGC</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Ionicons name="shield-checkmark" size={14} color={colors.success} />
                  <Text style={styles.gridValue}>Insured</Text>
                </View>
              </View>
            </View>
            <SourceChip source="dicgc" variant="block">
              Principal + interest insured up to ₹5,00,000 per bank by DICGC.
            </SourceChip>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.brand, padding: spacing.lg, paddingBottom: spacing.xl + 20 },
  h1: { color: "#fff", fontFamily: font.extrabold, fontSize: 24 },
  sub: { color: "rgba(255,255,255,0.7)", fontFamily: font.medium, fontSize: 12.5, marginTop: 4 },
  totalCard: {
    marginTop: spacing.lg, backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: radius.md, padding: spacing.md,
  },
  totalLabel: { color: "rgba(255,255,255,0.75)", fontFamily: font.medium, fontSize: 11 },
  totalAmt: { color: "#fff", fontFamily: font.extrabold, fontSize: 26, marginTop: 2 },
  totalSub: { color: "rgba(255,255,255,0.75)", fontFamily: font.medium, fontSize: 11.5 },
  scroll: { padding: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  card: { backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, gap: spacing.md, ...shadow.soft },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  logo: {
    width: 40, height: 40, borderRadius: 10, justifyContent: "center", alignItems: "center",
  },
  logoText: { color: "#fff", fontFamily: font.extrabold, fontSize: 16 },
  bankName: { color: colors.ink, fontFamily: font.bold, fontSize: 14 },
  tenure: { color: colors.slate, fontFamily: font.medium, fontSize: 11.5, marginTop: 2 },
  pill: { backgroundColor: colors.factChipBg, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999 },
  pillText: { color: colors.factGreen, fontFamily: font.bold, fontSize: 10.5, letterSpacing: 0.3 },
  grid: { flexDirection: "row", justifyContent: "space-between" },
  gridCell: { flex: 1 },
  gridLabel: { color: colors.slate, fontFamily: font.medium, fontSize: 11 },
  gridValue: { color: colors.ink, fontFamily: font.bold, fontSize: 14, marginTop: 2 },
});

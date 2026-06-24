import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import { colors, font, radius, spacing, shadow } from "@/src/theme";
import { fmtINR } from "@/src/store";
import { CONSTANTS } from "@/src/data/banks";
import { SourceChip } from "@/src/SourceChip";

const TENURES: { label: string; months: number }[] = [
  { label: "6 mo", months: 6 },
  { label: "1 yr", months: 12 },
  { label: "2 yr", months: 24 },
  { label: "3 yr", months: 36 },
];

export default function Calculator() {
  const router = useRouter();
  const [amount, setAmount] = useState(70000);
  const [tenure, setTenure] = useState(12);
  const rate = 8.10;

  const { maturity, interest, tax, net } = useMemo(() => {
    const years = tenure / 12;
    const mat = amount * Math.pow(1 + rate / 100, years);
    const itr = mat - amount;
    const t = itr * CONSTANTS.defaultTaxSlab;
    return { maturity: mat - t, interest: itr, tax: t, net: itr - t };
  }, [amount, tenure]);

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back} testID="calc-back">
          <Ionicons name="chevron-back" size={22} color={colors.ink} />
        </Pressable>
        <Text style={styles.h1}>Returns calculator</Text>
        <Text style={styles.sub}>Compounded annually at 8.10%, taxed at your slab.</Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroLabel}>You'd have, after tax</Text>
          <Text style={styles.heroAmt} testID="calc-maturity">{fmtINR(maturity)}</Text>
          <View style={styles.heroSplit}>
            <View style={styles.splitCol}>
              <Text style={styles.splitLabel}>Principal</Text>
              <Text style={styles.splitVal}>{fmtINR(amount)}</Text>
            </View>
            <View style={styles.splitCol}>
              <Text style={styles.splitLabel}>Interest (after tax)</Text>
              <Text style={[styles.splitVal, { color: colors.lime }]}>{fmtINR(net)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.rowSpace}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>{fmtINR(amount)}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={5000}
            maximumValue={500000}
            step={5000}
            value={amount}
            onValueChange={(v) => setAmount(Math.round(v))}
            minimumTrackTintColor={colors.brand}
            maximumTrackTintColor={colors.divider}
            thumbTintColor={colors.brand}
            testID="calc-amount"
          />
          <View style={styles.sliderEnds}>
            <Text style={styles.sliderEnd}>{fmtINR(5000)}</Text>
            <Text style={styles.sliderEnd}>{fmtINR(500000)}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={[styles.label, { marginBottom: spacing.sm }]}>Tenure</Text>
          <View style={styles.tabs}>
            {TENURES.map((t) => {
              const active = tenure === t.months;
              return (
                <Pressable
                  key={t.months}
                  onPress={() => setTenure(t.months)}
                  style={[styles.tab, active && styles.tabActive]}
                  testID={`tenure-${t.months}`}
                >
                  <Text style={[styles.tabText, active && styles.tabTextActive]}>{t.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.mathCard}>
          <MathRow label="Maturity (compounded)" value={fmtINR(amount + interest)} />
          <MathRow label="Interest earned" value={fmtINR(interest)} muted />
          <MathRow label="Less 20% tax" value={`− ${fmtINR(tax)}`} muted />
          <View style={styles.divider} />
          <MathRow label="You keep" value={fmtINR(maturity)} highlight />
        </View>

        <SourceChip source="fd_taxation" variant="block">
          We assume a 20% income-tax slab. Change your slab in Profile and the math updates. Interest is taxed when paid — source: FD interest taxation (FY25-26).
        </SourceChip>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const MathRow: React.FC<{ label: string; value: string; muted?: boolean; highlight?: boolean }> = ({
  label, value, muted, highlight,
}) => (
  <View style={[styles.mathRow, highlight && styles.mathRowHi]}>
    <Text style={[styles.mathLabel, muted && { color: colors.slate }, highlight && styles.mathLabelHi]}>
      {label}
    </Text>
    <Text style={[styles.mathVal, muted && { color: colors.slate }, highlight && styles.mathValHi]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.divider },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.md },
  h1: { color: colors.ink, fontFamily: font.extrabold, fontSize: 22 },
  sub: { color: colors.slate, fontFamily: font.medium, fontSize: 12.5, marginTop: 4 },

  scroll: { padding: spacing.lg, gap: spacing.md },
  hero: { backgroundColor: colors.ink, borderRadius: radius.xl, padding: spacing.xl, ...shadow.card },
  heroLabel: { color: "rgba(255,255,255,0.7)", fontFamily: font.medium, fontSize: 11 },
  heroAmt: { color: "#fff", fontFamily: font.extrabold, fontSize: 32, marginTop: 6 },
  heroSplit: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.lg, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)" },
  splitCol: { gap: 2 },
  splitLabel: { color: "rgba(255,255,255,0.65)", fontFamily: font.medium, fontSize: 11 },
  splitVal: { color: "#fff", fontFamily: font.bold, fontSize: 14 },

  card: { backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, ...shadow.soft },
  rowSpace: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  label: { color: colors.ink, fontFamily: font.bold, fontSize: 13 },
  value: { color: colors.brand, fontFamily: font.extrabold, fontSize: 16 },
  slider: { height: 36, marginTop: 6 },
  sliderEnds: { flexDirection: "row", justifyContent: "space-between" },
  sliderEnd: { color: colors.muted, fontFamily: font.medium, fontSize: 11 },

  tabs: { flexDirection: "row", gap: 8 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: colors.bg, alignItems: "center" },
  tabActive: { backgroundColor: colors.ink },
  tabText: { color: colors.slate, fontFamily: font.semibold, fontSize: 12.5 },
  tabTextActive: { color: "#fff" },

  mathCard: { backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, ...shadow.soft },
  mathRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8 },
  mathRowHi: { backgroundColor: colors.factChipBg, marginHorizontal: -spacing.lg, paddingHorizontal: spacing.lg, paddingVertical: 12, marginTop: 4 },
  mathLabel: { color: colors.ink, fontFamily: font.medium, fontSize: 13.5 },
  mathLabelHi: { color: colors.factGreen, fontFamily: font.bold, fontSize: 13.5 },
  mathVal: { color: colors.ink, fontFamily: font.bold, fontSize: 14 },
  mathValHi: { color: colors.factGreen, fontFamily: font.extrabold, fontSize: 17 },
  divider: { height: 1, backgroundColor: colors.divider, marginTop: 4 },
});

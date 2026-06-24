import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import { colors, font, radius, spacing, shadow } from "@/src/theme";
import { fmtINR } from "@/src/store";
import { SourceChip } from "@/src/SourceChip";

const RUNGS = [
  { months: 3, label: "Rung 1", note: "your first FD" },
  { months: 6, label: "Rung 2", note: "matures Sep 2026 → next prompt" },
  { months: 9, label: "Rung 3", note: "matures Dec 2026 → next prompt" },
  { months: 12, label: "Rung 4", note: "matures Mar 2027 → next prompt" },
];

export default function Ladder() {
  const router = useRouter();
  const [amount, setAmount] = useState(100000);
  const perRung = useMemo(() => Math.round(amount / RUNGS.length), [amount]);

  // bar heights for visual progression (3/6/9/12 mo)
  const maxBar = 140;
  const heights = RUNGS.map((r) => (r.months / 12) * maxBar);

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back} testID="ladder-back">
          <Ionicons name="chevron-back" size={22} color={colors.ink} />
        </Pressable>
        <Text style={styles.h1}>Your first FD is rung one.</Text>
        <Text style={styles.sub}>
          A "ladder" stages your money so something matures every 3 months — you stay liquid and re-book at the latest rate.
        </Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartArea}>
            {RUNGS.map((r, i) => (
              <View key={r.months} style={styles.barWrap}>
                <View style={{ height: maxBar - heights[i] }} />
                <View
                  style={[
                    styles.bar,
                    {
                      height: heights[i],
                      backgroundColor: i === 0 ? colors.brand : colors.lime,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{r.months} mo</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.rowSpace}>
            <Text style={styles.label}>Total amount to ladder</Text>
            <Text style={styles.value}>{fmtINR(amount)}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={20000}
            maximumValue={500000}
            step={5000}
            value={amount}
            onValueChange={(v) => setAmount(Math.round(v))}
            minimumTrackTintColor={colors.brand}
            maximumTrackTintColor={colors.divider}
            thumbTintColor={colors.brand}
            testID="ladder-amount"
          />
          <Text style={styles.helper}>Split equally across 4 rungs · {fmtINR(perRung)} each</Text>
        </View>

        <View style={styles.list}>
          {RUNGS.map((r, i) => (
            <View key={r.months} style={[styles.listRow, i !== RUNGS.length - 1 && styles.listRowBorder]}>
              <View style={[styles.rungDot, { backgroundColor: i === 0 ? colors.brand : colors.lime }]}>
                <Text style={[styles.rungDotText, { color: i === 0 ? "#fff" : colors.ink }]}>{i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.rungLabel}>{r.label} · {r.months}-month FD</Text>
                <Text style={styles.rungNote}>
                  {r.note}
                </Text>
              </View>
              <Text style={styles.rungAmt}>{fmtINR(perRung)}</Text>
            </View>
          ))}
        </View>

        <SourceChip source="fd_laddering" variant="block">
          Each rung's maturity becomes a future prompt — re-book at the then-current rate. Laddering is an established strategy.
        </SourceChip>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.divider },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.md },
  h1: { color: colors.ink, fontFamily: font.extrabold, fontSize: 22 },
  sub: { color: colors.slate, fontFamily: font.medium, fontSize: 13, marginTop: 4, lineHeight: 19 },

  scroll: { padding: spacing.lg, gap: spacing.md },

  chartCard: { backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, ...shadow.soft },
  chartArea: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-around", height: 180 },
  barWrap: { width: 36, alignItems: "center" },
  bar: { width: 28, borderTopLeftRadius: 6, borderTopRightRadius: 6 },
  barLabel: { color: colors.slate, fontFamily: font.semibold, fontSize: 11, marginTop: 6 },

  card: { backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, ...shadow.soft },
  rowSpace: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  label: { color: colors.ink, fontFamily: font.bold, fontSize: 13 },
  value: { color: colors.brand, fontFamily: font.extrabold, fontSize: 16 },
  slider: { height: 36, marginTop: 6 },
  helper: { color: colors.slate, fontFamily: font.medium, fontSize: 11.5, textAlign: "center" },

  list: { backgroundColor: "#fff", borderRadius: radius.lg, paddingHorizontal: spacing.lg, ...shadow.soft },
  listRow: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.md, gap: spacing.md },
  listRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  rungDot: { width: 32, height: 32, borderRadius: 16, justifyContent: "center", alignItems: "center" },
  rungDotText: { fontFamily: font.extrabold, fontSize: 13 },
  rungLabel: { color: colors.ink, fontFamily: font.bold, fontSize: 13 },
  rungNote: { color: colors.slate, fontFamily: font.medium, fontSize: 11.5, marginTop: 2 },
  rungAmt: { color: colors.ink, fontFamily: font.bold, fontSize: 13 },
});

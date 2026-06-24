import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import { colors, font, radius, spacing, shadow } from "@/src/theme";
import { useStableMoney, fmtINR } from "@/src/store";
import { SourceChip } from "@/src/SourceChip";
import { PrimaryButton } from "@/src/PrimaryButton";
import { Donut } from "@/src/Donut";

export default function Allocation() {
  const router = useRouter();
  const { cash, safeSplitPct, setSafeSplitPct } = useStableMoney();
  const [pct, setPct] = useState(safeSplitPct);

  const safeAmt = useMemo(() => Math.round((pct / 100) * cash), [pct, cash]);
  const ladderAmt = cash - safeAmt;

  const commit = () => {
    setSafeSplitPct(pct);
    router.push("/compare");
  };

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back} testID="alloc-back">
          <Ionicons name="chevron-back" size={22} color={colors.ink} />
        </Pressable>
        <Text style={styles.step}>STEP 1 OF 3</Text>
        <Text style={styles.h1}>For {fmtINR(cash)}, a balanced way to start.</Text>
        <Text style={styles.sub}>A starting point, not a rule. You decide the numbers.</Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.donutWrap}>
          <Donut size={220} safePct={pct} centerLabel={`${pct}%`} centerSub="Top-safety" />
        </View>

        <View style={styles.legend}>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: colors.brand }]} />
            <Text style={styles.legendLabel}>Top-safety bank</Text>
            <Text style={styles.legendAmt} testID="safe-amount">{fmtINR(safeAmt)}</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: colors.lime }]} />
            <Text style={styles.legendLabel}>Laddered</Text>
            <Text style={styles.legendAmt} testID="ladder-amount">{fmtINR(ladderAmt)}</Text>
          </View>
        </View>

        <View style={styles.sliderCard}>
          <View style={styles.sliderHead}>
            <Text style={styles.sliderTitle}>Adjust the split</Text>
            <Text style={styles.sliderVal}>{pct}% safe</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={40}
            maximumValue={100}
            step={5}
            value={pct}
            onValueChange={(v) => setPct(Math.round(v))}
            minimumTrackTintColor={colors.brand}
            maximumTrackTintColor={colors.divider}
            thumbTintColor={colors.brand}
            testID="alloc-slider"
          />
          <View style={styles.sliderEnds}>
            <Text style={styles.sliderEnd}>40% safe</Text>
            <Text style={styles.sliderEnd}>100% safe</Text>
          </View>
        </View>

        <SourceChip source="fd_laddering" variant="block">
          The "split across tenures and safety" idea isn't ours — it's standard FD laddering, described by banks and the RBI alike. We just make it one tap.
        </SourceChip>

        <View style={styles.reassureCard}>
          <Ionicons name="finger-print-outline" size={18} color={colors.brand} />
          <Text style={styles.reassureText}>
            <Text style={styles.reassureStrong}>You decide the numbers.</Text> We never auto-pick a bank for you.
          </Text>
        </View>

        <PrimaryButton
          label="See banks for this split"
          onPress={commit}
          testID="alloc-cta"
          icon={<Ionicons name="arrow-forward" size={18} color="#fff" />}
        />
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.divider },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.md },
  step: { color: colors.brand, fontFamily: font.bold, fontSize: 11, letterSpacing: 1 },
  h1: { color: colors.ink, fontFamily: font.extrabold, fontSize: 22, marginTop: 4, lineHeight: 28 },
  sub: { color: colors.slate, fontFamily: font.medium, fontSize: 13, marginTop: 4 },

  scroll: { padding: spacing.lg, gap: spacing.lg },
  donutWrap: { alignItems: "center", paddingVertical: spacing.lg },
  legend: { backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, gap: spacing.md, ...shadow.soft },
  legendRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  legendDot: { width: 12, height: 12, borderRadius: 6 },
  legendLabel: { flex: 1, color: colors.ink, fontFamily: font.semibold, fontSize: 13.5 },
  legendAmt: { color: colors.ink, fontFamily: font.extrabold, fontSize: 15 },

  sliderCard: { backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, ...shadow.soft },
  sliderHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
  sliderTitle: { color: colors.ink, fontFamily: font.bold, fontSize: 14 },
  sliderVal: { color: colors.brand, fontFamily: font.extrabold, fontSize: 14 },
  slider: { height: 36 },
  sliderEnds: { flexDirection: "row", justifyContent: "space-between" },
  sliderEnd: { color: colors.muted, fontFamily: font.medium, fontSize: 11 },

  reassureCard: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#fff", borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.divider },
  reassureText: { flex: 1, color: colors.slate, fontFamily: font.medium, fontSize: 12.5, lineHeight: 18 },
  reassureStrong: { color: colors.ink, fontFamily: font.bold },
});

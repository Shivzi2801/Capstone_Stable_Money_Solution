import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, font, radius, spacing, shadow } from "@/src/theme";
import { useStableMoney, fmtINR } from "@/src/store";
import { BANKS, CONSTANTS, Bank } from "@/src/data/banks";
import { SourceChip } from "@/src/SourceChip";
import { BankLogo } from "@/src/BankLogo";

type SortKey = "rate" | "safety" | "tax";
const TABS: { key: SortKey; label: string }[] = [
  { key: "rate", label: "Highest rate" },
  { key: "safety", label: "Safest rating" },
  { key: "tax", label: "Most after tax" },
];

const SAFETY_ORDER: Record<string, number> = {
  "CRISIL A+": 0,
  "CRISIL A": 1,
  "ICRA A": 2,
};

export default function Compare() {
  const router = useRouter();
  const { cash, safeSplitPct, setSelectedBankId } = useStableMoney();
  const [sortKey, setSortKey] = useState<SortKey>("rate");

  const safeAmt = useMemo(() => Math.round((safeSplitPct / 100) * cash), [safeSplitPct, cash]);
  const currentBank = BANKS.find((b) => b.isCurrent)!;

  const computeAfterTax = (b: Bank) => b.rate * safeAmt * (1 - CONSTANTS.defaultTaxSlab) / 100;

  const sorted = useMemo(() => {
    const list = [...BANKS];
    list.sort((a, b) => {
      if (a.isCurrent && !b.isCurrent) return 1;
      if (!a.isCurrent && b.isCurrent) return -1;
      if (sortKey === "rate") return b.rate - a.rate;
      if (sortKey === "safety") return (SAFETY_ORDER[a.rating] ?? 9) - (SAFETY_ORDER[b.rating] ?? 9);
      return computeAfterTax(b) - computeAfterTax(a);
    });
    return list;
  }, [sortKey, safeAmt]);

  const baselineYearly = computeAfterTax(currentBank);

  const onPickBank = (b: Bank) => {
    setSelectedBankId(b.id);
    router.push("/confirm");
  };

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back} testID="compare-back">
          <Ionicons name="chevron-back" size={22} color={colors.ink} />
        </Pressable>
        <Text style={styles.step}>STEP 2 OF 3</Text>
        <Text style={styles.h1}>Insured banks, compared honestly.</Text>
        <Text style={styles.sub}>
          Live rates for the top-safety portion ({fmtINR(safeAmt)}). Your current bank is shown too.{" "}
          <Text style={styles.subStrong}>You choose.</Text>
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
          style={styles.tabsScroll}
        >
          {TABS.map((t) => {
            const active = sortKey === t.key;
            return (
              <Pressable
                key={t.key}
                onPress={() => setSortKey(t.key)}
                style={[styles.tab, active && styles.tabActive]}
                testID={`sort-${t.key}`}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{t.label}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {sorted.map((b, idx) => {
          if (b.isCurrent) {
            return (
              <View key={b.id} style={[styles.row, styles.currentRow]} testID={`bank-${b.id}`}>
                <View style={styles.rowMain}>
                  <BankLogo name={b.name} color={b.brandColor} />
                  <View style={styles.rowBody}>
                    <View style={styles.nameLine}>
                      <Text style={[styles.bankName, { color: colors.slate }]}>{b.shortName}</Text>
                      <View style={styles.currPill}><Text style={styles.currPillText}>Your bank</Text></View>
                    </View>
                    <Text style={styles.bankNote}>… it pays less here.</Text>
                  </View>
                  <View style={styles.rateBox}>
                    <Text style={[styles.rate, { color: colors.slate }]}>{b.rate.toFixed(2)}%</Text>
                  </View>
                </View>
              </View>
            );
          }

          const yearly = computeAfterTax(b);
          const diff = Math.round(yearly - baselineYearly);
          const isTop = idx === 0 && !b.isCurrent;

          return (
            <Pressable
              key={b.id}
              style={({ pressed }) => [
                styles.row,
                isTop && styles.topRow,
                pressed && { transform: [{ scale: 0.99 }], opacity: 0.95 },
              ]}
              onPress={() => onPickBank(b)}
              testID={`bank-${b.id}`}
            >
              {isTop && (
                <View style={styles.topPill}>
                  <Ionicons name="star" size={10} color={colors.brandDark} />
                  <Text style={styles.topPillText}>Top pick for this sort</Text>
                </View>
              )}
              <View style={styles.rowMain}>
                <BankLogo name={b.name} color={b.brandColor} />
                <View style={styles.rowBody}>
                  <Text style={styles.bankName}>{b.shortName}</Text>
                  <Text style={styles.bankPlain}>
                    {b.rating} · <Text style={{ color: colors.slate }}>{b.ratingPlain}</Text>
                  </Text>
                  <View style={styles.factLine}>
                    <Ionicons name="shield-checkmark" size={11} color={colors.factGreen} />
                    <SourceChip
                      source={b.ratingAgency === "ICRA" ? "icra_rating" : "crisil_rating"}
                      label={`${b.ratingAgency} rating`}
                      variant="inline"
                    />
                    <Text style={styles.factDot}>·</Text>
                    <SourceChip source="dicgc" label="DICGC ₹5L" variant="inline" />
                    <Text style={styles.factDot}>·</Text>
                    <SourceChip source="partner_rate" label="rate Jun 2026" variant="inline" />
                  </View>
                </View>
                <View style={styles.rateBox}>
                  <Text style={styles.rate}>{b.rate.toFixed(2)}%</Text>
                  {diff > 0 && (
                    <View style={styles.diffPill}>
                      <Ionicons name="arrow-up" size={9} color={colors.success} />
                      <Text style={styles.diffText}>+{fmtINR(diff)}/yr</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.cta}>
                <Text style={styles.ctaText}>Choose {b.shortName}</Text>
                <Ionicons name="arrow-forward" size={14} color={colors.brand} />
              </View>
            </Pressable>
          );
        })}

        <View style={styles.commission}>
          <View style={styles.commissionHead}>
            <Ionicons name="information-circle" size={18} color={colors.factGreen} />
            <Text style={styles.commissionTitle}>How we get paid</Text>
          </View>
          <Text style={styles.commissionBody}>
            Stable Money earns a commission from the bank on any booking — the same whichever you
            pick — so we've no reason to steer you. The rate you see is the rate you'd get direct.
          </Text>
          <View style={{ marginTop: spacing.sm }}>
            <SourceChip source="commission_disclosure" label="commission disclosure" variant="chip" />
          </View>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingBottom: 0, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.divider },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.md },
  step: { color: colors.brand, fontFamily: font.bold, fontSize: 11, letterSpacing: 1 },
  h1: { color: colors.ink, fontFamily: font.extrabold, fontSize: 22, marginTop: 4, lineHeight: 28 },
  sub: { color: colors.slate, fontFamily: font.medium, fontSize: 12.5, marginTop: 6, lineHeight: 18 },
  subStrong: { color: colors.ink, fontFamily: font.bold },

  tabsScroll: { marginTop: spacing.lg, marginHorizontal: -spacing.lg },
  tabsRow: { paddingHorizontal: spacing.lg, gap: 8, paddingBottom: spacing.md },
  tab: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: colors.bg, height: 36, justifyContent: "center", flexShrink: 0 },
  tabActive: { backgroundColor: colors.ink },
  tabText: { color: colors.slate, fontFamily: font.semibold, fontSize: 12.5 },
  tabTextActive: { color: "#fff" },

  scroll: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  row: { backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, ...shadow.soft },
  topRow: { borderWidth: 1.5, borderColor: colors.brand },
  currentRow: { borderStyle: "dashed", borderWidth: 1, borderColor: colors.divider, opacity: 0.85, backgroundColor: "transparent", shadowOpacity: 0 },
  topPill: { flexDirection: "row", alignItems: "center", gap: 4, alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: colors.lime, marginBottom: spacing.sm },
  topPillText: { color: colors.brandDark, fontFamily: font.extrabold, fontSize: 10, letterSpacing: 0.3 },
  rowMain: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  rowBody: { flex: 1, gap: 2 },
  nameLine: { flexDirection: "row", alignItems: "center", gap: 6, flexWrap: "wrap" },
  bankName: { color: colors.ink, fontFamily: font.bold, fontSize: 14 },
  bankPlain: { color: colors.ink, fontFamily: font.semibold, fontSize: 11.5 },
  bankNote: { color: colors.muted, fontFamily: font.medium, fontSize: 11.5, marginTop: 2 },
  currPill: { backgroundColor: colors.divider, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  currPillText: { color: colors.slate, fontFamily: font.bold, fontSize: 9.5, letterSpacing: 0.3 },
  factLine: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4, flexWrap: "wrap" },
  factDot: { color: colors.muted, fontSize: 11 },
  rateBox: { alignItems: "flex-end", gap: 4 },
  rate: { color: colors.ink, fontFamily: font.extrabold, fontSize: 20 },
  diffPill: { flexDirection: "row", alignItems: "center", gap: 2, backgroundColor: "#E6F6EF", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 999 },
  diffText: { color: colors.success, fontFamily: font.bold, fontSize: 10 },
  cta: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: spacing.md, paddingTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.divider },
  ctaText: { color: colors.brand, fontFamily: font.bold, fontSize: 12.5 },

  commission: { backgroundColor: colors.factChipBg, borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.sm },
  commissionHead: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  commissionTitle: { color: colors.factGreen, fontFamily: font.extrabold, fontSize: 13 },
  commissionBody: { color: colors.ink, fontFamily: font.medium, fontSize: 12.5, lineHeight: 18 },
});

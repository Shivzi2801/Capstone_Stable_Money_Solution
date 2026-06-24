import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, font, radius, spacing, shadow } from "@/src/theme";
import { useStableMoney, fmtINR } from "@/src/store";
import { BANKS, CONSTANTS } from "@/src/data/banks";
import { SourceChip } from "@/src/SourceChip";
import { PrimaryButton } from "@/src/PrimaryButton";
import { BankLogo } from "@/src/BankLogo";

export default function Confirm() {
  const router = useRouter();
  const { cash, safeSplitPct, selectedBankId, addFD } = useStableMoney();
  const bank = useMemo(() => BANKS.find((b) => b.id === selectedBankId) ?? BANKS[0], [selectedBankId]);

  const amount = Math.round((safeSplitPct / 100) * cash);
  const interest = (amount * bank.rate) / 100;
  const tax = interest * CONSTANTS.defaultTaxSlab;
  const net = interest - tax;

  const onConfirm = () => {
    addFD({ bank: bank.shortName, bankId: bank.id, amount, rate: bank.rate, tenureMonths: 12 });
    router.replace("/success");
  };

  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back} testID="confirm-back">
          <Ionicons name="chevron-back" size={22} color={colors.ink} />
        </Pressable>
        <Text style={styles.step}>STEP 3 OF 3</Text>
        <Text style={styles.h1}>Confirm — and check the math</Text>
        <Text style={styles.sub}>New FD · {bank.shortName}</Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.bankHead}>
          <BankLogo name={bank.name} color={bank.brandColor} size={44} />
          <View style={{ flex: 1 }}>
            <Text style={styles.bankName}>{bank.name}</Text>
            <Text style={styles.bankSub}>{bank.rating} · {bank.ratingPlain}</Text>
          </View>
          <View style={styles.rateBadge}>
            <Text style={styles.rateBadgeText}>{bank.rate.toFixed(2)}%</Text>
          </View>
        </View>

        <View style={styles.breakdown}>
          <Text style={styles.breakdownTitle}>The math</Text>

          <Row label="Amount" value={fmtINR(amount)} />
          <Row label={`Rate (1 year)`} value={`${bank.rate.toFixed(2)}%`} />
          <View style={styles.divider} />
          <Row label="Interest before tax" value={fmtINR(interest)} muted />
          <Row label="Less ~20% tax (your slab)" value={`− ${fmtINR(tax)}`} muted />
          <View style={styles.divider} />
          <Row label="You keep, after tax" value={fmtINR(net)} highlight />

          <SourceChip source="fd_taxation" variant="block">
            ₹{amount.toLocaleString("en-IN")} × {bank.rate.toFixed(2)}% = {fmtINR(interest)}, taxed at your slab. Redo it yourself.
          </SourceChip>
        </View>

        <View style={styles.trust}>
          <Text style={styles.trustTitle}>What's protecting you</Text>
          <TrustRow
            icon="shield-checkmark"
            title={`Insured by DICGC to ${fmtINR(CONSTANTS.dicgcLimit)}`}
            verify="Verify at dicgc.org.in"
            source="dicgc"
          />
          <TrustRow
            icon="ribbon"
            title={`${bank.shortName} · ${bank.rating}`}
            verify="Check the rating"
            source={bank.ratingAgency === "ICRA" ? "icra_rating" : "crisil_rating"}
          />
          <TrustRow
            icon="lock-open"
            title="Break or switch anytime"
            verify="Principal stays safe"
            source="premature_withdrawal"
            last
          />
        </View>

        <View style={{ height: spacing.md }} />
        <PrimaryButton
          label="Confirm — this is my choice"
          onPress={onConfirm}
          testID="confirm-cta"
          icon={<Ionicons name="checkmark-circle" size={18} color="#fff" />}
        />
        <Pressable
          style={styles.secondary}
          onPress={() => router.back()}
          testID="confirm-back-to-compare"
        >
          <Text style={styles.secondaryText}>Compare other banks</Text>
        </Pressable>
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const Row: React.FC<{ label: string; value: string; muted?: boolean; highlight?: boolean }> = ({
  label, value, muted, highlight,
}) => (
  <View style={[styles.row, highlight && styles.rowHighlight]}>
    <Text style={[styles.rowLabel, muted && { color: colors.slate }, highlight && styles.rowLabelHi]}>{label}</Text>
    <Text style={[styles.rowValue, muted && { color: colors.slate }, highlight && styles.rowValueHi]}>{value}</Text>
  </View>
);

const TrustRow: React.FC<{
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  verify: string;
  source: any;
  last?: boolean;
}> = ({ icon, title, verify, source, last }) => (
  <View style={[styles.tRow, !last && styles.tRowBorder]}>
    <View style={styles.tIcon}>
      <Ionicons name={icon} size={16} color={colors.factGreen} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.tTitle}>{title}</Text>
      <SourceChip source={source} label={verify} variant="inline" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.divider },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.md },
  step: { color: colors.brand, fontFamily: font.bold, fontSize: 11, letterSpacing: 1 },
  h1: { color: colors.ink, fontFamily: font.extrabold, fontSize: 22, marginTop: 4 },
  sub: { color: colors.slate, fontFamily: font.medium, fontSize: 13, marginTop: 4 },

  scroll: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  bankHead: { backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, flexDirection: "row", alignItems: "center", gap: spacing.md, ...shadow.soft },
  bankName: { color: colors.ink, fontFamily: font.bold, fontSize: 14 },
  bankSub: { color: colors.slate, fontFamily: font.medium, fontSize: 11.5, marginTop: 2 },
  rateBadge: { backgroundColor: colors.lime, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  rateBadgeText: { color: colors.ink, fontFamily: font.extrabold, fontSize: 14 },

  breakdown: { backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, ...shadow.soft },
  breakdownTitle: { color: colors.slate, fontFamily: font.bold, fontSize: 11, letterSpacing: 0.7, marginBottom: spacing.sm },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
  rowHighlight: { backgroundColor: colors.factChipBg, marginHorizontal: -spacing.lg, paddingHorizontal: spacing.lg, marginVertical: spacing.sm, borderRadius: 0 },
  rowLabel: { color: colors.ink, fontFamily: font.medium, fontSize: 13.5 },
  rowLabelHi: { color: colors.factGreen, fontFamily: font.bold, fontSize: 14 },
  rowValue: { color: colors.ink, fontFamily: font.bold, fontSize: 14 },
  rowValueHi: { color: colors.factGreen, fontFamily: font.extrabold, fontSize: 18 },
  divider: { height: 1, backgroundColor: colors.divider },

  trust: { backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, ...shadow.soft },
  trustTitle: { color: colors.slate, fontFamily: font.bold, fontSize: 11, letterSpacing: 0.7, marginBottom: spacing.md },
  tRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: spacing.md },
  tRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  tIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.factChipBg, justifyContent: "center", alignItems: "center" },
  tTitle: { color: colors.ink, fontFamily: font.semibold, fontSize: 13, marginBottom: 4 },

  secondary: { marginTop: spacing.md, alignItems: "center", paddingVertical: 14 },
  secondaryText: { color: colors.slate, fontFamily: font.semibold, fontSize: 13 },
});

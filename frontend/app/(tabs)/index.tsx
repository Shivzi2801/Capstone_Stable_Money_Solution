import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors, font, radius, spacing, shadow } from "@/src/theme";
import { useStableMoney, fmtINR } from "@/src/store";
import { CONSTANTS } from "@/src/data/banks";
import { SourceChip } from "@/src/SourceChip";

export default function Home() {
  const router = useRouter();
  const { fds, bannerDismissed, dismissBanner } = useStableMoney();
  const [notifOpen, setNotifOpen] = useState(false);

  const investedTotal = fds.reduce((s, f) => s + f.amount, 0);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.brandDark} />

      {/* Purple Header */}
      <LinearGradient
        colors={[colors.brandDark, colors.brand]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <SafeAreaView edges={["top"]}>
          <View style={styles.headerRow}>
            <View style={styles.brandRow}>
              <View style={styles.logoDot}>
                <Ionicons name="shield-checkmark" size={14} color={colors.brand} />
              </View>
              <Text style={styles.brandText}>Stable Money</Text>
            </View>
            <View style={styles.headerIcons}>
              <Pressable
                onPress={() => setNotifOpen((v) => !v)}
                testID="notif-bell"
                style={styles.iconBtn}
              >
                <Ionicons name="notifications-outline" size={20} color="#fff" />
                <View style={styles.dot} />
              </Pressable>
              <View style={styles.avatar} testID="avatar">
                <Text style={styles.avatarText}>P</Text>
              </View>
            </View>
          </View>

          <View style={styles.investedRow}>
            <Text style={styles.investedLabel}>Invested with Stable Money</Text>
            <Text style={styles.investedAmt} testID="invested-amount">
              {fmtINR(investedTotal)}
            </Text>
            <Text style={styles.investedSub}>
              {fds.length} fixed deposit{fds.length > 1 ? "s" : ""} · your first
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Prototype banner */}
        {!bannerDismissed && (
          <View style={styles.banner} testID="prototype-banner">
            <Ionicons name="information-circle" size={16} color={colors.warning} />
            <Text style={styles.bannerText}>
              Prototype — rates/ratings seeded from real June 2026 values; in production these come
              from partner feeds, rating agencies, and RBI.
            </Text>
            <Pressable hitSlop={8} onPress={dismissBanner} testID="banner-dismiss">
              <Ionicons name="close" size={16} color={colors.slate} />
            </Pressable>
          </View>
        )}

        {/* HERO — Idle Cash Card */}
        <View style={styles.hero} testID="idle-cash-hero">
          <Text style={styles.heroEyebrow}>YOUR IDLE CASH</Text>
          <Text style={styles.heroTitle}>
            You have about <Text style={styles.heroAmt}>{fmtINR(CONSTANTS.userIdleSavings)}</Text>{" "}
            in savings earning ~3%.
          </Text>
          <Text style={styles.heroSubtitle}>
            The same amount in an insured FD earns far more.
          </Text>

          {/* Comparison bars */}
          <View style={styles.barRow}>
            <View style={styles.barLabelRow}>
              <Text style={styles.barLabel}>Savings account</Text>
              <Text style={styles.barRate}>3.0%</Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: "37%", backgroundColor: colors.slate }]} />
            </View>
          </View>

          <View style={styles.barRow}>
            <View style={styles.barLabelRow}>
              <Text style={[styles.barLabel, { color: colors.brand }]}>Insured FD</Text>
              <Text style={[styles.barRate, { color: colors.brand }]}>8.10%</Text>
            </View>
            <View style={styles.barTrack}>
              <LinearGradient
                colors={[colors.brand, colors.brandDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.barFill, { width: "100%" }]}
              />
            </View>
          </View>

          <SourceChip source="partner_rate" variant="block">
            Both rates are real and checkable: savings ~3% (your bank), top insured FD 8.10% (source: partner rate, Jun 2026). We don't set either.
          </SourceChip>

          <Pressable
            style={styles.heroCta}
            onPress={() => router.push("/allocation")}
            testID="cta-put-to-work"
          >
            <Text style={styles.heroCtaText}>Put it to work — see how</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </Pressable>
        </View>

        {/* Passbook card */}
        <Text style={styles.sectionTitle}>Passbook</Text>
        <Pressable
          style={styles.passbookCard}
          onPress={() => router.push("/passbook")}
          testID="passbook-card"
        >
          <View style={styles.passbookHeader}>
            <View style={styles.unityLogo}>
              <Text style={styles.unityLogoText}>U</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.passbookName}>Unity SFB · 1Y FD</Text>
              <Text style={styles.passbookSub}>Your trial · booked Mar 18, 2026</Text>
            </View>
            <View style={styles.trialPill}>
              <Text style={styles.trialPillText}>Trial</Text>
            </View>
          </View>
          <View style={styles.passbookFooter}>
            <View>
              <Text style={styles.passbookLabel}>Amount</Text>
              <Text style={styles.passbookValue}>{fmtINR(25000)}</Text>
            </View>
            <View>
              <Text style={styles.passbookLabel}>Rate</Text>
              <Text style={styles.passbookValue}>7.25%</Text>
            </View>
            <View>
              <Text style={styles.passbookLabel}>Matures</Text>
              <Text style={styles.passbookValue}>Mar 2027</Text>
            </View>
          </View>
        </Pressable>

        {/* Tools row */}
        <Text style={styles.sectionTitle}>Tools</Text>
        <View style={styles.toolsRow}>
          <ToolCard
            icon="calculator-outline"
            title="Returns calculator"
            sub="See what you'll keep"
            onPress={() => router.push("/tools/calculator")}
            testID="tool-calculator"
          />
          <ToolCard
            icon="stats-chart-outline"
            title="Build a ladder"
            sub="Stagger maturities"
            onPress={() => router.push("/tools/ladder")}
            testID="tool-ladder"
          />
          <ToolCard
            icon="lock-open-outline"
            title="Can I break an FD?"
            sub="The honest answer"
            onPress={() => router.push("/tools/liquidity")}
            testID="tool-liquidity"
          />
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>

      {notifOpen && (
        <View style={styles.notifDropdown} testID="notif-card">
          <Pressable
            style={styles.notifNavRow}
            onPress={() => {
              setNotifOpen(false);
              router.push("/rate-alert");
            }}
            testID="notif-item"
          >
            <View style={styles.notifIcon}>
              <Ionicons name="trending-up" size={16} color={colors.warning} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.notifTitle}>
                RBI raised the repo rate by 0.25%
              </Text>
              <Text style={styles.notifBody}>
                Banks usually lift FD rates within weeks.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.slate} />
          </Pressable>
          <View style={styles.notifSourceRow}>
            <SourceChip
              source="rbi_mpc"
              label="RBI MPC statement"
              variant="chip"
              testID="notif-source"
            />
          </View>
        </View>
      )}
    </View>
  );
}

const ToolCard: React.FC<{
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  sub: string;
  onPress: () => void;
  testID?: string;
}> = ({ icon, title, sub, onPress, testID }) => (
  <Pressable
    style={({ pressed }) => [styles.toolCard, pressed && { transform: [{ scale: 0.98 }] }]}
    onPress={onPress}
    testID={testID}
  >
    <View style={styles.toolIcon}>
      <Ionicons name={icon} size={20} color={colors.brand} />
    </View>
    <Text style={styles.toolTitle}>{title}</Text>
    <Text style={styles.toolSub}>{sub}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { paddingBottom: 80, paddingHorizontal: spacing.lg },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.sm,
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoDot: {
    width: 26, height: 26, borderRadius: 8, backgroundColor: colors.lime,
    justifyContent: "center", alignItems: "center",
  },
  brandText: { color: "#fff", fontFamily: font.extrabold, fontSize: 17, letterSpacing: 0.2 },
  headerIcons: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.14)",
    justifyContent: "center", alignItems: "center",
  },
  dot: {
    position: "absolute", top: 9, right: 10, width: 8, height: 8,
    borderRadius: 4, backgroundColor: colors.lime, borderWidth: 1.5, borderColor: colors.brandDark,
  },
  avatar: {
    width: 38, height: 38, borderRadius: 19, backgroundColor: colors.lime,
    justifyContent: "center", alignItems: "center",
  },
  avatarText: { fontFamily: font.extrabold, color: colors.brandDark, fontSize: 15 },
  investedRow: { marginTop: spacing.xl },
  investedLabel: { color: "rgba(255,255,255,0.75)", fontFamily: font.medium, fontSize: 12 },
  investedAmt: { color: "#fff", fontFamily: font.extrabold, fontSize: 30, marginTop: 4 },
  investedSub: { color: "rgba(255,255,255,0.7)", fontFamily: font.medium, fontSize: 12, marginTop: 2 },

  notifDropdown: {
    position: "absolute", top: 110, right: spacing.lg, left: spacing.lg,
    backgroundColor: "#fff", borderRadius: radius.lg,
    paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm,
    zIndex: 1000, elevation: 16,
    ...shadow.card,
  },
  notifNavRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.sm },
  notifSourceRow: { marginTop: spacing.sm, marginLeft: 40 },
  notifIcon: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: colors.warningBg, justifyContent: "center", alignItems: "center",
  },
  notifTitle: { fontFamily: font.bold, fontSize: 13.5, color: colors.ink, lineHeight: 18 },
  notifBody: { fontFamily: font.regular, fontSize: 12, color: colors.slate, marginTop: 2 },

  scroll: { flex: 1, marginTop: -60 },
  scrollContent: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxl },

  banner: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: "#fff", borderRadius: radius.md, padding: spacing.md,
    marginBottom: spacing.md, borderLeftWidth: 3, borderLeftColor: colors.warning,
    ...shadow.soft,
  },
  bannerText: { flex: 1, color: colors.slate, fontFamily: font.medium, fontSize: 11.5, lineHeight: 16 },

  hero: {
    backgroundColor: "#fff", borderRadius: radius.xl, padding: spacing.xl,
    ...shadow.card,
  },
  heroEyebrow: { color: colors.brand, fontFamily: font.bold, fontSize: 11, letterSpacing: 1 },
  heroTitle: {
    color: colors.ink, fontFamily: font.bold, fontSize: 19, lineHeight: 26, marginTop: 8,
  },
  heroAmt: { color: colors.brand },
  heroSubtitle: {
    color: colors.slate, fontFamily: font.medium, fontSize: 13, marginTop: 6, lineHeight: 19,
  },
  barRow: { marginTop: spacing.lg },
  barLabelRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  barLabel: { color: colors.ink, fontFamily: font.semibold, fontSize: 13 },
  barRate: { color: colors.ink, fontFamily: font.bold, fontSize: 14 },
  barTrack: {
    height: 12, backgroundColor: colors.bg, borderRadius: 6, overflow: "hidden",
  },
  barFill: { height: "100%", borderRadius: 6 },
  heroCta: {
    marginTop: spacing.lg, backgroundColor: colors.ink, paddingVertical: 15,
    borderRadius: radius.lg, flexDirection: "row", justifyContent: "center", alignItems: "center",
    gap: 8,
  },
  heroCtaText: { color: "#fff", fontFamily: font.bold, fontSize: 15 },

  sectionTitle: {
    fontFamily: font.bold, fontSize: 13, color: colors.slate,
    letterSpacing: 0.6, marginTop: spacing.xl, marginBottom: spacing.md,
    textTransform: "uppercase",
  },
  passbookCard: {
    backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, ...shadow.soft,
  },
  passbookHeader: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  unityLogo: {
    width: 40, height: 40, borderRadius: 10, backgroundColor: colors.ink,
    justifyContent: "center", alignItems: "center",
  },
  unityLogoText: { color: "#fff", fontFamily: font.extrabold, fontSize: 16 },
  passbookName: { color: colors.ink, fontFamily: font.bold, fontSize: 14 },
  passbookSub: { color: colors.slate, fontFamily: font.medium, fontSize: 11.5, marginTop: 2 },
  trialPill: {
    backgroundColor: colors.factChipBg, paddingHorizontal: 10, paddingVertical: 3,
    borderRadius: 999,
  },
  trialPillText: { color: colors.factGreen, fontFamily: font.bold, fontSize: 10.5, letterSpacing: 0.3 },
  passbookFooter: {
    flexDirection: "row", justifyContent: "space-between", marginTop: spacing.lg,
    paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.divider,
  },
  passbookLabel: { color: colors.slate, fontFamily: font.medium, fontSize: 11 },
  passbookValue: { color: colors.ink, fontFamily: font.bold, fontSize: 14, marginTop: 2 },

  toolsRow: { flexDirection: "row", gap: 10 },
  toolCard: {
    flex: 1, backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.md, ...shadow.soft,
  },
  toolIcon: {
    width: 32, height: 32, borderRadius: 8, backgroundColor: colors.bg,
    justifyContent: "center", alignItems: "center", marginBottom: spacing.sm,
  },
  toolTitle: { color: colors.ink, fontFamily: font.bold, fontSize: 12.5, lineHeight: 17 },
  toolSub: { color: colors.slate, fontFamily: font.medium, fontSize: 10.5, marginTop: 2, lineHeight: 14 },
});

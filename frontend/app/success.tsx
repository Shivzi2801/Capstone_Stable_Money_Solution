import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown, FadeIn, ZoomIn } from "react-native-reanimated";
import { colors, font, radius, spacing, shadow } from "@/src/theme";
import { useStableMoney, fmtINR } from "@/src/store";
import { BANKS } from "@/src/data/banks";
import { PrimaryButton } from "@/src/PrimaryButton";

export default function Success() {
  const router = useRouter();
  const { fds, selectedBankId } = useStableMoney();
  const last = fds[fds.length - 1];
  const bank = BANKS.find((b) => b.id === selectedBankId);

  useEffect(() => {
    try { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); } catch {}
  }, []);

  return (
    <View style={styles.root}>
      <LinearGradient colors={[colors.brand, colors.brandDark]} style={styles.bg} />
      <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Animated.View entering={ZoomIn.duration(380)} style={styles.checkRing}>
            <View style={styles.checkInner}>
              <Ionicons name="checkmark" size={48} color={colors.brandDark} />
            </View>
          </Animated.View>

          <Animated.Text entering={FadeInDown.delay(160).duration(420)} style={styles.title}>
            Your second FD is booked.
          </Animated.Text>

          <Animated.View entering={FadeIn.delay(320).duration(360)} style={styles.pill}>
            <Ionicons name="finger-print" size={12} color={colors.brandDark} />
            <Text style={styles.pillText}>A decision you made</Text>
          </Animated.View>

          <Animated.Text entering={FadeInDown.delay(400).duration(420)} style={styles.copy}>
            You moved money off a 3% savings account into a{" "}
            <Text style={styles.copyStrong}>{bank?.rate.toFixed(2) ?? "8.10"}% insured FD</Text> — and
            you checked the facts yourself. That's the difference between being{" "}
            <Text style={styles.copyDim}>sold to</Text> and being{" "}
            <Text style={styles.copyStrong}>informed.</Text>
          </Animated.Text>

          <Animated.View entering={FadeInDown.delay(520).duration(420)} style={styles.card}>
            <View style={styles.cardRow}>
              <View style={styles.cardIcon}>
                <Ionicons name="trending-up" size={18} color={colors.factGreen} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardLabel}>New FD</Text>
                <Text style={styles.cardVal}>
                  {last ? `${fmtINR(last.amount)} · ${last.bank} · ${last.rate.toFixed(2)}%` : ""}
                </Text>
              </View>
            </View>
            <View style={styles.cardDivider} />
            <View style={styles.cardRow}>
              <View style={styles.cardIcon}>
                <Ionicons name="layers" size={18} color={colors.factGreen} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardLabel}>Laddered portion</Text>
                <Text style={styles.cardVal}>frees up every 3 months</Text>
              </View>
            </View>
            <View style={styles.cardDivider} />
            <View style={styles.cardRow}>
              <View style={styles.cardIcon}>
                <Ionicons name="notifications" size={18} color={colors.factGreen} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardLabel}>Future decisions</Text>
                <Text style={styles.cardVal}>we'll bring them to you</Text>
              </View>
            </View>
          </Animated.View>

          <View style={{ height: spacing.xl }} />
          <PrimaryButton
            label="Back to home"
            variant="lime"
            onPress={() => router.replace("/")}
            testID="success-home"
            icon={<Ionicons name="home" size={18} color={colors.ink} />}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.brand },
  bg: { ...StyleSheet.absoluteFillObject },
  scroll: { paddingHorizontal: spacing.xl, paddingTop: spacing.xxl, paddingBottom: spacing.xl, alignItems: "center", gap: spacing.md },
  checkRing: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center", alignItems: "center",
  },
  checkInner: {
    width: 86, height: 86, borderRadius: 43, backgroundColor: colors.lime,
    justifyContent: "center", alignItems: "center",
  },
  title: { color: "#fff", fontFamily: font.extrabold, fontSize: 24, textAlign: "center", marginTop: spacing.lg, lineHeight: 30 },
  pill: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: colors.lime, borderRadius: 999, marginTop: spacing.sm },
  pillText: { color: colors.brandDark, fontFamily: font.extrabold, fontSize: 11.5 },
  copy: { color: "rgba(255,255,255,0.88)", fontFamily: font.medium, fontSize: 14, lineHeight: 21, textAlign: "center", marginTop: spacing.lg },
  copyStrong: { color: "#fff", fontFamily: font.bold },
  copyDim: { color: "rgba(255,255,255,0.55)" },

  card: { width: "100%", backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.lg, ...shadow.card },
  cardRow: { flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.sm },
  cardIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.factChipBg, justifyContent: "center", alignItems: "center" },
  cardLabel: { color: colors.slate, fontFamily: font.medium, fontSize: 11 },
  cardVal: { color: colors.ink, fontFamily: font.bold, fontSize: 13.5, marginTop: 2 },
  cardDivider: { height: 1, backgroundColor: colors.divider },
});

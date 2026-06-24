import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { colors, font, radius, spacing, shadow } from "@/src/theme";
import { SourceChip } from "@/src/SourceChip";
import { PrimaryButton } from "@/src/PrimaryButton";

export default function RateAlert() {
  const router = useRouter();
  return (
    <View style={styles.root}>
      <LinearGradient colors={[colors.brandDark, colors.brand]} style={styles.header}>
        <SafeAreaView edges={["top"]}>
          <Pressable onPress={() => router.back()} style={styles.back} testID="rate-back">
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </Pressable>
          <View style={styles.headerBody}>
            <View style={styles.pill}>
              <Ionicons name="trending-up" size={12} color={colors.lime} />
              <Text style={styles.pillText}>Rate event</Text>
            </View>
            <Text style={styles.h1}>The RBI just nudged rates up.</Text>
            <Text style={styles.h1Sub}>Banks usually follow within weeks — this is a good window.</Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.statsCard}>
          <View style={styles.statRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Repo rate</Text>
              <View style={styles.statValRow}>
                <Ionicons name="arrow-up" size={16} color={colors.success} />
                <Text style={styles.statVal}>+0.25%</Text>
              </View>
              <Text style={styles.statSub}>New: 6.75%</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Top insured FD</Text>
              <View style={styles.statValRow}>
                <Text style={styles.statVal}>7.85% → 8.10%</Text>
              </View>
              <Text style={styles.statSub}>Partner small finance banks</Text>
            </View>
          </View>
          <SourceChip source="rbi_mpc" variant="block">
            Repo rate is set publicly by the RBI Monetary Policy Committee (source: RBI MPC statement, Jun 2026).
          </SourceChip>
        </View>

        <View style={styles.honestCard}>
          <View style={styles.honestIcon}>
            <Ionicons name="hand-left-outline" size={20} color={colors.factGreen} />
          </View>
          <Text style={styles.honestTitle}>The honest version</Text>
          <Text style={styles.honestBody}>
            We'd tell you if rates fell too — then the message would be{" "}
            <Text style={styles.honestEm}>"your current FD looks good, sit tight."</Text>{" "}
            Telling you both ways is the point.
          </Text>
        </View>

        <PrimaryButton
          label="See how to deploy your idle cash"
          onPress={() => router.replace("/allocation")}
          testID="rate-cta"
          icon={<Ionicons name="arrow-forward" size={18} color="#fff" />}
        />
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { paddingBottom: spacing.xl, paddingHorizontal: spacing.lg },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.14)", justifyContent: "center", alignItems: "center", marginTop: spacing.sm },
  headerBody: { marginTop: spacing.lg },
  pill: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 5, backgroundColor: "rgba(200,245,96,0.18)", borderRadius: 999 },
  pillText: { color: colors.lime, fontFamily: font.bold, fontSize: 11 },
  h1: { color: "#fff", fontFamily: font.extrabold, fontSize: 24, marginTop: spacing.md, lineHeight: 30 },
  h1Sub: { color: "rgba(255,255,255,0.8)", fontFamily: font.medium, fontSize: 13, marginTop: 6, lineHeight: 19 },

  scroll: { padding: spacing.lg, gap: spacing.lg },
  statsCard: { backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, gap: spacing.md, ...shadow.soft },
  statRow: { flexDirection: "row", alignItems: "stretch" },
  statBox: { flex: 1 },
  divider: { width: 1, backgroundColor: colors.divider, marginHorizontal: spacing.md },
  statLabel: { color: colors.slate, fontFamily: font.medium, fontSize: 11 },
  statValRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  statVal: { color: colors.ink, fontFamily: font.extrabold, fontSize: 18 },
  statSub: { color: colors.slate, fontFamily: font.medium, fontSize: 11, marginTop: 2 },

  honestCard: { backgroundColor: colors.factChipBg, borderRadius: radius.lg, padding: spacing.lg },
  honestIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", marginBottom: spacing.sm },
  honestTitle: { color: colors.factGreen, fontFamily: font.extrabold, fontSize: 15 },
  honestBody: { color: colors.ink, fontFamily: font.medium, fontSize: 13.5, lineHeight: 20, marginTop: 6 },
  honestEm: { color: colors.factGreen, fontFamily: font.bold },
});

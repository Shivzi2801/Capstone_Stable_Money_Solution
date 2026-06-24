import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, font, radius, spacing, shadow } from "@/src/theme";

const ITEMS: { icon: keyof typeof Ionicons.glyphMap; title: string; sub: string; route: string }[] = [
  { icon: "calculator-outline", title: "Returns calculator", sub: "After-tax maturity, compounded", route: "/tools/calculator" },
  { icon: "stats-chart-outline", title: "Build a ladder", sub: "Stagger maturities, never run dry", route: "/tools/ladder" },
  { icon: "lock-open-outline", title: "Can I break an FD?", sub: "Liquidity, plain spoken", route: "/tools/liquidity" },
  { icon: "trending-up-outline", title: "RBI repo rate alert", sub: "What changed and what it means", route: "/rate-alert" },
];

export default function Explore() {
  const router = useRouter();
  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.header}>
        <Text style={styles.h1}>Explore</Text>
        <Text style={styles.sub}>Tools & explainers — all sourced.</Text>
      </SafeAreaView>
      <ScrollView contentContainerStyle={styles.scroll}>
        {ITEMS.map((it) => (
          <Pressable
            key={it.route}
            style={styles.card}
            onPress={() => router.push(it.route as any)}
            testID={`explore-${it.title.split(" ")[0].toLowerCase()}`}
          >
            <View style={styles.iconBox}>
              <Ionicons name={it.icon} size={22} color={colors.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{it.title}</Text>
              <Text style={styles.cardSub}>{it.sub}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { padding: spacing.lg, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.divider },
  h1: { color: colors.ink, fontFamily: font.extrabold, fontSize: 24 },
  sub: { color: colors.slate, fontFamily: font.medium, fontSize: 12.5, marginTop: 4 },
  scroll: { padding: spacing.lg, gap: spacing.md },
  card: {
    flexDirection: "row", alignItems: "center", gap: spacing.md,
    backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, ...shadow.soft,
  },
  iconBox: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: colors.bg,
    justifyContent: "center", alignItems: "center",
  },
  title: { color: colors.ink, fontFamily: font.bold, fontSize: 14 },
  cardSub: { color: colors.slate, fontFamily: font.medium, fontSize: 12, marginTop: 2 },
});

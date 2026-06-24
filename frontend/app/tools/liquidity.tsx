import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, font, radius, spacing, shadow } from "@/src/theme";
import { SourceChip } from "@/src/SourceChip";

export default function Liquidity() {
  const router = useRouter();
  return (
    <View style={styles.root}>
      <SafeAreaView edges={["top"]} style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back} testID="liquidity-back">
          <Ionicons name="chevron-back" size={22} color={colors.ink} />
        </Pressable>
        <View style={styles.headBadge}>
          <Ionicons name="lock-open" size={14} color={colors.factGreen} />
          <Text style={styles.headBadgeText}>Honest answer</Text>
        </View>
        <Text style={styles.h1}>Your principal is never at risk.</Text>
        <Text style={styles.sub}>
          Most people think "FD = stuck money." It isn't. Here's exactly what happens if you break it.
        </Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Card icon="checkmark-circle" iconColor={colors.success} title="Principal — 100% safe">
          What you put in, you get back. Always. Banks never touch the principal.
        </Card>
        <Card icon="trending-down" iconColor={colors.warning} title="Early break — rate trims ~0.5–1%">
          The bank pays interest at the rate that applied for the actual duration you held, minus a
          small penalty. So you earn less interest — not no interest.
        </Card>
        <Card icon="ban" iconColor={colors.success} title="Penalty on principal — ₹0">
          There is no charge on the principal amount itself. Misconception, busted.
        </Card>

        <View style={styles.misCard}>
          <View style={styles.misHead}>
            <Ionicons name="bulb" size={16} color={colors.warning} />
            <Text style={styles.misTitle}>Common misconception</Text>
          </View>
          <Text style={styles.misBody}>
            <Text style={styles.crossed}>"My money is locked away — I'll lose it if I need it."</Text>
            {"\n"}
            <Text style={styles.misRight}>You'll only lose a sliver of interest. Never the principal.</Text>
          </Text>
        </View>

        <SourceChip source="premature_withdrawal" variant="block">
          Premature-withdrawal rules vary slightly per bank but always preserve principal. Source: bank-published FD terms.
        </SourceChip>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const Card: React.FC<{ icon: keyof typeof Ionicons.glyphMap; iconColor: string; title: string; children: React.ReactNode }> = ({
  icon, iconColor, title, children,
}) => (
  <View style={styles.card}>
    <View style={[styles.iconWrap, { backgroundColor: iconColor + "22" }]}>
      <Ionicons name={icon} size={20} color={iconColor} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardBody}>{children}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.divider },
  back: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", marginTop: spacing.sm, marginBottom: spacing.sm },
  headBadge: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 5, backgroundColor: colors.factChipBg, borderRadius: 999 },
  headBadgeText: { color: colors.factGreen, fontFamily: font.bold, fontSize: 11 },
  h1: { color: colors.ink, fontFamily: font.extrabold, fontSize: 22, marginTop: spacing.sm, lineHeight: 28 },
  sub: { color: colors.slate, fontFamily: font.medium, fontSize: 13, marginTop: 6, lineHeight: 19 },

  scroll: { padding: spacing.lg, gap: spacing.md },
  card: { backgroundColor: "#fff", borderRadius: radius.lg, padding: spacing.lg, flexDirection: "row", gap: spacing.md, ...shadow.soft },
  iconWrap: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  cardTitle: { color: colors.ink, fontFamily: font.bold, fontSize: 14 },
  cardBody: { color: colors.slate, fontFamily: font.medium, fontSize: 12.5, lineHeight: 19, marginTop: 4 },

  misCard: { backgroundColor: colors.warningBg, borderRadius: radius.lg, padding: spacing.lg },
  misHead: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: spacing.sm },
  misTitle: { color: colors.warning, fontFamily: font.extrabold, fontSize: 12, letterSpacing: 0.5 },
  misBody: { color: colors.ink, fontFamily: font.medium, fontSize: 13, lineHeight: 19 },
  crossed: { textDecorationLine: "line-through", color: colors.slate },
  misRight: { color: colors.ink, fontFamily: font.bold },
});

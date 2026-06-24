import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Platform } from "react-native";
import { colors, font } from "@/src/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: styles.bar,
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({ color, focused, size }) => {
          const map: Record<string, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
            index: ["home", "home-outline"],
            passbook: ["wallet", "wallet-outline"],
            explore: ["compass", "compass-outline"],
            profile: ["person-circle", "person-circle-outline"],
          };
          const [active, inactive] = map[route.name] ?? ["ellipse", "ellipse-outline"];
          return <Ionicons name={focused ? active : inactive} size={22} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="passbook" options={{ title: "Passbook" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.divider,
    borderTopWidth: 1,
    height: Platform.OS === "ios" ? 84 : 64,
    paddingTop: 6,
  },
  label: { fontFamily: font.semibold, fontSize: 11, marginTop: -2 },
});

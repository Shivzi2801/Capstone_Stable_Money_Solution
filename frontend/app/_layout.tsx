import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { LogBox, View } from "react-native";

import { useIconFonts } from "@/src/hooks/use-icon-fonts";
import { StableMoneyProvider } from "@/src/store";
import { SourceModal } from "@/src/SourceModal";

LogBox.ignoreAllLogs(true);
SplashScreen.preventAutoHideAsync();

// Plus Jakarta Sans via Fontsource CDN (static TTFs)
const FONT_BASE =
  "https://cdn.jsdelivr.net/fontsource/fonts/plus-jakarta-sans@latest/latin";

const FONT_MAP = {
  PlusJakartaSans_400Regular: `${FONT_BASE}-400-normal.ttf`,
  PlusJakartaSans_500Medium: `${FONT_BASE}-500-normal.ttf`,
  PlusJakartaSans_600SemiBold: `${FONT_BASE}-600-normal.ttf`,
  PlusJakartaSans_700Bold: `${FONT_BASE}-700-normal.ttf`,
  PlusJakartaSans_800ExtraBold: `${FONT_BASE}-800-normal.ttf`,
};

export default function RootLayout() {
  const [iconsLoaded, iconsError] = useIconFonts();
  const [brandLoaded, setBrandLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync(FONT_MAP)
      .catch(() => {})
      .finally(() => setBrandLoaded(true));
  }, []);

  useEffect(() => {
    if ((iconsLoaded || iconsError) && brandLoaded) {
      SplashScreen.hideAsync();
    }
  }, [iconsLoaded, iconsError, brandLoaded]);

  if (!brandLoaded) return null;
  if (!iconsLoaded && !iconsError) return null;

  return (
    <StableMoneyProvider>
      <View style={{ flex: 1, backgroundColor: "#F6F5FB" }}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: { backgroundColor: "#F6F5FB" },
          }}
        />
        <SourceModal />
      </View>
    </StableMoneyProvider>
  );
}

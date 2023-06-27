import React from "react";
import "../lib/dayjs";
import { SplashScreen, Slot } from "expo-router";

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const [fontsLoading] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });
  if (!fontsLoading) {
    return <SplashScreen />;
  }
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Slot />
    </>
  );
}

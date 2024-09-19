import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider } from '@clerk/clerk-react'

export default function RootLayout() {

  useFonts({
    "outfit":require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold":require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium":require("../assets/fonts/Outfit-Medium.ttf"),
  })
  return (
    <ClerkProvider publishableKey={process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}>
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="(tabs)" />
    </Stack>
    </ClerkProvider>
  );
}

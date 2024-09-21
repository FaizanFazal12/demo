import { useFonts } from "expo-font";
import { Link, Slot, Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { Text } from "react-native";
import * as SecureStore from 'expo-secure-store';
import LoginScreen from '../components/LoginScreen';

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const [loaded] = useFonts({
    "outfit": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const tokenCache = {
    async getToken() {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log('No values stored under key: ' + key);
        }
        return item;
      } catch (error) {
        console.error('SecureStore get item error: ', error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken() {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      {/* Ensure that Slot is rendered first to prevent navigation errors */}
      <ClerkLoaded>
        <Slot screenOptions={
        {   headerShown: false,}
        }/>

        {/* Handle authenticated and unauthenticated views */}
        <SignedIn>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SignedIn>

        <SignedOut>
          <LoginScreen/>
        </SignedOut>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'AppleGaramond': require('../assets/fonts/AppleGaramond.ttf'),
    'AppleGaramound-Bold': require('../assets/fonts/AppleGaramond-Bold.ttf'),
    'Goudy-Heavyface-Cond-Reg': require('../assets/fonts/Goudy-Heavyface-Cond-Reg.otf'),
    'CooperFiveOpti-Black': require('../assets/fonts/CooperFiveOpti-Black.otf'),
    'Bogart-Bold': require('../assets/fonts/Bogart-Bold.ttf'),
    'Bogart-Medium': require('../assets/fonts/Bogart-Medium.ttf'),
    'Recoleta-Regular': require('../assets/fonts/Recoleta-Regular.otf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>  
  );
}

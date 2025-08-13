

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import Toast from 'react-native-toast-message';
import CustomSafeView from "~/components/CustomSafeView";
import useUser from "~/Store/useUser";
import { ParseInit } from "~/utils/Parse";

import "../../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { user, refresh } = useUser();

  useEffect(() => {
    const initialize = async () => {
      try {
        await ParseInit();
        await refresh();
        console.log("root layout");
        await SplashScreen.hideAsync();
      } catch (e) {
        console.log(e);
      }
    };
    initialize();
    // if(user){
    //   SplashScreen.hideAsync();
    // }
  }, []);

  console.log("user", user);

  if (user === undefined) return null;

  return (
    <CustomSafeView>
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName={user ? "(tabs)" : "login"}
      >
        <Stack.Protected guard={!user}>
          <Stack.Screen name="login" options={{animation:"fade"}} />
          <Stack.Screen name="register" options={{animation:"fade"}}/>
        </Stack.Protected>

        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
      </Stack>
      <Toast />
    </CustomSafeView>
  );
}

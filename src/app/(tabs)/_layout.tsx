// import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Home, Settings } from "lucide-react-native";
import tailwind from "~/utils/tailwind";
export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tailwind.theme.colors.rose[600], // slate-800
        },
        tabBarActiveTintColor: tailwind.theme.colors.white,
        tabBarInactiveTintColor: tailwind.theme.colors.rose[300],
        animation: "fade",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          borderColor:tailwind.theme.colors.rose[600],
          paddingVertical: 6, // adjust for vertical centering
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
      name="settings"
        options={{
          tabBarShowLabel: false,
          // tabBarIcon: ({ color }) => <Home color={color} />,
          tabBarIcon: ({ color }) => <Settings color={color}  />,
        }}
      />
    </Tabs>
  );
}

// import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Cog, Home } from "lucide-react-native";
export default function AuthLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          // backgroundColor: tailwind.theme.colors.rose[600], // slate-800
        },
        // tabBarActiveTintColor: tailwind.theme.colors.white,
        // tabBarInactiveTintColor: tailwind.theme.colors.rose[300],
        animation: "fade",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingVertical: 6, // adjust for vertical centering
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Home />
            // <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => (
            <Cog />
            // <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

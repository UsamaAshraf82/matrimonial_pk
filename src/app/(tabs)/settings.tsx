import logo from "@/assets/images/icon.png";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import useUser from "~/Store/useUser";

// const data = [

// ];

export default function Logout() {
  const { logout } = useUser();
  return (
    <ScrollView className="flex-1 bg-rose-100">
      <View className="flex-1 items-center justify-center px-6 py-12">
        <Image source={logo} className="w-28 h-28 mb-6" resizeMode="contain" />

        <View className="flex-row mt-6">
          <TouchableOpacity
            onPress={() => {
              logout();
            }}
            className="w-full bg-rose-600 rounded-xl py-4"
          >
            <Text className="text-center text-white font-semibold text-lg">
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

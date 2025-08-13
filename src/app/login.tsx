import logo from "@/assets/images/icon.png";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import useUser from "~/Store/useUser";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Normally you'd call your API here
    console.log("Logging in with:", email, password);
    await login(email, password);
    // router.replace("/(app)");
  };

  return (
    <ScrollView contentContainerClassName={'flex-1'}>
      <View className="flex-1 items-center justify-center p-6 bg-rose-100">
        {/* Logo */}
        <Image source={logo} className="w-28 h-28 mb-6 rounded-full" />

        {/* Title */}
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Welcome Back
        </Text>
        <Text className="text-gray-500 mb-8">Sign in to continue</Text>

        {/* Email */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="w-full border placeholder:text-gray-400 border-gray-300 bg-white rounded-xl px-4 py-3 mb-4"
          keyboardType="email-address"
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className={"w-full border placeholder:text-gray-400 text-black  border-gray-300 bg-white rounded-xl px-4 py-3 mb-6"}
          secureTextEntry
        />

        {/* Login Button */}
        <Pressable
          onPress={handleLogin}
          className="w-full bg-rose-600 py-3 rounded-xl mb-4"
        >
          <Text className="text-white text-center text-lg font-semibold">
            Sign In
          </Text>
        </Pressable>

        {/* Signup Link */}
        <View className="flex-row mt-4">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Pressable onPress={() => router.push("/register")}>
            <Text className="text-rose-600 font-semibold">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

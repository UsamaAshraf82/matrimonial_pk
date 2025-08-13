import logo from "@/assets/images/icon.png";
import { Link } from "expo-router";
import Parse from "parse/react-native";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useUser from "~/Store/useUser";
import { User_Type } from "~/types/user";

export default function SignupScreen() {
  const { signup } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const newUser: Parse.User<User_Type> = new Parse.User();
      newUser.set("email", email);
      newUser.set("username", email);
      newUser.setPassword(password);
      const user = (await newUser.signUp()) as Parse.User<User_Type>;
      // console.log(user)
      //  await signup(email, password);
    } catch (e) {
      console.log("error", e);
    }
    // console.log({ name, email, password });
    // TODO: Call your signup API and update useUser()
  };

  return (
    <ScrollView contentContainerClassName={"flex-1"}>
      <View className="flex-1 items-center justify-center p-6 bg-rose-100">
        {/* Logo */}
        <Image source={logo} className="w-28 h-28 mb-6" resizeMode="contain" />

        {/* Title */}
        <Text className="text-3xl font-bold text-gray-800  mb-2">
          Create Account
        </Text>
        <Text className="text-gray-500  mb-8">Join us and get started</Text>

        {/* Email Input */}
        <TextInput
          className="w-full border bg-white placeholder:text-gray-400 border-gray-300 rounded-xl px-4 py-3 mb-4"
          placeholder="Email Address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          className="w-full border bg-white placeholder:text-gray-400 text-black border-gray-300 rounded-xl px-4 py-3 mb-6"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Signup Button */}
        <TouchableOpacity
          className="w-full bg-rose-600 rounded-xl py-4"
          onPress={handleSignup}
        >
          <Text className="text-center text-white font-semibold text-lg">
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="flex-row mt-6">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/login" className="text-rose-600 font-semibold">
            Log in
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

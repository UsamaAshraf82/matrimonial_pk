import logo from "@/assets/images/icon.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import useUser from "~/Store/useUser";

// ✅ Define Zod schema
const signupSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Infer TypeScript type from schema
type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupScreen() {
  const { signup } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      signup(data.email, data.password);
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <ScrollView contentContainerClassName="flex-1">
      <View className="flex-1 items-center justify-center p-6 bg-rose-100">
        {/* Logo */}
        <Image source={logo} className="w-28 h-28 mb-6" resizeMode="contain" />

        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Create Account
        </Text>
        <Text className="text-gray-500 mb-8">Join us and get started</Text>

        {/* Email Input */}
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, value, name },
            formState: { errors },
          }) => (
            <Input
              className="mb-2"
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              error={errors[name]?.message}
            />
          )}
        />

        {/* Password Input */}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, name } }) => (
            <Input
              className="mb-2"
              placeholder="Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              error={errors[name]?.message}
            />
          )}
        />

        {/* Signup Button */}
        <TouchableOpacity
          className={`w-full rounded-xl py-4 ${
            isSubmitting ? "bg-rose-400" : "bg-rose-600"
          }`}
          disabled={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-center text-white font-semibold text-lg">
            {isSubmitting ? "Signing Up..." : "Sign Up"}
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

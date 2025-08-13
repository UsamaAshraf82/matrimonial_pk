import { StatusBar } from "expo-status-bar";
import { PropsWithChildren, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, View } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import tailwind from "~/utils/tailwind";

const CustomSafeView = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <View className="flex-1 bg-rose-600">
        <StatusBar backgroundColor={tailwind.theme.colors.rose[600]} style="light" />
        <KeyboardAvoidingViewP>
          <SafeAreaView
            edges={["bottom", "left", "right", "top"]}
            // style={{ flex: 1 }}
            className="flex-1 bg-rose-600"
          >
            {children}
          </SafeAreaView>
        </KeyboardAvoidingViewP>
      </View>
    </SafeAreaProvider>
  );
};
const KeyboardAvoidingViewP = ({ children }: PropsWithChildren) => {
  const isKeyboardVisible = useKeyboardVisible();

  if (Platform.OS === "ios") {
    return children;
  }

  return (
    <KeyboardAvoidingView
      enabled={isKeyboardVisible}
      behavior={"height"}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  );
};


export default CustomSafeView;

const useKeyboardVisible = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleKeyboardShow = () => {
    setIsKeyboardVisible(true);
  };

  const handleKeyboardHide = () => {
    setIsKeyboardVisible(false);
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow,
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isKeyboardVisible;
};

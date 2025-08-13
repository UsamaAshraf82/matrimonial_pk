import { StatusBar } from "expo-status-bar";
import { PropsWithChildren, useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, View } from "react-native";
import {
  initialWindowMetrics,
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

const CustomSafeView = ({ children }: PropsWithChildren) => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <View className="flex-1 bg-[#1f211e]">
        <StatusBar backgroundColor={"#1f211e"} style="light" />
        <KeyboardAvoidingViewP>
          <SafeAreaView
            edges={["bottom", "left", "right", "top"]}
            // style={{ flex: 1 }}
            className="flex-1 bg-[#1f211e]"
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

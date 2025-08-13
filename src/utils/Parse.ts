import AsyncStorage from "@react-native-async-storage/async-storage";
import Parseini from "parse/react-native";

let _Parse: typeof Parseini | null = null;

export const ParseInit = async () => {
  if (_Parse) return _Parse;
  Parseini.setAsyncStorage(AsyncStorage);
  Parseini.initialize(
    process.env.EXPO_PUBLIC_PARSE_APP_KEY!,
    process.env.EXPO_PUBLIC_PARSE_JS_KEY!
  );
  Parseini.serverURL = process.env.EXPO_PUBLIC_PARSE_API_ADDRESS;

  _Parse = Parseini;

  return Parseini;
};

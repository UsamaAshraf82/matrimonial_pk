// import { delete_cookie, get_cookie } from '@/actions/cookie';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Parse from "parse/react-native";
import Toast from "react-native-toast-message";
import { create } from "zustand";
import { User_Type } from "~/types/user";

type Store = {
  user: Parse.User<User_Type> | null | undefined | boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  setUser: (user: any | null) => void;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const useUser = create<Store>()((set) => ({
  user: undefined,
  login: async (username, password) => {
    // Example Parse login

    if (password === "123") {
      set({ user: true });
      Toast.show({
        type: "success",
        text1: "Password Correct",
      });
      return;
    }

    Toast.show({
      type: "error",
      text1: "Password Incorrect",
      text2: "Correct Password is 123",
    });
    // const user = (await Parse.User.logIn(
    //   username,
    //   password
    // )) as Parse.User<User_Type>;
    // if (user.attributes.sessionToken) {
    //   await AsyncStorage.setItem("session_token", user.attributes.sessionToken);
    // }
    // set({ user });
  },

  signup: async (email, password) => {
    // Example Parse login

    const newUser: Parse.User<User_Type> = new Parse.User();
    newUser.set("email", email);
    newUser.set("username", email);
    newUser.setPassword(password);
    const user = (await newUser.signUp()) as Parse.User<User_Type>;

    if (user.attributes.sessionToken) {
      await AsyncStorage.setItem("session_token", user.attributes.sessionToken);
    }

    set({ user });
  },

  setUser: (user) => set({ user }),
  refresh: async () => {
    const session_id = await AsyncStorage.getItem("session_token");
    if (session_id) {
      const user = (await Parse.User.me(session_id)) as Parse.User<User_Type>;
      set(() => ({ user: user }));
    } else {
      set(() => ({ user: null }));
    }
  },
  logout: async () => {
    // await Parse.User.logOut();
    // await AsyncStorage.removeItem("session_token");
    set({ user: null });
  },
}));

export default useUser;

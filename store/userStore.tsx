import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseAuthTypes } from '@react-native-firebase/auth'


type UserStoreType = {
    user: FirebaseAuthTypes.UserInfo | null;
    setUser: (user: FirebaseAuthTypes.UserInfo | null) => void;
    isLoaded: boolean;
    setIsLoaded: (isLoaded: boolean) => void;
};

export const useUser = create(
    persist<UserStoreType>(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            isLoaded: false,
            setIsLoaded: (isLoaded) => set({ isLoaded }),
        }),
        {
            name: "userStore",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

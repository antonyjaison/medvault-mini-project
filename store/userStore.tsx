import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type UserStoreType = {
    user: FirebaseAuthTypes.UserInfo | null;
    setUser: (user: FirebaseAuthTypes.UserInfo | null) => void;
    isLoaded: boolean;
    setIsLoaded: (isLoaded: boolean) => void;
    name: string;
    setName: (name: string) => void;
    place: string;
    setPlace: (place: string) => void;
    age: string;
    setAge: (age: string) => void;
    height: string;
    setHeight: (height: string) => void;
    weight: string;
    setWeight: (weight: string) => void;
    activity: string;
    setActivity: (activity: string) => void;
    googleFit: boolean;
    setGoogleFit: (googleFit: boolean) => void;
    gender: string;
    setGender: (gender: string) => void;
};

export const useUser = create(
    persist<UserStoreType>(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            isLoaded: false,
            setIsLoaded: (isLoaded) => set({ isLoaded }),
            name: "",
            setName: (name) => set(state => ({
                name,
            })),
            place: "",
            setPlace: (place) => set({ place }),
            age: "",
            setAge: (age) => set({ age }),
            height: "",
            setHeight: (height) => set({ height }),
            weight: "",
            setWeight: (weight) => set({ weight }),
            activity: "",
            setActivity: (activity) => set({ activity }),
            googleFit: false,
            setGoogleFit: (googleFit) => set({ googleFit }),
            gender: "",
            setGender: (gender) => set({ gender })

        }),
        {
            name: "userStore",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EmergencyContactType } from "@/lib/types/emergency-contact-types";


type EmergencyCotactTypes = {
    emergencyContacts: EmergencyContactType[] | null;
    setEmergencyContacts: (documents: any | null) => void;
    addEmergencyContact: (document: any) => void;
};

export const useEmergencyContacts = create(
    persist<EmergencyCotactTypes>(
        (set) => ({
            emergencyContacts: null,
            setEmergencyContacts: (emergencyContacts) => set({ emergencyContacts }),
            addEmergencyContact: (contact) =>
                set((state: any) => ({
                    emergencyContacts: [...state.emergencyContacts, contact],
                })),
        }),
        {
            name: "emergencyContactStore",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
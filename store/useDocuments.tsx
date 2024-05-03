import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DocumentTypes } from "@/lib/types/document-types";


type UserStoreType = {
    documents: DocumentTypes[] | null;
    prescriptions: [];
    setDocuments: (documents: any | null) => void;
    addDocument: (document: any) => void;
    setPrerscriptions: (documents: any | null) => void;
};

export const useDocuments = create(
    persist<UserStoreType>(
        (set) => ({
            documents: null,
            prescriptions:[],
            setDocuments: (documents) => set({ documents }),
            addDocument: (document) =>
                set((state: any) => ({
                    documents: [...state.documents, document],
                })),
            setPrerscriptions: (prescriptions) => set({ prescriptions }),
        }),
        {
            name: "documentsStore",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
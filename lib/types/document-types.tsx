import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type FileTypes = {
    uri: string;
    name: string;
    type: string;
}

export type FolderTypes = {
    name: string,
    id: string,
    files: FileTypes[],
}

export type DocumentTypes = {
    uid: FirebaseAuthTypes.UserInfo["uid"],
    folders: FolderTypes[],
}
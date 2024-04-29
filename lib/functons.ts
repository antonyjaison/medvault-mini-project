import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

export function replaceSpacesWithUnderscores(str: string) {
    return str.replace(/ /g, '_');
}

export const folderExists = async (uid: FirebaseAuthTypes.UserInfo["uid"], folderName: string) => {
    if (!uid) {
        console.error("User ID is not provided.");
        return false;
    }

    try {
        const querySnapshot = await firestore()
            .collection("documents")
            .where("uid", "==", uid)
            .get();

        // Check each document's folders to see if any folder name matches the provided name
        const doesExist = querySnapshot.docs.some(doc => {
            const folders = doc.data().folders || [];
            return folders.some(folder => folder.name === folderName);
        });

        return doesExist;
    } catch (error) {
        console.error("Error checking for folder existence:", error);
        return false; // Assume folder does not exist if there is an error
    }
};

export async function updateFolderWithFile(uid: string, folderName: string, newFile: any) {
    if (!uid) {
      console.error("User ID is missing");
      return;
    }
  
    try {
      const snapshot = await firestore()
        .collection("documents")
        .where("uid", "==", uid)
        .get();
  
      snapshot.docs.forEach(async (doc) => {
        const data = doc.data();
        console.log(data);
        const folders = data.folders || [];
        let isUpdated = false;
  
        const updatedFolders = folders.map(folder => {
          if (folder.name === folderName) {
            isUpdated = true;
            return { ...folder, files: [...folder.files, newFile] };
          } else {
            return folder;
          }
        });
  
        if (isUpdated) {
          await doc.ref.update({ folders: updatedFolders });
          console.log("Folder updated with new file");
        }
      });
    } catch (error) {
      console.error("Failed to update folder:", error);
    }
  }
  

export const addFolderToDocument = async (uid: string, folderName: string, newFile: any) => {
    if (!uid) {
        console.error("User ID is not provided.");
        return;
    }

    const documentRef = firestore().collection("documents").doc(uid);

    try {
        const doc = await documentRef.get();

        if (doc.exists) {
            // Document exists, proceed with update
            const data = doc.data()!;
            const folders = data.folders || [];
            
            // Ensure the folder does not already exist (optional, remove if you want to allow duplicates)
            if (folders.some(folder => folder.name === folderName)) {
                console.error("Folder already exists, cannot add a duplicate.");
                return;
            }

            // Add new folder with the file to the folders array
            folders.push({
                name: folderName,
                files: [newFile]
            });

            // Update the document with the new folders array
            await documentRef.update({ folders });
            console.log("New folder added to document.");
        } else {
            console.error("Document does not exist, cannot update a non-existing document.");
        }
    } catch (error) {
        console.error("Error updating document with new folder:", error);
    }
};
import { View, Text, Dimensions, TouchableOpacity, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { Divider } from '@/components/divider'
import { Entypo, Ionicons, Feather } from '@expo/vector-icons'
import Model from '@/components/Model'
import { ParamsType } from '.'
import * as DocumentPicker from "expo-document-picker";
import ImagePreview from '@/components/image-preview'
import { FileType } from '@/lib/types/file-type'
import DocumentCard from '@/components/DocumentCard'
import Input from '@/components/input'
import { BASE_URL } from '@env'
import storage from '@react-native-firebase/storage';
import { folderExists, replaceSpacesWithUnderscores, addFolderToDocument } from '@/lib/functons'
import { useUser } from '@/store/userStore'
import firestore from '@react-native-firebase/firestore';
import { updateFolderWithFile } from '@/lib/functons'
import { useDocuments } from '@/store/useDocuments'

type PrescriptionDataType = {
  name: string,
  dose: string,
  frequency: number,
  remarks: string
}

const Files = () => {
  const { folderID, folderName, fileType, data }: ParamsType = useLocalSearchParams()
  const { documents } = useDocuments()
  const { height } = Dimensions.get("screen")
  const [showModel, setShowModel] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [filesData, setfilesData] = useState([])
  const [file, setFile] = useState<FileType>({
    uri: "",
    name: "",
    type: ""
  })

  const [document, setDocument] = useState<FileType>({
    uri: "",
    name: "",
    type: ""
  })

  const [prescriptionData, setPrescriptionData] = useState<PrescriptionDataType[]>([])

  const { user } = useUser()


  const selectDocument = async () => {
    let res = null;

    try {
      res = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (res.canceled) {
        return;
      }

      setDocument({
        uri: res.assets[0].uri,
        name: res.assets[0].name,
        type: res.assets[0].mimeType ?? ""
      })

    } catch (err) {
      console.log("error -----", err);
    }
  }

  useEffect(() => {
    if (fileType === "image") {
      setfilesData([])
    } else {
      setfilesData(JSON.parse(data))
    }

  }, [data])


  const pickImage = async () => {
    let res = null;

    try {
      res = await DocumentPicker.getDocumentAsync({
        type: ["image/*"],
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (res.canceled) {
        return;
      }

      setFile({
        uri: res.assets[0].uri,
        name: res.assets[0].name,
        type: res.assets[0].mimeType ?? ""
      })

    } catch (err) {
      console.log("error -----", err);
    }
  };

  const clearDocument = () => {
    setDocument({
      uri: "",
      name: "",
      type: ""
    })
  }

  useEffect(() => {
    setShowModel(false)
  }, [file.uri, document.uri])

  const uploadPrescriptionToClaude = async () => {
    console.log(`${BASE_URL}/prescription/get-prescription`)
    const res = await fetch(`https://2994-103-82-186-128.ngrok-free.app/prescription/get-prescription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: "https://firebasestorage.googleapis.com/v0/b/timanage-82f5d.appspot.com/o/prescription.jpeg?alt=media&token=a40e3b9e-46c1-4558-8c91-6006a9228b75",
        type: ""
      })
    })

    const json = await res.json();

    setPrescriptionData(JSON.parse(json[0].text))
  }

  const uploadDocument = async () => {
    // with bytes transferred
    const reference = storage().ref(`documents/${user?.uid}/${replaceSpacesWithUnderscores(folderName)}/${document.name}`);
    const task = reference.putFile(document.uri);

    // progress callback
    task.on('state_changed', snapshot => {
      setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    });

    try {
      await task; // Wait for the upload to complete
      console.log('Document uploaded to the bucket!');

      // Fetch the download URL
      const downloadURL = await reference.getDownloadURL();

      if (downloadURL) {
        folderExists(user?.uid, folderName).then(exists => {
          if (exists) {
            console.log("Folder exists");
            // Logic to add the file to the existing folder
            const newFile = {
              uri: downloadURL,
              name: document.name,
              type: document.type
            };

            updateFolderWithFile(user?.uid, folderName, newFile).then(() => {
              console.log("File added to the folder");
              setUploadProgress(0); // Reset upload progress
            })

          } else {

            console.log("not exists")

            // check for any folder exists for that user
            const folderExistsForUser = firestore().collection("documents").where("uid", "==", user?.uid).get()
              .then(snapshot => {
                if (snapshot.empty) {
                  //   // Logic to create a new folder and add the file
                  const documentInfo = {
                    uid: user?.uid, // User's UID from Firebase Authentication
                    folders: [{
                      name: folderName,
                      files: [{
                        uri: downloadURL, // URL from the uploaded file
                        name: document.name, // Name of the file
                        type: document.type, // Type of the file, e.g., 'image/jpeg'
                      }]
                    }]
                  };

                  firestore().collection("documents").add(documentInfo)
                    .then((docRef) => {
                      console.log("Document added with ID:", docRef.id);
                      setUploadProgress(0); // Reset upload progress
                    })
                    .catch((error) => {
                      console.error("Error adding document:", error);
                    });
                } else {
                  addFolderToDocument(user?.uid, folderName, {
                    uri: downloadURL,
                    name: document.name,
                    type: document.type
                  }).then(() => {
                    console.log("Folder added to the document");
                    setUploadProgress(0); // Reset upload progress
                  })
                }
              })
              .catch(error => {
                console.error("Error fetching documents: ", error);
                return false;
              });


            // if (folderExistsForUser) {

            // } else {

            // }


            // const documentInfo = {
            //   uid: user?.uid, // User's UID from Firebase Authentication
            //   folders: [{
            //     name: folderName,
            //     files: [{
            //       uri: downloadURL, // URL from the uploaded file
            //       name: document.name, // Name of the file
            //       type: document.type, // Type of the file, e.g., 'image/jpeg'
            //     }]
            //   }]
            // };

            // firestore().collection("documents").add(documentInfo)
            //   .then((docRef) => {
            //     console.log("Document added with ID:", docRef.id);
            //     setUploadProgress(0); // Reset upload progress
            //   })
            //   .catch((error) => {
            //     console.error("Error adding document:", error);
            //   });
          }
        });
      }



      // Reset document state or perform other operations
      setDocument({
        uri: "",
        name: "",
        type: ""
      });

      // You might want to use the download URL in your application logic
      // For example, save it to your database or state
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };


  return (
    <View style={{ minHeight: height }} className=' w-full bg-[#16161A] flex-col py-4 relative'>


      <View className=' px-4'>
        <View className=' flex-row h-fit items-center mb-5'>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='chevron-back' size={25} color="#fff" />
          </TouchableOpacity>
          <Text className=' text-white font-semibold text-2xl pt-[2px] ml-3'>{folderName}</Text>
        </View>

        <Divider backgroundColor='#7F8487' height={2} />
      </View>




      {filesData.length > 0 ? (
        <ScrollView>
          <View style={{ gap: 16 }} className=' p-4 pb-[340px]'>
            {filesData && filesData?.map(file => (
              <DocumentCard key={file.uri} title={file.name} type={file.type} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={{ minHeight: height - 250, gap: 6 }} className=' w-full items-center justify-center'>
          <Feather name="folder" color="#707070" size={70} />
          <Text className=' font-semibold text-[#707070] text-2xl'>Oops!</Text>
          <Text className=' font-semibold text-[#707070] text-xl'>No files in this folder</Text>
          <TouchableOpacity onPress={() => setShowModel(true)} className=' mt-4'>
            <View className='rounded-lg bg-[#1A4CD3] p-3'>
              <Entypo name='plus' color="#fff" size={30} />
            </View>
          </TouchableOpacity>
        </View>
      )}


      <Model isVisible={prescriptionData.length > 0} title='Prescription Data' onClose={() => setPrescriptionData([])}>
        <View className='p-4 pb-6'>



          <ScrollView className='h-[300px]' alwaysBounceVertical showsVerticalScrollIndicator={false} fadingEdgeLength={100}>

            <View className=' gap-2 py-3'>
              {prescriptionData.length > 0 ? (
                prescriptionData.map((prescription, index) => (
                  <View key={index} className=' bg-[#2F2F40] p-2 rounded-lg'>
                    <Text className=' text-[#999797]'><Text className=' font-semibold'>Name</Text>: {prescription.name}</Text>
                    <Text className=' text-[#999797]'><Text className=' font-semibold'>Dose</Text>: {prescription.dose} | <Text className=' font-semibold'>Frequency</Text>: {prescription.frequency}</Text>
                    <Text className=' text-[#999797]'><Text className=' font-semibold'>Remarks</Text>: {prescription.remarks}</Text>
                  </View>
                ))
              ) : (
                <Text>No prescription data available</Text>
              )}
            </View>
          </ScrollView>


          <View className=' bg-slate-100 rounded-xl overflow-hidden'>
            <Button color="#1A4CD3" title='Save prescription' />
          </View>
        </View>
      </Model>


      {showModel && <Model isVisible={showModel} onClose={() => setShowModel(false)} title={`Upload ${folderName}`}>
        {fileType === "any" ? (
          <View className='justify-center items-center h-36'>
            <TouchableOpacity onPress={selectDocument} className=' w-20 h-20 rounded-xl bg-[#2F2F40] items-center justify-center'>
              <Ionicons name='cloud-upload' color="#fff" size={30} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text className=' text-white font-medium text-sm text-center mt-5'>Choose input</Text>
            <View style={{ gap: 55 }} className=' flex-row w-full justify-center items-center h-36'>
              <TouchableOpacity className=' w-20 h-20 rounded-xl bg-[#2F2F40] items-center justify-center'>
                <Ionicons name='pencil-outline' color="#fff" size={30} />
              </TouchableOpacity>
              <TouchableOpacity onPress={pickImage} className=' w-20 h-20 rounded-xl bg-[#2F2F40] items-center justify-center'>
                <Ionicons name='image-outline' color="#fff" size={30} />
              </TouchableOpacity>
            </View>
          </View>
        )}

      </Model>}

      {file.uri && <ImagePreview image={file.uri} setFile={setFile} onPressUpload={uploadPrescriptionToClaude} />}

      {document.uri && <Model title='Document' isVisible={document.uri !== null} onClose={clearDocument}>
        <View style={{ gap: 16 }} className=' p-4 pb-6'>
          <DocumentCard title={document.name} type={document.type} />
          <Input label='Document name' placeholder={document.name} />
          {(uploadProgress > 0) ? (
            <View style={{ elevation: 10 }} className=' bg-[#86a6ff] rounded-md h-5 overflow-hidden'>
              <View style={{ width: `${uploadProgress}%` }} className=' h-full w-6 bg-[#1A4CD3]'>
              </View>
            </View>
          ) : (
            <View className=' bg-[#1A4CD3] rounded-xl overflow-hidden'>
              <Button disabled={uploadProgress > 0} onPress={uploadDocument} color="#1A4CD3" title="Upload document" />
            </View>

          )}
        </View>
      </Model>}

      {filesData.length > 0 && (
        <TouchableOpacity onPress={() => setShowModel(true)} style={{ zIndex: 10 }} className='absolute right-6 bottom-[270px]'>
          <View className='rounded-lg bg-[#1A4CD3] p-3'>
            <Entypo name='plus' color="#fff" size={30} />
          </View>
        </TouchableOpacity>
      )}

    </View>
  )
}

export default Files
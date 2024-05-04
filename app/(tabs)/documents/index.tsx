import { View, Text, Dimensions, ScrollView, TouchableNativeFeedbackComponent, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import DocumentFolder from '@/components/document-folder'
import { Entypo } from '@expo/vector-icons'
import Model from '@/components/Model'
import Input from '@/components/input'
import { router } from 'expo-router'
import { useDocuments } from '@/store/useDocuments'
import { useUser } from '@/store/userStore'
import firestore from '@react-native-firebase/firestore';

export type ParamsType = {
  folderID: string,
  folderName: string,
  fileType: "any" | "image",
  data: any
}

const Documents = () => {

  const { height } = Dimensions.get("screen")

  const [createFolderShow, setCreateFolderShow] = useState(false)
  const [folderName, setFolderName] = useState("")

  const { user } = useUser()
  const { setDocuments, documents } = useDocuments()

  useEffect(() => {
    const subscriber = firestore()
      .collection('documents')
      .where('uid', '==', user?.uid)
      .onSnapshot(documentSnapshot => {

        if (documentSnapshot.empty) {
          setDocuments(null)
        } else {
          setDocuments(documentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        }

      });
    return () => subscriber();
  }, [])

  const createFolder = () => {
    if (folderName) {
      firestore().collection("documents").where("uid", "==", user?.uid).get().then((snapshot) => {
        if (snapshot.empty) {
          firestore().collection("documents").add({
            uid: user?.uid,
            folders: [
              {
                name: folderName,
                files: []
              }
            ]
          }).then(() => {
            setCreateFolderShow(false)
            setFolderName("")
          })
        } else {
          const doc = snapshot.docs[0]

          const data = doc.data()
          const folders = data.folders || []
          let isUpdated = false

          const updatedFolders = folders.map(folder => {
            if (folder.name === folderName) {
              isUpdated = true
              return { ...folder, files: [] }
            } else {
              return folder
            }
          })

          if (isUpdated) {
            doc.ref.update({ folders: updatedFolders }).then(() => {
              setCreateFolderShow(false)
              setFolderName("")
            })
          } else {
            doc.ref.update({
              folders: [
                ...folders,
                {
                  name: folderName,
                  files: []
                }
              ]
            }).then(() => {
              setCreateFolderShow(false)
              setFolderName("")
            })
          }
        }
      })

    }
  }

  return (
    <View className=' relative'>
      <ScrollView>

        <View style={{ minHeight: height }} className=' w-full bg-[#16161A] px-4 flex-col py-4'>
          <Text className=' text-white font-semibold text-2xl border-b-[1px] border-[#D6D6D6] pb-5'>Documents</Text>

          <View style={{ gap: 22 }} className=' py-8 pb-20'>

            {documents === null ? <Text className=' text-white text-center'>No folders found</Text> : (
              documents[0].folders.map((folder, index) => {
                console.log("files in index", folder.files)
                return (
                  <DocumentFolder
                    key={index}  // Use folder.id as the key
                    title={folder.name}
                    onPress={() => {
                      router.push({
                        pathname: `/documents/${folder.id}`, // Directly use folder ID in the pathname
                        params: {
                          folderName: folder.name,
                          fileType: "any",
                          data: JSON.stringify(folder.files)
                        }
                      })
                    }}
                  />
                )
              })
            )}


            <DocumentFolder
              title='Prescriptions'
              onPress={() => {
                router.push({
                  pathname: "documents/[folderID]",
                  params: {
                    folderID: "prescriptions",
                    folderName: "Prescriptions",
                    fileType: "image"
                  }
                })
              }}
            />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity onPress={() => setCreateFolderShow(true)}>
        <View className=' absolute bottom-6 right-6 rounded-lg bg-[#1A4CD3] p-3'>
          <Entypo name='plus' color="#fff" size={30} />
        </View>
      </TouchableOpacity>

      <Model title="Create Folder" isVisible={createFolderShow} onClose={() => setCreateFolderShow(false)}>
        <View style={{ gap: 20 }} className=' p-4 py-8'>
          <Input label='Folder Name' placeholder='folder name..' onChangeText={setFolderName} value={folderName} />
          <View className=' bg-slate-100 rounded-xl overflow-hidden'>
            <Button onPress={createFolder} color="#1A4CD3" title='Create folder' />
          </View>
        </View>
      </Model>

    </View>
  )
}

export default Documents
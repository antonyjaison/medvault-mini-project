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

const Files = () => {
  const { folderID, folderName, fileType }: ParamsType = useLocalSearchParams()
  const { height } = Dimensions.get("screen")
  const [showModel, setShowModel] = useState(false)
  const [file, setFile] = useState<FileType>({
    uri: "",
    name: "",
    type: ""
  })

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

  useEffect(() => {
    setShowModel(false)
  }, [file.uri])

  return (
    <View style={{ minHeight: height }} className=' w-full bg-[#16161A] flex-col py-4'>
      <View className='px-4'>
        <View className=' flex-row h-fit items-center mb-5'>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='chevron-back' size={25} color="#fff" />
          </TouchableOpacity>
          <Text className=' text-white font-semibold text-2xl pt-[2px] ml-3'>{folderName}</Text>
        </View>

        <Divider backgroundColor='#7F8487' height={2} />

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

        {showModel && <Model isVisible={showModel} onClose={() => setShowModel(false)} title={`Upload ${folderName}`}>
          {fileType === "any" ? (
            <View>

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

      </View>

      {file.uri && <ImagePreview image={file.uri} setFile={setFile} onPressUpload={() => { }} />}


    </View>
  )
}

export default Files
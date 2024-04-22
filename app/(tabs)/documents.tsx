import { View, Text, Dimensions, ScrollView, TouchableNativeFeedbackComponent, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import DocumentFolder from '@/components/document-folder'
import { Entypo } from '@expo/vector-icons'
import Model from '@/components/Model'
import Input from '@/components/input'

const Documents = () => {

  const { height } = Dimensions.get("screen")

  const [createFolderShow, setCreateFolderShow] = useState(false)



  return (
    <View className=' relative'>
      <ScrollView>

        <View style={{ minHeight: height }} className=' w-full bg-[#16161A] px-4 flex-col py-4'>
          <Text className=' text-white font-semibold text-3xl border-b-[1px] border-[#D6D6D6] pb-5'>Documents</Text>

          <View style={{ gap: 22 }} className=' py-8 pb-20'>
            <DocumentFolder onPress={() => { }} title='Health Insurance' subtitle='demo' />
            <DocumentFolder onPress={() => { }} title='Hospital Report' />
            <DocumentFolder onPress={() => { }} title='Life Insurance' />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity onPress={() => setCreateFolderShow(true)}>
        <View className=' absolute bottom-6 right-6 rounded-lg bg-[#1A4CD3] p-3'>
          <Entypo name='plus' color="#fff" size={30} />
        </View>
      </TouchableOpacity>

      {createFolderShow && (
        <Model title="Create Folder" isVisible={createFolderShow} onClose={() => setCreateFolderShow(false)}>
          <View style={{ gap: 20 }} className=' p-4 py-8'>
            <Input />
            <View className=' bg-slate-100 rounded-xl overflow-hidden'>
              <Button color="#1A4CD3" title='Create folder' />
            </View>
          </View>
        </Model>
      )}

    </View>
  )
}

export default Documents
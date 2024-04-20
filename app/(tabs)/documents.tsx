import { View, Text, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import DocumentFolder from '@/components/document-folder'

const Documents = () => {

  const { height } = Dimensions.get("screen")

  return (
    <ScrollView>

      <View style={{ minHeight: height }} className=' w-full bg-[#16161A] px-4 flex-col py-4'>
        <Text className=' text-white font-semibold text-3xl border-b-[1px] border-[#D6D6D6] pb-5'>Documents</Text>

        <View style={{ gap: 22 }} className=' py-8'>
          <DocumentFolder />
          <DocumentFolder />
          <DocumentFolder />
          <DocumentFolder />
          <DocumentFolder />
          <DocumentFolder />
          <DocumentFolder />
          <DocumentFolder />
          <DocumentFolder />
          <DocumentFolder />
        </View>
      </View>
    </ScrollView>
  )
}

export default Documents
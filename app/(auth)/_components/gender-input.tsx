import { View, Text, TextInput, TouchableOpacityBase, TouchableNativeFeedback, TouchableNativeFeedbackBase } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const GenderInput = () => {
  return (
    <View className=''>
      <View className=' items-center gap-4 px-6'>
        <Text className='text-white font-semibold text-2xl text-center'>What’s your biological sex?</Text>
        <Text className='text-[#707070] text-lg text-center'>We value your trust and will ensure
          that your information is handled respectfully and securely.
        </Text>

        <View style={{ gap: 12 }} className=' flex-row'>
          <TouchableNativeFeedback>
            <View style={{ elevation: 30 }} className=' rounded-lg w-32 h-32 bg-[#242429] items-center justify-center'>
              <Ionicons name='male' size={65} color="#4c4c4c" />
              <Text className=' text-lg text-[#707070]'>Male</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View style={{ elevation: 30 }} className=' rounded-lg w-32 h-32 bg-[#242429] items-center justify-center'>
              <Ionicons name='female' size={65} color="#4c4c4c" />
              <Text className=' text-lg text-[#707070]'>Female</Text>
            </View>
          </TouchableNativeFeedback>
        </View>


      </View>
    </View>
  )
}

export default GenderInput
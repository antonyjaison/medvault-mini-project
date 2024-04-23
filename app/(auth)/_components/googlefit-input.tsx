import { View, Text,TextInput } from 'react-native'
import React from 'react'

const GooglefiInput = () => {
  return (
    <View>
         <View className=' items-center gap-2 px-6'>
            <Text className='text-white font-semibold text-3xl'>Do you want to connect with Google Fit?</Text>
            <Text className='text-[#707070] text-lg w-72'>This will help us to monitor your physical activity and metrics</Text>
            <View className='pt-5 w-full'>
                <TextInput className=' border border-[#707070] w-full h-14 rounded-lg pl-3 text-white' />
            </View>
        </View>
      
    </View>
  )
}

export default GooglefiInput
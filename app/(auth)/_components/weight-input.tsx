import { View, Text,TextInput } from 'react-native'
import React from 'react'

const WeightInput = () => {
  return (
    <View>
         <View className=' items-center gap-2 px-6'>
            <Text className='text-white font-semibold text-3xl'>What's your weight?</Text>
            <Text className='text-[#707070] text-lg w-72'>Your weight will help to monitor your progress(in kg)</Text>
            <View className='pt-5 w-full'>
                <TextInput className=' border border-[#707070] w-full h-14 rounded-lg pl-3 text-white' />
            </View>
        </View>
     
    </View>
  )
}

export default WeightInput
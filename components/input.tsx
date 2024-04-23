import { View, Text, TextInput } from 'react-native'
import React from 'react'

const Input = () => {
    return (
        <View className=' relative'>
            <TextInput placeholderTextColor="#fff" className=' bg-transparent border-0.5 border-[#707070] rounded-xl px-6 py-2 w-full text-white text-sm' placeholder='Document name...' />
            <Text className=' text-[#707070] text-xs absolute top-[-8px] left-4 bg-[#1C1E27] px-2'>Document Name</Text>
        </View>
    )
}

export default Input
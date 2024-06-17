import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@/store/userStore'

const NameInput = () => {
    const { name, setName } = useUser()
    console.log(name)
    return (
        <View className=' items-center gap-2 px-6'>
            <Text className='text-white font-semibold text-3xl'>Hey there!</Text>
            <Text className='text-[#707070] text-lg w-72'>Taking the first step of login is the gateway to a health world.</Text>
            <Text className='text-white font-medium text-2xl'>What is your name?</Text>
            <View className='pt-5 w-full'>
                <TextInput onChangeText={setName} className=' border border-[#707070] w-full h-14 rounded-lg pl-3 text-white' />
            </View>
        </View>
    )
}

export default NameInput
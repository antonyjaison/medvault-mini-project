import { View, Text, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'

const Footer = () => {
    return (
        <View>
            <Text className=' text-white text-2xl font-bold'>Help & Support </Text>
            <Text className=' text-white text-xs mt-1'>24/7 support available to address your queries</Text>

            <View className=' flex-row justify-around py-10'>
                <View className=' w-16 h-16 rounded-full bg-[#1a4bd373] justify-center items-center'>
                    <TouchableNativeFeedback useForeground
                        background={TouchableNativeFeedback.Ripple('#ffffff', true)}>
                        <AntDesign name='questioncircle' size={45} color="#1A4CD3" />
                    </TouchableNativeFeedback>
                </View>

                <View className=' w-16 h-16 rounded-full bg-[#1a4bd373] justify-center items-center'>
                    <TouchableNativeFeedback useForeground
                        background={TouchableNativeFeedback.Ripple('#ffffff', true)}>
                        <FontAwesome name='whatsapp' size={45} color="#1A4CD3" />
                    </TouchableNativeFeedback>
                </View>

                <View className=' w-16 h-16 rounded-full bg-[#1a4bd373] justify-center items-center'>
                    <TouchableNativeFeedback useForeground
                        background={TouchableNativeFeedback.Ripple('#ffffff', true)}>
                        <AntDesign name='mail' size={45} color="#1A4CD3" />
                    </TouchableNativeFeedback>
                </View>
            </View>

            <View className='pt-1'>
                <Text className=' text-5xl font-extrabold text-[#7070706f]'>Precaution is</Text>
                <Text className=' text-5xl font-extrabold text-[#7070706f]'>better than</Text>
                <Text className=' text-5xl font-extrabold text-[#7070706f]'>cure</Text>
            </View>
        </View>
    )
}

export default Footer
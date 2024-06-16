import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, EvilIcons, FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'

type ProfileSettingCardProps = {
    icon:React.ReactElement,
    title:string,
    color?:string,
    href:string
}

const ProfileSettingCard = ({ icon, title, color, href }: ProfileSettingCardProps) => {
    return (
        <TouchableOpacity onPress={() => router.push(href)}>
            <View className=' flex-row h-fit items-center justify-between bg-[#16161A] py-2'>
                <View className='flex-row h-fit items-center'>
                    {icon}
                    <Text className=' text-white text-base ml-3'>{title}</Text>
                </View>
                <Ionicons name='chevron-forward-outline' color="white" size={20} />
            </View>
        </TouchableOpacity>
    )
}

export default ProfileSettingCard
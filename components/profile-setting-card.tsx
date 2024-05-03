import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons, EvilIcons, FontAwesome } from '@expo/vector-icons'

type ProfileSettingCardProps = {
    icon:React.ReactElement,
    title:string,
    color?:string
}

const ProfileSettingCard = ({ icon,title,color }: ProfileSettingCardProps) => {
    return (
        <View className=' flex-row h-fit items-center justify-between bg-[#16161A] py-2'>
            <View className='flex-row h-fit items-center'>
                {icon}
                <Text className=' text-white text-base ml-3'>{title}</Text>
            </View>
            <FontAwesome name='chevron-right' color="white" size={20} />
        </View>
    )
}

export default ProfileSettingCard
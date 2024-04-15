import { View, Text } from 'react-native'
import React from 'react'
import { EvilIcons, FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'

const MedicationIntakeStatus = () => {
    return (
        <View className=' border border-[#373745] rounded-2xl p-4'>
            <View>
                <Text className="text-lg font-medium text-white">Your Medication intake</Text>
                <Text className=" text-[#8E8E8E] text-xs">Today</Text>
            </View>

            <View className=' flex-row justify-around py-5'>
                <View className=' w-fit items-center'>
                    <AntDesign name='checkcircleo' size={25} color="#03D858" />
                    <Text className='text-xs text-white mt-1'>Morning</Text>
                </View>
                <View className=' w-fit items-center'>
                    <AntDesign name='checkcircleo' size={25} color="#03D858" />
                    <Text className='text-xs text-white mt-1'>Noon</Text>
                </View>
                <View className=' w-fit items-center'>
                    <AntDesign name='checkcircleo' size={25} color="#03D858"/>
                    <Text className='text-xs text-white mt-1'>Night</Text>
                </View>
            </View>


        </View>
    )
}

export default MedicationIntakeStatus
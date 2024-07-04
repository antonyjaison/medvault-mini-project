import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const MedicationIntakeStatus = () => {

    const now = new Date();
    const hour = now.getHours();

    console.log(hour)

    return (
        <View className=' border border-[#373745] rounded-2xl p-4'>
            <View>
                <Text className="text-lg font-medium text-white">Your Medication intake</Text>
                <Text className=" text-[#8E8E8E] text-xs">Today</Text>
            </View>

            <View className=' flex-row justify-around py-5'>
                <View className=' w-fit items-center'>
                    {(hour >= 8) ? (
                        <AntDesign name='checkcircleo' size={25} color="#03D858" />
                    ) : (
                        <AntDesign name='exclamationcircleo' size={25} color="red" />
                    )}
                    <Text className='text-xs text-white mt-1'>Morning</Text>
                </View>
                <View className=' w-fit items-center'>
                    {(hour >= 13) ? (
                        <AntDesign name='checkcircleo' size={25} color="#03D858" />
                    ) : (
                        <AntDesign name='exclamationcircleo' size={25} color="red" />
                    )}
                    <Text className='text-xs text-white mt-1'>Noon</Text>
                </View>
                <View className=' w-fit items-center'>
                    {(hour >= 20) ? (
                        <AntDesign name='checkcircleo' size={25} color="#03D858" />
                    ) : (
                        <AntDesign name='exclamationcircleo' size={25} color="red" />
                    )}
                    <Text className='text-xs text-white mt-1'>Night</Text>
                </View>
            </View>


        </View>
    )
}

export default MedicationIntakeStatus
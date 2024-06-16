import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import Model from '@/components/Model'
import Input from '@/components/input'

const EmergencyContacts = () => {
    const [showModel, setShowModel] = useState(false)

    const addContactToDB = () => {}

    return (
        <View>
            <View className=' w-full h-[1px] bg-[#776F6F]' />
            <View className=' px-6 bg-[#16161A] h-full'>

                <View className=' justify-center items-center my-4'>
                    <Text className=' text-gray-400 text-lg'>No Contacts Added</Text>

                    <TouchableOpacity onPress={() => setShowModel(true)}>
                        <View className='rounded-md justify-center items-center bg-[#1A4CD3] p-2 mt-4'>
                            <Entypo name='plus' color="#fff" size={30} />
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

            <Model isVisible={showModel} title='Add contact' onClose={() => setShowModel(false)}>
                <View style={{ gap: 20 }} className=' p-4'>
                    <Input label='Name' placeholder='Antony' />
                    <Input keyboardType='number-pad' label='Phone' placeholder='+91 9876543210' />
                    <Input label='Email' placeholder='antonyy@gmail.com' />
                    <TouchableOpacity onPress={addContactToDB}>
                        <View className='rounded-lg justify-center items-center bg-[#1A4CD3] p-2'>
                            <Text className=' text-white'>Add</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Model>
        </View>
    )
}

export default EmergencyContacts
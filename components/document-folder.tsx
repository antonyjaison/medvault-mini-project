import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

const DocumentFolder = () => {

    const [isMenuVisible, setIsMenuVisible] = useState(false)

    return (
        <View className=' relative'>
            <View className=' flex-row h-fit items-center justify-between bg-[#1C1E27] p-5 py-4 rounded-2xl'>
                <View className=' flex-row h-fit items-center gap-3'>
                    <Ionicons name='folder-outline' color="#fff" size={30} />
                    <View>
                        <Text className=' font-medium text-white text-xl'>Health Insurance</Text>
                        <Text className=' text-white text-xs'>PNB MetLife</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => setIsMenuVisible(prev => !prev)}>
                    {isMenuVisible ? <Ionicons name='close-outline' size={20} color="#fff" /> : <Ionicons name='ellipsis-vertical-outline' size={20} color="#fff" />}
                </TouchableOpacity>
            </View>


            {isMenuVisible && (
                <View
                    style={{ elevation: 20 }}
                    className='bg-[#2A2D3A] w-20 justify-evenly rounded-lg absolute py-1 top-[15px] right-12 z-10'>
                    <TouchableOpacity className="items-center py-1 border-b-0.5 border-[#707070]">
                        <FontAwesome name='thumb-tack' color="#fff" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity className="items-center py-1 border-b-0.5 border-[#707070]">
                        <Ionicons name='pencil-outline' color="#fff" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity className="items-center py-1 border-b-0.5 border-[#707070]">
                        <Ionicons name='share-social' color="#fff" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity className="items-center py-1">
                        <FontAwesome name='trash-o' color="red" size={18} />
                    </TouchableOpacity>
                </View>
            )}

        </View>
    )
}

export default DocumentFolder
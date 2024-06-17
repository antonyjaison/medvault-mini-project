import { View, Text, Touchable, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Entypo } from '@expo/vector-icons'
import Model from '@/components/Model'
import Input from '@/components/input'
import firestore from '@react-native-firebase/firestore';
import { useUser } from '@/store/userStore'
import { EmergencyContactType } from '@/lib/types/emergency-contact-types'
import { useEmergencyContacts } from '@/store/useEmergencyContacts'



const EmergencyContacts = () => {
    const { user } = useUser()
    const { addEmergencyContact, emergencyContacts, setEmergencyContacts } = useEmergencyContacts()
    const [showModel, setShowModel] = useState(false)

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    const addContactToDB = () => {
        if (!name || !phone || !email) {
            alert('Please fill out all fields');
            return;
        } else {
            const isDuplicate = emergencyContacts?.some(contact =>
                contact.email === email || contact.phone === phone
            );
            if (isDuplicate) {
                alert('This contact already exists');
                return;
            }
        }

        const newContact: EmergencyContactType = {
            name,
            phone,
            email,
        }

        firestore().collection("emergency-contacts").add({
            ...newContact,
            uid: user?.uid
        }).then(() => {
            addEmergencyContact(newContact)
            setShowModel(false)
            Alert.alert('Success', 'Contact added successfully');
            console.log('Contact added successfully');
        })

    }

    return (
        <View>
            <View className=' w-full h-[1px] bg-[#776F6F]' />
            <View className=' px-6 bg-[#16161A] h-full'>

                <View className=' justify-center items-center my-4'>
                    {emergencyContacts ? emergencyContacts?.map(contact => (
                        <View key={contact.email} className='flex-row justify-between items-center w-full bg-[#1A4CD3] p-2 rounded-md my-2'>
                            <View>
                                <Text className=' text-white'>{contact.name}</Text>
                                <Text className=' text-white'>{contact.phone}</Text>
                                <Text className=' text-white'>{contact.email}</Text>
                            </View>
                            <Entypo name='trash' color="#fff" size={30} />
                        </View>
                    )) : <Text className=' text-gray-400 text-lg'>No Contacts Added</Text>}


                    <TouchableOpacity onPress={() => setShowModel(true)}>
                        <View className='rounded-md justify-center items-center bg-[#1A4CD3] p-2 mt-4'>
                            <Entypo name='plus' color="#fff" size={30} />
                        </View>
                    </TouchableOpacity>
                </View>

            </View>

            <Model isVisible={showModel} title='Add contact' onClose={() => setShowModel(false)}>
                <View style={{ gap: 20 }} className=' p-4'>
                    <Input onChangeText={setName} label='Name' placeholder='' />
                    <Input onChangeText={setPhone} keyboardType='number-pad' label='Phone' placeholder='+91' />
                    <Input onChangeText={setEmail} label='Email' placeholder='' />
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
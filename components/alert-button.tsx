import { View, Text, TouchableNativeFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'; import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location';
import { useUser } from '@/store/userStore';
import { useEmergencyContacts } from '@/store/useEmergencyContacts';
import firestore from '@react-native-firebase/firestore';
import { EmergencyContactType } from '@/lib/types/emergency-contact-types';

const AlertButton = () => {

    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const { user, name } = useUser()
    const { setEmergencyContacts, emergencyContacts } = useEmergencyContacts()

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    useEffect(() => {
        firestore()
            .collection('emergency-contacts')
            .where('uid', '==', user?.uid)
            .get()
            .then(querySnapshot => {
                const data: EmergencyContactType[] = []
                querySnapshot.forEach(documentSnapshot => {
                    data.push(documentSnapshot.data() as EmergencyContactType)
                });
                setEmergencyContacts(data)
            }).catch((error) => {
                console.log("Error getting documents: ", error);
                setEmergencyContacts([])
            })
    }, [])

    const handlePressAlertButton = async () => {
        const apiUrl = `${process.env.BASE_URL}/api/emergency2/send-emergency`

        console.log('emergency api',apiUrl)

        const req = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userDetails:{
                    location,
                    name: name,
                },
                emergencyContacts
            })
        })
        const res = await req.json()
        console.log(res)

    }

    return (
        <View className='items-end fixed bottom-20 right-5'>
            <TouchableNativeFeedback onPress={handlePressAlertButton}>
                <View className='bg-red-700 rounded-lg p-3'>
                    <Ionicons name="alert-circle-outline" size={30} color="#fff" />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default AlertButton


// location
// pohone no
// email id
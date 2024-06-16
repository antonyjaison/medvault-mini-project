import { View, Text, TouchableNativeFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'; import { Ionicons } from '@expo/vector-icons'
import * as Location from 'expo-location';
import { useUser } from '@/store/userStore';

const AlertButton = () => {

    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState("");
    const { user } = useUser()

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

    console.log(location)

    const emergencyContacts = [
        {
            name: 'Jaison T A',
            phone: '+917736676823',
            email: 'antonyjaison639@gmail.com',
        }
    ]

    const handlePressAlertButton = async () => {
        const apiUrl = `${process.env.BASE_URL}/api/emergency/send-emergency`
        const req = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userDetails:{
                    location,
                    name: user?.displayName,
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
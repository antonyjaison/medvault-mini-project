import { View, Text, TextInput, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import GoogleFitLogo from '@/assets/svg/google-fit'
import { useUser } from '@/store/userStore'
import firestore from '@react-native-firebase/firestore';
import { router } from 'expo-router'


const GooglefiInput = () => {
  const { name, place, age, height, weight, gender, activity, user } = useUser()

  const submitToDb = () => {

    firestore()
      .collection('Users')
      .add({
        name,
        place,
        age,
        height,
        weight,
        gender,
        activity,
        uid: user?.uid
      })
      .then(() => {
        console.log('User added!');
        router.replace("/")
      });

  }
  return (
    <View style={{ alignItems: 'center', paddingHorizontal: 6, paddingTop: 20 }}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>Do you want to connect with Google Fit?</Text>
      <Text style={{ color: '#707070', fontSize: 16, textAlign: 'center', marginTop: 10 }}>This will help us to monitor your physical activity and metrics.</Text>


      <View className=' w-full px-4 pt-28 items-center'>

        <GoogleFitLogo />

        <TouchableNativeFeedback>
          <View className='mt-12 w-full bg-[#1A4CD3] rounded-lg py-3'>
            <Text className=' text-white text-lg text-center'>Connect with Fit</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableOpacity onPress={submitToDb}>
          <Text className='text-white text-lg mt-6'>Skip</Text>
        </TouchableOpacity>

      </View>


    </View>
  )
}

export default GooglefiInput
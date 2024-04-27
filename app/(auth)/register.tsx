import { View, Text, Dimensions, TouchableNativeFeedback, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Input from '@/components/input'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider } from '@/components/divider'
import Google from '@/assets/svg/google'
import Facebook from '@/assets/svg/facebook'
import Apple from '@/assets/svg/apple'
import { Link, router } from 'expo-router'
import { Picker } from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth'
import { Ionicons } from '@expo/vector-icons'
import Model from '@/components/Model'

type UserType = {
  name: string,
  age: string,
  gender: "Female" | "Male" | "Other" | "",
  email: string,
  password: string,
  re_entered_password: string
}

const Register = () => {
  const { height } = Dimensions.get("screen")
  const [genderModel, setGenderModel] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const [userDetails, setUserDetails] = useState<UserType>({
    name: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    re_entered_password: ''
  })

  const handleInputChange = (field: keyof UserType, value: string) => {
    setUserDetails(prevState => ({
      ...prevState,
      [field]: value
    }))
  }

  const handleRegister = async () => {
    setLoading(true)
    let registrationError = "";
    if (userDetails.password !== userDetails.re_entered_password) {
      registrationError = "Passwords do not match";
    } else {
      try {
        await auth().createUserWithEmailAndPassword(userDetails.email, userDetails.password);
        router.push("/")
        return;
      } catch (error: any) {
        if (error?.code === 'auth/email-already-in-use') {
          registrationError = 'That email address is already in use!';
        } else if (error?.code === 'auth/invalid-email') {
          registrationError = 'That email address is invalid!';
        } else {
          registrationError = 'An error occurred while registering';
        }
      }
    }
    setLoading(false)
    setError(registrationError);
  }


  return (
    <SafeAreaView>
      <View style={{ minHeight: height }} className=' w-full bg-[#16161A] px-4 flex-col py-4'>
        <Text className=' text-white font-semibold text-2xl border-b-[1px] border-[#D6D6D6] pb-3 pt-5'>Create Account</Text>

        <View style={{ gap: 25 }} className=' my-6 py-3'>
          <Input label='Name' placeholder='Enter name' labelBackgroundColor='#16161A' onChangeText={(text) => handleInputChange('name', text)} />
          <View style={{ gap: 25 }} className=' flex-row'>
            <View className=' flex-1'>
              <Input keyboardType='numeric' label='Age' placeholder='Enter age' labelBackgroundColor='#16161A' onChangeText={(text) => handleInputChange('age', text)} />
            </View>
            <View className=' flex-1'>


              <View className=' relative'>
                <TextInput editable={false} value={userDetails.gender} placeholder='Select Gender' placeholderTextColor="#bfbfbf" className=' bg-transparent border-0.5 border-[#707070] rounded-xl px-6 py-2 w-full text-[#bfbfbf] text-sm' />
                <Text style={{ backgroundColor: "#16161A" }} className=' text-[#707070] text-xs absolute top-[-8px] left-4 bg-[#1C1E27] px-2'>Gender</Text>
                <TouchableOpacity onPress={() => setGenderModel(!genderModel)} className=' absolute right-4 top-3'>

                  <Ionicons name='chevron-down' size={20} color="#fff" />

                </TouchableOpacity>
              </View>


            </View>
          </View>
          <Input label='Email' placeholder='Enter email' labelBackgroundColor='#16161A' onChangeText={(text) => handleInputChange('email', text)} />
          <Input label='Password' placeholder="Enter password" labelBackgroundColor='#16161A' onChangeText={(text) => handleInputChange('password', text)} />
          <Input label='Password' placeholder='Re-enter password' labelBackgroundColor='#16161A' onChangeText={(text) => handleInputChange('re_entered_password', text)} />


          <View>
            <TouchableNativeFeedback disabled={loading} onPress={handleRegister} >
              <View style={{ backgroundColor: '#1A4CD3' }} className=' rounded-lg p-3'>
                <Text className=' text-white text-center text-lg'>Create account</Text>
              </View>
            </TouchableNativeFeedback>
            {error ? <Text className=' text-center text-red-600 pt-3'>{error}</Text> : <Text></Text>}
          </View>

          <View className=' h-fit flex-row items-center'>
            <View className=' flex-1'>
              <Divider height={1} backgroundColor='#707070' />
            </View>
            <Text className=' flex-1 text-center text-[#707070] text-sm'>or sign in with</Text>
            <View className=' flex-1'>
              <Divider height={1} backgroundColor='#707070' />
            </View>
          </View>
          <View style={{ gap: 50 }} className=' flex-row justify-center'>
            <View className=' w-11 h-11 bg-white rounded-full items-center justify-center'>
              <TouchableNativeFeedback useForeground>
                <View className=' w-11 h-11 bg-white rounded-full items-center justify-center'>
                  <Google />
                </View>
              </TouchableNativeFeedback>
            </View>
            <View className=' w-11 h-11 bg-white rounded-full items-center justify-center'>
              <TouchableNativeFeedback useForeground>
                <View className=' w-11 h-11 bg-white rounded-full items-center justify-center'>
                  <Facebook />
                </View>
              </TouchableNativeFeedback>
            </View>
            <View className=' w-11 h-11 bg-white rounded-full items-center justify-center'>
              <TouchableNativeFeedback useForeground>
                <View className=' w-11 h-11 bg-white rounded-full items-center justify-center'>
                  <Apple />
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>

          <Text className=' text-center text-[#707070]'>By loggin in, you agree to out <Link href="/(auth)/login" className='text-[#1A4CD3]'>Privacy Policy</Link> & <Link href="/(auth)/login" className='text-[#1A4CD3]'>Terms and Conditions</Link></Text>
          <Text className=' text-center text-white'>Already have an account?<Link href="/(auth)/login" className='text-[#1A4CD3]'> Sign in</Link></Text>
        </View>



      </View>

      <Model isVisible={genderModel} onClose={() => setGenderModel(false)} title='Select gender'>
        <View>

          <TouchableOpacity onPress={() => {
            handleInputChange("gender", "Male")
            setGenderModel(false)
          }} className='p-4'>
            <Text className=' text-white text-lg'>Male</Text>
          </TouchableOpacity>
          <Divider backgroundColor='#707070' height={1} />
          <TouchableOpacity onPress={() => {
            handleInputChange("gender", "Female")
            setGenderModel(false)
          }} className='p-4'>
            <Text className=' text-white text-lg'>Female</Text>
          </TouchableOpacity>
          <Divider backgroundColor='#707070' height={1} />
          <TouchableOpacity onPress={() => {
            handleInputChange("gender", "Other")
            setGenderModel(false)
          }} className='p-4'>
            <Text className=' text-white text-lg'>Other</Text>
          </TouchableOpacity>

        </View>
      </Model>

    </SafeAreaView>
  )
}

export default Register

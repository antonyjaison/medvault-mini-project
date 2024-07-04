import { View, Text, Dimensions, TouchableNativeFeedback, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Input from '@/components/input'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider } from '@/components/divider'
import Google from '@/assets/svg/google'
import Facebook from '@/assets/svg/facebook'
import Apple from '@/assets/svg/apple'
import { Link, router } from 'expo-router'
import auth from '@react-native-firebase/auth';
import { useUser } from '@/store/userStore'


type UserCredentialType = {
  email: string,
  password: string
}

const Login = () => {
  const { height } = Dimensions.get("screen")
  const { setUser } = useUser()

  const [error, setError] = useState("")

  const [userDetails, setUserDetails] = useState<UserCredentialType>({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (field: keyof UserCredentialType, value: string) => {
    setUserDetails(prevState => ({
      ...prevState,
      [field]: value
    }))
  }

  const handleLogin = async () => {
    setLoading(true)
    // check for email and password are entered
    if (!userDetails.email || !userDetails.password) {
      setError('Please enter email and password');
            setLoading(false)
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(userDetails.email, userDetails.password).then(({ user }) => {
        // console.log(user)
        if (user !== null) {
          setUser(user)
          router.push("/")
        }
      });
      // router.push("/")
      return;
    } catch (error: any) {
      if (error?.code === 'auth/user-not-found') {
        setError('No user found with this email address');
      } else if (error?.code === 'auth/wrong-password') {
        setError('Wrong password');
      } else if (error?.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else {
        setError('An error occurred while logging in');
      }
      setLoading(false)
    }
    setLoading(false)
  }


  return (
    <SafeAreaView>
      <View style={{ minHeight: height }} className=' w-full bg-[#16161A] px-4 flex-col py-4'>
        <Text className=' text-white font-semibold text-2xl border-b-[1px] border-[#D6D6D6] pb-3 pt-5'>Welcome back</Text>

        <View style={{ gap: 40 }} className=' my-6 py-3'>
          <Input label='Email' placeholder='Enter email' labelBackgroundColor='#16161A' onChangeText={(text) => handleInputChange('email', text)} />
          <Input label='Password' placeholder="Enter password" labelBackgroundColor='#16161A' onChangeText={(text) => handleInputChange('password', text)} />
          <View>
            <TouchableNativeFeedback disabled={loading} onPress={handleLogin} >
              <View style={{ backgroundColor: '#1A4CD3' }} className=' rounded-lg p-3'>
                {loading ? <ActivityIndicator color='#fff' /> : <Text className=' text-white text-center text-lg'>Login</Text>}
              </View>
            </TouchableNativeFeedback>
            {error ? <Text className=' text-center text-red-600 pt-3'>{error}</Text> : <Text></Text>}
          </View>

          <View className=' h-fit flex-row items-center'>
            <View className=' flex-1'>
              <Divider height={1} backgroundColor='#707070' />
            </View>
            <Text className=' flex-1 text-center text-[#707070] text-sm'>or log in with</Text>
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

          <Text className=' text-center text-[#707070]'>By loggin in, you agree to out <Link href="/(auth)/details" className='text-[#1A4CD3]'>Privacy Policy</Link> & <Link href="/(auth)/login" className='text-[#1A4CD3]'>Terms and Conditions</Link></Text>
          <Text className=' text-center text-white'>Don’t have an account? <Link href="/(auth)/register" className='text-[#1A4CD3]'> Create an account</Link></Text>
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Login
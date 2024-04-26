import { View, Text, Dimensions, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import Input from '@/components/input'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider } from '@/components/divider'
import Google from '@/assets/svg/google'
import Facebook from '@/assets/svg/facebook'
import Apple from '@/assets/svg/apple'
import { Link } from 'expo-router'

const Register = () => {
  const { height } = Dimensions.get("screen")

  return (
    <SafeAreaView>
      <View style={{ minHeight: height }} className=' w-full bg-[#16161A] px-4 flex-col py-4'>
        <Text className=' text-white font-semibold text-2xl border-b-[1px] border-[#D6D6D6] pb-3 pt-5'>Create Account</Text>

        <View style={{ gap: 40 }} className=' my-6 py-3'>
          <Input label='Name' placeholder='Enter name' labelBackgroundColor='#16161A' />
          <View style={{ gap: 20 }} className=' flex-row'>
            <View className=' flex-1'>
            <Input label='Age' placeholder='Enter age' labelBackgroundColor='#16161A' />
            </View>
            <View className=' flex-1'>
            <Input label='Gender' placeholder='Gender' labelBackgroundColor='#16161A' />
            </View>
          </View>
          <Input label='Email' placeholder='Enter email' labelBackgroundColor='#16161A' />
          <Input label='Password' placeholder='********' labelBackgroundColor='#16161A' />
          <TouchableNativeFeedback>
            <View style={{ backgroundColor: '#1A4CD3' }} className=' rounded-lg p-3'>
              <Text className=' text-white text-center text-lg'>Create account</Text>
            </View>
          </TouchableNativeFeedback>


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
    </SafeAreaView>
  )
}

export default Register
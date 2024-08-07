import { View, Text, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import ProfileSettingCard from '@/components/profile-setting-card'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useUser } from '@/store/userStore'
import { router } from 'expo-router'

const ProfileScreen = () => {

  const { user, setUser, name } = useUser()

  return (
    <View className='px-6 bg-[#16161A] gap-4 h-full'>

      <View className=' w-full items-center mb-5'>
        {user?.photoURL ? (
          <Image source={require('../../assets/images/avatar.png')} style={{ width: 100, height: 100, borderRadius: 50 }} />
        ) : (
          <FontAwesome name='user-circle' size={100} color='white' />
        )}
        <View className='items-center mt-2'>
          <Text className='text-2xl font-medium text-white'>{name}</Text>
          <Text className='text-sm text-[#AFAFAF]'>
            {user?.email}
          </Text>
        </View>
      </View>

      <View className=' my-5'>
        <View className=' w-full h-[1px] bg-[#776F6F]' />
      </View>

      <View>
        <Text className=' text-sm text-[#AFAFAF] mb-3'>Account</Text>
        <View style={{ gap: 10 }} className=''>
          <ProfileSettingCard href='/' title='Edit profile' icon={<Ionicons name="person-outline" color="white" size={20} />} />
          {/* <ProfileSettingCard title='Food Schedules' icon={<Ionicons name='chevron-forward-outline' color="white" size={20} />}/> */}
          <ProfileSettingCard href='/profile/emergency-contacts' title='Emergency Contact' icon={<Ionicons name='add-circle-outline' color="white" size={20} />} />
        </View>
      </View>
      {/* <View>
        <Text className=' text-sm text-[#AFAFAF] mb-3'>Settings</Text>
        <View style={{ gap: 8 }} className=''>
        <ProfileSettingCard title='Theme' icon={<Ionicons name='chevron-right' color="white" size={20} />}/>
        </View>
      </View> */}
      <View>
        <Text className=' text-sm text-[#AFAFAF] mb-3'>More</Text>
        <View style={{ gap: 10 }} className=''>
          <ProfileSettingCard href='/' title='About Us' icon={<Ionicons name='apps-outline' color="white" size={20} />} />
          <ProfileSettingCard href='/' title='FAQ' icon={<Ionicons name='alert-circle-outline' color="white" size={20} />} />
          <ProfileSettingCard href='/' title='Help & Feedback' icon={<Ionicons name='headset-outline' color="white" size={20} />} />
          <ProfileSettingCard href='/' title='Support Us' icon={<Ionicons name='person-circle-outline' color="white" size={20} />} />
          <TouchableHighlight onPress={() => {
            setUser(null)
            router.replace('/login')
          }}>
            <View className='flex-row h-fit items-center'>
              <Ionicons name='log-out-outline' color="red" size={20} />
              <Text className='text-red-500 text-base ml-3'>Logout</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>


    </View>
  )
}

export default ProfileScreen
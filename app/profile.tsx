import { View, Text } from 'react-native'
import React from 'react'
import ProfileSettingCard from '@/components/profile-setting-card'
import { FontAwesome } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
const ProfileScreen = () => {
  return (
    <View className='px-6 bg-[#16161A] gap-4' >
      <View>
        <Text className=' text-sm text-[#AFAFAF] mb-3'>Account</Text>
        <View style={{ gap: 8 }} className=''>
          <ProfileSettingCard title='Edit profile' icon={<FontAwesome name="chevron-right" color="white" size={20} />}/>
          <ProfileSettingCard title='Food Schedules' icon={<FontAwesome name='chevron-right' color="white" size={20} />}/>
          <ProfileSettingCard title='Emergency Contact' icon={<FontAwesome name='chevron-right' color="white" size={20} />}/>
        </View>
      </View>
      <View>
        <Text className=' text-sm text-[#AFAFAF] mb-3'>Settings</Text>
        <View style={{ gap: 8 }} className=''>
        <ProfileSettingCard title='Theme' icon={<FontAwesome name='chevron-right' color="white" size={20} />}/>
        </View>
      </View>
      <View>
        <Text className=' text-sm text-[#AFAFAF] mb-3'>More</Text>
        <View style={{ gap: 8 }} className=''>
        <ProfileSettingCard title='About Us' icon={<FontAwesome name='chevron-right' color="white" size={20} />}/>
        <ProfileSettingCard title='FAQ' icon={<FontAwesome name='chevron-right' color="white" size={20} />}/>
        <ProfileSettingCard title='Help & Feedback' icon={<FontAwesome name='chevron-right' color="white" size={20} />}/>
        <ProfileSettingCard title='Support Us' icon={<FontAwesome name='chevron-right' color="white" size={20} />}/>
        </View>
      </View>
    </View>
  )
}

export default ProfileScreen
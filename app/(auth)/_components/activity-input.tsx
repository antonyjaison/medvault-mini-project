import { Text, View, TextInput, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import { useUser } from '@/store/userStore'

export const ActivityInput = () => {
  const { activity, setActivity} = useUser()

  // console.log(activity)

  const activities = ["Little or No Activity", "Lightly Active", "Moderately Active", "Very Active"]

  return (
    <View style={{ alignItems: 'center', paddingHorizontal: 6, paddingTop: 20 }}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>How active are you?</Text>
      <Text style={{ color: '#707070', fontSize: 16, textAlign: 'center', marginTop: 10 }}>Based on your lifestyle, we can assess your daily calorie requirements.</Text>


      <View style={{ gap: 14 }} className=' w-full px-4 pt-8'>
        {activities.map((activity, index) => (
          <TouchableNativeFeedback onPress={() => setActivity(activity)} key={index}>
            <View style={{ elevation: 10 }} className=' w-full bg-[#1C1E27] py-6 rounded-lg'>
              <Text className=' text-[#707070] text-lg text-center '>{activity}</Text>
            </View>
          </TouchableNativeFeedback>
        ))}
      </View>


    </View>
  )
}

export default ActivityInput

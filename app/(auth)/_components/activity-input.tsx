import { Text, View,TextInput } from 'react-native'
import React, { Component } from 'react'

export class ActivityInput
 extends Component {
  render() {
    return (
      <View>
        <View className=' gap-2 px-6'>
      <Text className='text-white font-semibold text-3xl text align-middle'>How active are You?</Text>
      <Text className='text-[#707070] text-lg w-72 '>We'll keep your data safe</Text>
      <View className='pt-5 w-full'>
        <TextInput className=' border border-[#707070] w-full h-14 rounded-lg pl-3 text-white'placeholder='Search for your city' />
      </View>
    </View>
      </View>
    )
  }
}

export default ActivityInput

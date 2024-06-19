import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Value from './_components/value'
import RingProgress from './_components/RingProgress'


const Activity = () => {

  return (
    <View className=' w-full items-center h-full justify-center'>
      <RingProgress progress={0.2} />
      <View className=' mt-10'>
        <View style={{ gap: 40 }} className=' flex-row mb-5'>
          <Value label="Steps" value="1219" />
          <Value label="Distance" value="0,75 km" />
        </View>
        <Value label="Flights Climbed" value="12" />
      </View>
    </View>
  )
}

export default Activity
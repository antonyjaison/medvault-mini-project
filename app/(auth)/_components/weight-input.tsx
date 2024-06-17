import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScrollableInput from '@/components/scrollable-input'
import { useUser } from '@/store/userStore'

const WeightInput = () => {
  const [selectedWeight, setSelectedWeight] = useState(0)
  const { setWeight, weight } = useUser();
  useEffect(() => {
    setWeight(selectedWeight.toString());
  },[])

  console.log(weight);

  const generateWeights = (start: number, end: number, step: number) => {
    const weights = [];
    for (let weight = start; weight <= end; weight += step) {
      weights.push(weight);
    }
    return weights;
  };

  const weightsInKg = generateWeights(30, 150, 1);

  console.log(selectedWeight)

  return (
    <View style={{ alignItems: 'center', paddingHorizontal: 6, paddingTop: 20 }}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>What’s your weight?</Text>
      <Text style={{ color: '#707070', fontSize: 16, textAlign: 'center', marginTop: 10 }}>Your weight will help us to monitor your progress(in kg).</Text>

      <View className=' mt-10'>
        <ScrollableInput data={weightsInKg} selectedIndex={selectedWeight} setSelectedIndex={setSelectedWeight} />
      </View>
    </View>
  )
}

export default WeightInput
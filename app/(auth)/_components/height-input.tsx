import { Text, View, TextInput, TouchableNativeFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScrollableInput from '@/components/scrollable-input'
import { cn } from '@/lib/utils'
import { useUser } from '@/store/userStore'

const HeightInput = () => {
  const [selectedHeight, setSelectedHeight] = useState("")
  const [selectedOption, setSelectedOption] = useState<"ft" | "cm">('ft');
  const heightInInch = [];
  const { setHeight, height } = useUser();

  useEffect(() => {
    setHeight(selectedHeight);
  },[selectedHeight])
  console.log(height);

  for (let feet = 4; feet <= 7; feet++) {
    for (let inches = 0; inches < 12; inches++) {
      heightInInch.push(`${feet}'${inches}"`);
    }
  }

  const generateHeightsInCm = (start: number, end: number, step: number) => {
    const heights = [];
    for (let height = start; height <= end; height += step) {
      heights.push(height);
    }
    return heights;
  };


  const heightsInCm = generateHeightsInCm(130, 250, 1);


  const handleToggle = () => {
    setSelectedOption(selectedOption === 'ft' ? 'cm' : 'ft');
  }; 

  return (

    <View style={{ alignItems: 'center', paddingHorizontal: 6, paddingTop: 20 }}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>How tall are you?</Text>
      <Text style={{ color: '#707070', fontSize: 16, textAlign: 'center', marginTop: 10 }}>Your height will help us to calculate important body stats to help you reach your goals faster(in {selectedOption}).</Text>
 
      <View className=' mt-10'>
        <ScrollableInput data={
          selectedOption === 'ft' ? heightInInch : heightsInCm
        } selectedIndex={selectedHeight} setSelectedIndex={setSelectedHeight} />
      </View>

      <View style={{ elevation: 5 }} className=' bg-[#1C1E27] w-24 h-8 rounded-full flex-row mt-10'>
        <TouchableNativeFeedback onPress={handleToggle}>
          <View style={{ elevation:  selectedOption === 'ft' ? 5 : 0 }} className={cn(
            'bg-[#1A4CD3] h-full rounded-full items-center justify-center flex-1',
            selectedOption === 'ft' ? 'bg-[#1A4CD3]' : 'bg-[#1C1E27]'
          )}>
            <Text className={cn(
              " text-base text-white",
              selectedOption === 'ft' ? 'text-white' : 'text-[#707070]'
            )}>ft</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={handleToggle}>
          <View style={{ elevation:  selectedOption === 'cm' ? 5 : 0 }} className={cn(
            "items-center justify-center flex-1 rounded-full",
            selectedOption === 'cm' ? 'bg-[#1A4CD3]' : 'bg-[#1C1E27]'
          )}>
            <Text className={cn(
              "text-base text-[#707070]",
              selectedOption === 'cm' ? 'text-white' : 'text-[#707070]'
            )}>cm</Text>
          </View>
        </TouchableNativeFeedback>
      </View>


    </View>
  )
}

export default HeightInput
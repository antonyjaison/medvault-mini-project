import ScrollableInput from '@/components/scrollable-input';
import React, { useEffect, useRef, useState } from 'react';
import { Text, View, ScrollView, Vibration, TouchableOpacity } from 'react-native';
import { useUser } from '@/store/userStore';

const AgeInput = () => {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const { setAge, age } = useUser();

  useEffect(() => {
    setAge(selectedIndex.toString());
  },[selectedIndex])

  // console.log(age);

  const ageArray = Array.from({ length: 100 - 17 }, (_, index) => index + 18);

  return (
    <View style={{ alignItems: 'center', paddingHorizontal: 6, paddingTop: 20 }}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>What's Your Age?</Text>
      <Text style={{ color: '#707070', fontSize: 16, textAlign: 'center', marginTop: 10 }}>Your age determines how much you should consume.</Text>

      <View className=' mt-10'>
        <ScrollableInput data={ageArray} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
      </View>
    </View>
  );
};

export default AgeInput;

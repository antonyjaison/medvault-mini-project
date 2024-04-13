import { View, Text } from "react-native";
import React from "react";

type TimerProps = {
  name: string;
  age?: number;
  education?: string[],
  gender: "M" | "F"
};

const Timer = ({ name, age, gender, education }: TimerProps) => {
  return (
    <View className=" bg-white">
      <Text>Hello, {name}, {age}, {gender}</Text>
    </View>
  );
};

export default Timer;

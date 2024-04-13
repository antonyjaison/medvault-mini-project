import { View, Text } from "react-native";
import React from "react";
import { useColorScheme } from "@/components/useColorScheme";

const AuthProgress = () => {
  const colorScheme = useColorScheme();

  const arr = [
    {
      number: 1,
      active: true,
    },
    {
      number: 2,
      active: false,
    },
    {
      number: 3,
      active: false,
    },
    {
      number: 4,
      active: false,
    },
    {
      number: 5,
      active: false,
    },
    {
      number: 6,
      active: false,
    },
    {
      number: 7,
      active: false,
    },
    {
      number: 8,
      active: false,
    },
  ] as const;

  return (
    <View className=" flex-row gap-1">
      {arr.map((data) => (
        <View
          key={data.number}
          style={{ backgroundColor: data.active ? "white" : "#707070" }}
          className="w-4 h-[2px] rounded-sm"
        />
      ))}
    </View>
  );
};

export default AuthProgress;

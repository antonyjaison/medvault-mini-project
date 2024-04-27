import { View, Text } from "react-native";
import React from "react";
import { useColorScheme } from "@/components/useColorScheme";

const AuthProgress = ({ id }: { id: number }) => {
  const colorScheme = useColorScheme();

  const arr = [1, 2, 3, 4, 5, 6, 7, 8]

  return (
    <View className=" flex-row gap-1">
      {arr.map((number) => (
        <View
          key={number}
          style={{ backgroundColor: number <= id ? "white" : "#707070" }}
          className="w-4 h-[2px] rounded-sm"
        />
      ))}
    </View>
  );
};

export default AuthProgress;

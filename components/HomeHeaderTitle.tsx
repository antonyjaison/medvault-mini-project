import { View, Text } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { Link } from "expo-router";
// import { useUser } from "@/stores/useUser";

const HomeHeaderTitle = () => {
  return (
    <View className="flex-row">
          <Avatar />
      <View className=" ml-3">
        <Text className="font-medium text-base text-white">Good Morning</Text>
        <Text className=" text-xs text-white">{"Sarah"}</Text>
      </View>
    </View>
  );
};

export default HomeHeaderTitle;
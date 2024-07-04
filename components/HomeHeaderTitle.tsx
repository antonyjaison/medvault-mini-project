import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { Link } from "expo-router";
import { useUser } from "@/store/userStore";
import { getGreeting } from "@/lib/time";

const HomeHeaderTitle = () => {
  const { user, name } = useUser();
  // console.log(user)

  const [userName, setUserName] = useState("")

  useEffect(() => {
    if (name) {
      setUserName(name)
    }else{
      setUserName(user?.email)
    }
  },[])

  return (
    <View className="flex-row">
      <Avatar />
      <View className=" ml-3">
        <Text className="font-medium text-base text-white">{getGreeting()}</Text>
        <Text className=" text-xs text-white">{userName}</Text>
      </View>
    </View>
  );
};

export default HomeHeaderTitle;

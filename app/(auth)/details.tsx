import { View, Text, Dimensions } from "react-native";
import React from "react";
import AuthProgress from "@/components/auth-progress";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import NameInput from "./_components/name-input";
import CityInput from "./_components/city-input";

const UserDetails = () => {
  const colorScheme = useColorScheme();
  const { height } = Dimensions.get("screen");

  return (
    <View
      style={{ height: height - 20 }}
      className="w-full items-center"
    >
      <View className="mt-20">
        <AuthProgress />
      </View>

      <View className=" w-full h-10 mt-10">
        <NameInput/>
        <CityInput/>
      </View>


      <View
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].tabBarColor,
        }}
        className="w-full h-[55px] absolute bottom-0 flex-row justify-between px-3"
      >
        <View className=" h-fit w-fit flex-row items-center gap-1">
          <Ionicons
            color={Colors[colorScheme ?? "light"].text}
            size={20}
            name="chevron-back"
          />
          <Text
            style={{
              color: Colors[colorScheme ?? "light"].text,
            }}
            className="text-lg"
          >
            Back
          </Text>
        </View>

        <View className=" h-fit w-fit flex-row items-center gap-1">
          <Text
            style={{
              color: Colors[colorScheme ?? "light"].text,
            }}
            className=" text-lg"
          >
            Next
          </Text>
          <Ionicons
            color={Colors[colorScheme ?? "light"].text}
            size={20}
            name="chevron-forward"
          />
        </View>
      </View>
    </View>
  );
};

export default UserDetails;

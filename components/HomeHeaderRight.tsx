import React from "react";
import { View, TouchableNativeFeedback } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

const HomeHeaderRight = () => {
  const router = useRouter();
  return (
    <View className=" relative">
      <View className="bg-[#2F2F40] rounded-full mr-3 overflow-hidden">
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#ECDEDE", true)}
          onPress={() => router.push("/(tabs)/chat")}
          useForeground
        >
          <View
            className="w-10 h-10 justify-center items-center"
            accessible
            accessibilityRole="button"
          >
            <FontAwesome name="bell-o" size={20} color="white" />
          </View>
        </TouchableNativeFeedback>
      </View>
      <View className="w-3 h-3 bg-[#F19483] absolute right-[10px] rounded-full" />
    </View>
  );
};

export default HomeHeaderRight;

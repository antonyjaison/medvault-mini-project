import { Link } from "expo-router";
import { View } from "./Themed";
import { Image } from "react-native";
import React from "react";
// import { useUser } from "@/stores/useUser";
import { useUser } from "@/store/userStore";

const Avatar = () => {
  const { user } = useUser();
  return (
    <Link className="h-10 w-10" href="/profile/">
      <View className="rounded-full">
        <Image
          className=" rounded-full w-10 h-10"
          source={require("../assets/images/avatar.png")
          }
        />
      </View>
    </Link>
  );
};

export default Avatar;

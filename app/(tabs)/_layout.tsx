import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Image, Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard:true,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].tabBarColor,
          height: 55,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={20} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "Health",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="heartbeat" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: "Documents",
          headerTitle: "Documents",
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-outline" size={20} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerTitle:"",
          headerStyle:{
            backgroundColor: Colors[colorScheme ?? "light"].headerColor,
            height:130
          },
          tabBarStyle:{
            // marginTop:10,
            // paddingTop:10
          },
          
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-outline" size={20} color={color} />
          ),
          headerLeft: () => (
            <Image className="ml-6" source={require("@/assets/images/avatar.png")}/>
          )
        }}
      />
    </Tabs>
  );
}

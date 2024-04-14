import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Image, TouchableOpacity, useColorScheme } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import {
  Avatar,
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";
import { BASE_URL } from '@env'

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://github.com/shadcn.png",
        },
      },
    ]);
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const api = `${BASE_URL}/chat/${text}`;
    const response = await fetch(api);
    const data = await response.json()

    if (data) {
      setMessages(previousMessages => GiftedChat.append(previousMessages, {
        _id: new Date().toISOString(),
        text: data,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Bloom AI",
          avatar: "https://github.com/shadcn.png",
        },
      }));
    } else {
      console.log("No data");
    }

  }, [text]);


  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        primaryStyle={{
          marginHorizontal: 8,
          borderWidth: 0,
        }}
        containerStyle={{
          // backgroundColor: Colors[colorScheme ?? "light"].chatInputColor,
          backgroundColor:"transparent",
          borderRadius: 30,
          marginHorizontal: 10,
          marginBottom: 5,
          borderWidth:1,
          borderColor:Colors[colorScheme ?? "light"].chatInputColor
        }}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <View className="bg-transparent">
        {text.length > 0 ? (
          <Send
            {...props}
            containerStyle={{
              // backgroundColor: Colors[colorScheme ?? "light"].chatInputColor,
              // paddingRight:20,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              marginRight:-5
            }}
          >
            <View
              style={{
                backgroundColor: Colors[colorScheme ?? "light"].tabIconSelected,
                padding: 10,
                borderRadius: 30,
              }}
            >
              <Ionicons name="send" size={18} color="white" />
            </View>
          </Send>
        ) : (
          <View
            style={{
              // backgroundColor: Colors[colorScheme ?? "light"].chatInputColor,
              backgroundColor:"transparent",
              borderRadius:30
            }}
            className="flex-1 flex-row items-center "
          >
            <TouchableOpacity
              className="mr-4"
              onPress={() => console.log("camera button")}
            >
              <Ionicons
                name="camera-outline"
                size={20}
                color={Colors[colorScheme ?? "light"].text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="mr-2"
              onPress={() => console.log("mic button")}
            >
              <Ionicons
                name="mic-outline"
                size={20}
                color={Colors[colorScheme ?? "light"].text}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        containerStyle={{
          left: {
            marginBottom: 5,
          },
          right: {
            marginBottom: 5,
          },
        }}
        wrapperStyle={{
          left: {
            borderWidth: 0.5,
            borderColor: Colors[colorScheme ?? "light"].text,
            backgroundColor: "transparent",
            paddingVertical: 5
          },
          right: {
            backgroundColor: Colors[colorScheme ?? "light"].tabIconSelected,
            paddingVertical: 5
          },
        }}
        textStyle={{
          left: {
            color: Colors[colorScheme ?? "light"].text,
            fontSize: 14
          },
          right: {
            color: Colors[colorScheme ?? "light"].text,
            fontSize: 14
          },
        }}
        {...props}
      />
    );
  };

  const renderAvatar = () => {

    return (

      <Image source={{ uri: "https://github.com/shadcn.png" }} style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        overflow: "hidden",
        marginBottom: 5,
      }} />

    )
  }

  return (
    <View
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].headerColor,
      }}
      className="h-full"
    >
      <View
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].headerColor,
        }}
        className="px-6"
      >
        <Text className="text-3xl">BloomAI</Text>
        <View
          style={{
            backgroundColor: Colors[colorScheme ?? "light"].lineColor,
          }}
          className="h-[1px] w-full mt-4"
        />
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        onInputTextChanged={setText}
        renderBubble={renderBubble}
        renderAvatar={renderAvatar}
        textInputProps={{
          color: Colors[colorScheme ?? "light"].text,
        }}
      />
    </View>
  );
}

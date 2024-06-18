import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TouchableNativeFeedback, Linking } from "react-native";
import { AntDesign, Entypo, EvilIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Divider } from "./divider";
import { Block } from "./document-folder";

type DocumentCardProps = {
  onPress?: () => void;
  title?: string;
  subtitle?: string;
  type?: string;
  url?: string;
}

const DocumentCard = ({
  onPress,
  subtitle,
  title,
  type,
  url
}: DocumentCardProps) => {
  console.log('url of doc =>', url)

  const openUrl = () => Linking.canOpenURL(url).then(() => {
    console.log(url)
    Linking.openURL(url);
  });

  return (
    <TouchableNativeFeedback onPress={openUrl}>
      <View className=" w-full bg-[#2F2F40] rounded-2xl h-fit flex-row items-center justify-between px-5 py-4 overflow-hidden">
        <View className="h-fit flex-row items-center gap-3">
          <FontAwesome name={type?.includes("image") ? "file-image-o" : "file-pdf-o"} size={30} color="#C10000" />
          <View>
            <Text className=" text-white text-sm">{title}</Text>
            <Text className=" text-[#999797] text-[10px]">{title}</Text>
          </View>
        </View>
        <Menu>

          <MenuTrigger customStyles={{
            triggerOuterWrapper: {
              borderRadius: 50,
            },
            triggerWrapper: {
              borderRadius: 50, padding: 6, overflow: "hidden"
            },
            triggerTouchable: {
              underlayColor: "#2A2D3A",
              activeOpacity: 0.7,
            },
          }}>

            <Ionicons name="ellipsis-vertical" color="#fff" size={20} />
          </MenuTrigger>
          <MenuOptions customStyles={{ optionWrapper: {}, optionsContainer: { backgroundColor: "#2A2D3A", borderRadius: 10, width: 100 } }}>
            <Block icon={<FontAwesome name='thumb-tack' color="#fff" size={18} />} onSelect={() => { }} />
            <Divider backgroundColor='#7F8487' height={1} />
            <Block icon={<Ionicons name='pencil' color="#fff" size={18} />} onSelect={() => { }} />
            <Divider backgroundColor='#7F8487' height={1} />
            <Block icon={<Ionicons name='share-social' color="#fff" size={18} />} onSelect={() => { }} />
            <Divider backgroundColor='#7F8487' height={1} />
            <Block icon={<FontAwesome name='trash-o' color="#BA1A1A" size={18} />} onSelect={() => { }} />
          </MenuOptions>
        </Menu>

      </View>
    </TouchableNativeFeedback >
  );
};

export default DocumentCard;





import { View, Text } from "react-native";
import React from "react";
import { TouchableNativeFeedback } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

type DocumentCardProps = {
  onPress?: () => void;
  title?: string;
  valid_till?: string;
  subtitle?: string;
};

const DocumentCard = ({
  onPress,
  subtitle,
  title,
  valid_till,
}: DocumentCardProps) => {
  return (
    <View
      style={{ elevation: 3 }}
      className=" w-full  bg-white rounded-2xl overflow-hidden mt-6"
    >
      <TouchableNativeFeedback
        useForeground
        onPress={() => {
          onPress && onPress();
        }}
      >
        <View className="px-5 py-4 w-full flex-row">
          <AntDesign name="pdffile1" size={30} color="#C10000" />
          <View className=" ml-3">
            <Text className="text-sm">{title ?? "document"}</Text>
            <Text className="text-[10px] text-[#999797]">
              {subtitle ?? "Met Life | Valid till : 31-03-2025"}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default DocumentCard;

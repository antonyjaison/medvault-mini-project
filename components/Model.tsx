import { AntDesign } from "@expo/vector-icons";
import React, { ReactElement } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Divider } from "./divider";

type ModelProps = {
  children: ReactElement;
  isVisible: boolean;
  onClose?: () => void;
  title: string
};

const Model = ({ children, isVisible, onClose, title }: ModelProps) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View className=" w-full rounded-[10px] h-fit flex-row items-center justify-between px-5 pt-4 pb-3">
            <Text className="font-medium text-lg text-white">{title}</Text>
            <Pressable onPress={onClose}>
              <AntDesign name="close" color="#fff" size={20} />
            </Pressable>
          </View>
          <Divider backgroundColor="#4E4E4E" height={1} />
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
  },
  modalView: {
    width: "85%",
    minHeight: 200,
    backgroundColor: "#1C1E27",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Model;

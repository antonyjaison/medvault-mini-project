import { View } from "@/components/Themed";
import Timer from "@/components/timer";

export default function TabOneScreen() {

  return (
    <View className="justify-center items-center h-full">
      <Timer name="Antony" age={21} gender="M"/>
      <Timer name="Jibin" age={22} gender="M"/>
      <Timer name="Aarsha" gender="F"/>
      <Timer name="Vishnu" gender="M"/>
    </View>
  );
}

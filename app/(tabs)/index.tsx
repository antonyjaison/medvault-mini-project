import DocumentsSection from "@/components/DocumentsSection";
import InsightSection from "@/components/InsightSection";
import { View } from "@/components/Themed";
import Footer from "@/components/footer";
import MedicationIntakeStatus from "@/components/medication-intake-status";
import Timer from "@/components/timer";
import { ScrollView, Text } from "react-native";

export default function TabOneScreen() {

  const timer_gradient = [
    { color: "#6d9cf4", percentage: 50 },
    { color: "#1A4CD3", percentage: 100 },
  ]

  return (
    <ScrollView>
      <View style={{ gap: 34 }} className="h-full bg-[#16161A] w-full px-4 flex-col py-4">
        <View className="bg-transparent w-full items-center">
          <Timer
            radius={80}
            percentage={68}
            strokeWidth={16}
            circleWidth={200}
            gradient={timer_gradient}
            backgroundStrokeColor="none"
          />
          <Text className="text-white text-lg font-medium mt-4">Time for Next Medication</Text>
        </View>
        <MedicationIntakeStatus />
        <DocumentsSection />
        <InsightSection />
        <Footer />
      </View>
    </ScrollView>
  );
}

import DocumentsSection from "@/components/DocumentsSection";
import InsightSection from "@/components/InsightSection";
import { View } from "@/components/Themed";
import Footer from "@/components/footer";
import MedicationIntakeStatus from "@/components/medication-intake-status";
import Timer from "@/components/timer";
import { ScrollView } from "react-native";

export default function TabOneScreen() {

  return (
    <ScrollView>
      <View style={{ gap: 34 }} className="h-full bg-[#16161A] w-full px-4 flex-col py-4">
        <Timer percentage={35} circleWidth={200}/>
        <MedicationIntakeStatus />
        <DocumentsSection />
        <InsightSection />
        <Footer/>
      </View>
    </ScrollView>
  );
}

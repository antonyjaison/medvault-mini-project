import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import DocumentCard from "./DocumentCard";

// import { collection, getDocs } from "firebase/firestore";
// import { FIRESTORE_DB } from "@/lib/firebase";
// import { useUser } from "@/stores/useUser";
// import { Prescription } from "@/types/document";
import { usePathname } from "expo-router";
import PrescriptionCard from "./PrescriptionCard";

const DocumentsSection = () => {

  return (
    <View className="bg-[#1C1E27] px-6 py-5 rounded-2xl flex-col">
      <Text className="font-medium text-lg text-white">Your Active Prescriptions</Text>

      <View className=" flex-row flex-wrap justify-around py-2">
        <PrescriptionCard
          title="demo"
          subtitle={`completes on`}
        />
        <PrescriptionCard
          title="demo"
          subtitle={`completes on`}
        />
        {/* {!loading && precriptions.length !== 0 && ( */}
        {/* <>
            {precriptions.map((prescription, index) => (
              <PrescriptionCard
                key={index}
                title={prescription.name}
                subtitle={`completes on ${prescription.expires.toDateString()}`}
              />
            ))}
          </> */}
        {/* )} */}
        {/* {loading && (
          <ActivityIndicator className="mt-5" size={30} color="#000" />
        )}
        {!loading && precriptions.length === 0 && (
          <Text className="italic mt-6">No prescriptions found</Text>
        )} */}
      </View>
    </View>
  );
};

export default DocumentsSection;

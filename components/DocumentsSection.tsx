import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import PrescriptionCard from "./PrescriptionCard";
import firestore from '@react-native-firebase/firestore';
import { useUser } from "@/store/userStore";
import { useDocuments } from '@/store/useDocuments'

const DocumentsSection = () => {
  const { user } = useUser();
  const { prescriptions, setPrerscriptions } = useDocuments()

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getPrescriptionDetails = async () => {
      if (!user?.uid) {
        setError('User not defined');
        setLoading(false);
        return;
      }

      try {
        const querySnapshot = await firestore()
          .collection("prescription")
          .where('uid', '==', user?.uid)
          .get();

        if (querySnapshot.empty) {
          console.log('No matching documents found.');
          setError('No prescriptions found.');
          setLoading(false);
          return;
        }

        const prescriptions = querySnapshot.docs.map(doc => doc.data());
        console.log('lorem',prescriptions);
        setPrerscriptions(prescriptions)
      } catch (error) {
        console.error(error);
        setError('Failed to fetch prescriptions.');
      } finally {
        setLoading(false);
      }
    };

    getPrescriptionDetails();
  }, []);

  // console.log(prescriptions)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Active Prescriptions</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <ScrollView  showsHorizontalScrollIndicator={false}>
          {prescriptions.map((prescription, index) => (
            <PrescriptionCard
              key={index}
              title={`Prescription ${index + 1}`} // Assuming 'name' is a field in your document
              subtitle={`Ongoing`} // Assuming you have an 'endDate'
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1E27',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  }
});

export default DocumentsSection;

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

const InsightSection = () => {
  const [quote, setQuote] = useState({})

  useEffect(() => {
    const getQuote = async () => {
      const res = await fetch(
        "https://api.api-ninjas.com/v1/quotes?category=health",
        {
          headers:{
            'X-Api-Key':"VTXARIGX6lGvAaWIAPEQyQ==wH7UE96oLrlfQimw"
          }
        }
      );
      const data = await res.json();
      setQuote(data)
    };
    getQuote();
  }, []);

  return (
    <View className="py-5">
      <View>
        <Text className="text-lg font-medium text-white">Insight for the day</Text>
        <Text className=" text-[#8E8E8E] text-xs">08 April 2024</Text>
      </View>
      <View className="mt-6">
        <Text className="text-base font-medium text-white">
          {quote[0]?.quote}
        </Text>
        <Text className="text-xs mt-1 text-white">- {quote[0]?.author}</Text>
      </View>
    </View>
  );
};

export default InsightSection;

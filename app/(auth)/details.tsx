import { View, Text, Dimensions, TouchableOpacity, Vibration } from "react-native";
import React, { useEffect, useState } from "react";
import AuthProgress from "@/components/auth-progress";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import NameInput from "./_components/name-input";
import CityInput from "./_components/city-input";
import GenderInput from "./_components/gender-input";
import AgeInput from "./_components/age-input";
import HeightInput from "./_components/height-input";
import WeightInput from "./_components/weight-input";
import ActivityInput from "./_components/activity-input";
import GooglefiInput from "./_components/googlefit-input";
import { AuthPageType, authPages } from "@/constants/auth-data";
import { cn } from "@/lib/utils";

const UserDetails = () => {
  const colorScheme = useColorScheme();
  const { height } = Dimensions.get("screen");
  const [selectedOption, setSelectedOption] = useState<AuthPageType>({
    id: 1,
    for: "name",
  })
  const [selectedElement, setSelectedElement] = useState<React.ReactElement>(<></>)

  const handleClickNext = () => {
    const currentIndex = authPages.findIndex((page) => page.for === selectedOption.for);
    if (currentIndex === authPages.length - 1) {
      return;
    }
    Vibration.vibrate(50)
    setSelectedOption(authPages[currentIndex + 1]);
    // setSelectedOption(authPages[currentIndex + 1].for);
  }

  const handlePreviousClick = () => {
    const currentIndex = authPages.findIndex((page) => page.for === selectedOption.for);
    if (currentIndex === 0) {
      return;
    }
    Vibration.vibrate(50)
    setSelectedOption(authPages[currentIndex - 1]);
  }

  useEffect(() => {
    switch (selectedOption.for) {
      case "activity":
        setSelectedElement(<ActivityInput />);
        break;
      case "age":
        setSelectedElement(<AgeInput />);
        break;
      case "city":
        setSelectedElement(<CityInput />);
        break;
      case "googlefit":
        setSelectedElement(<GooglefiInput />);
        break;
      case "height":
        setSelectedElement(<HeightInput />);
        break;
      case "weight":
        setSelectedElement(<WeightInput />);
        break;
      case "name":
        setSelectedElement(<NameInput />);
        break
      case "sex":
        setSelectedElement(<GenderInput />);
        break;
      default: setSelectedElement(<NameInput />)
    }
  }, [selectedOption])


  return (
    <View
      style={{ height: height - 20 }}
      className="w-full items-center bg-[#16161A]"
    >
      <View className="mt-20">
        <AuthProgress id={selectedOption.id}/>
      </View>

      <View className=" w-full h-10 mt-10">
        {selectedElement}
      </View>


      <View
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].tabBarColor,
        }}
        className="w-full h-[55px] absolute bottom-0 flex-row justify-between px-3"
      >
        <TouchableOpacity onPress={handlePreviousClick} className=" h-fit w-fit flex-row items-center gap-1">
          <Ionicons
            color={selectedOption.id === 1 ? "#707070" : Colors[colorScheme ?? "light"].text}
            size={20}
            name="chevron-back"
          />
          <Text
            style={{
              color: selectedOption.id === 1 ? "#707070" : Colors[colorScheme ?? "light"].text,
            }}
            className="text-lg">
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClickNext} className=" h-fit w-fit flex-row items-center gap-1">
          <Text
            style={{
              color: Colors[colorScheme ?? "light"].text,
            }}
            className=" text-lg"
          >
            Next
          </Text>
          <Ionicons
            color={Colors[colorScheme ?? "light"].text}
            size={20}
            name="chevron-forward"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDetails;

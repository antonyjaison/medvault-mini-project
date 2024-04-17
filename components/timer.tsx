import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Circle, Svg, Defs, LinearGradient, Stop } from 'react-native-svg'

type TimerProps = {
  percentage: number,
  circleWidth: number
}

const Timer = ({ circleWidth, percentage }: TimerProps) => {
  const radius = 85;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100
  return (
    <View>
      <Svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`}>
        <Defs>
          <LinearGradient id="gradient">
            <Stop offset="10%" stopColor="#12c2e9" />
            <Stop offset="50%" stopColor="#c471ed" />
            <Stop offset="100%" stopColor="#f64f59" />
          </LinearGradient>
        </Defs>
        <Circle
          fill="none"
          stroke="#ddd"
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={15}
          r={radius}
        />
        <Circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth={15}
          r={radius}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          fill="none"
          stroke="url(#gradient)"
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
          strokeLinecap="round"
          strokeLinejoin="round"

        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  circleBackground: {

  }
});

export default Timer;

import React from "react";
import { Circle, Svg, Defs, LinearGradient, Stop } from 'react-native-svg'

type GradientType = {
  color: string,
  percentage: number
}

type TimerProps = {
  percentage: number,
  circleWidth: number,
  radius: number,
  strokeWidth: number,
  backgroundStrokeColor: string,
  gradient: GradientType[]
}

const Timer = ({ circleWidth, percentage, gradient, radius, strokeWidth, backgroundStrokeColor }: TimerProps) => {
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100
  return (
    <Svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`}>
      <Defs>
        <LinearGradient id="gradient">
          {gradient.map((data, index) => <Stop key={index} offset={`${data.percentage}%`} stopColor={data.color} />)}
        </LinearGradient>
      </Defs>
      <Circle
        fill="none"
        stroke={backgroundStrokeColor}
        cx={circleWidth / 2}
        cy={circleWidth / 2}
        strokeWidth={strokeWidth}
        r={radius}
      />
      <Circle
        cx={circleWidth / 2}
        cy={circleWidth / 2}
        strokeWidth={strokeWidth}
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
  );
};

export default Timer;

import React, { useEffect, useRef } from "react";
import { Circle, Svg, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Animated, Easing } from 'react-native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type GradientType = {
  color: string;
  percentage: number;
};

type TimerProps = {
  percentage: number;
  circleWidth: number;
  radius: number;
  strokeWidth: number;
  backgroundStrokeColor: string;
  gradient: GradientType[];
};

const Timer = ({
  circleWidth,
  percentage,
  gradient,
  radius,
  strokeWidth,
  backgroundStrokeColor,
}: TimerProps) => {
  const dashArray = radius * Math.PI * 2;
  const animatedValue = useRef(new Animated.Value(percentage)).current;

  useEffect(() => {
    const animation = Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
    });

    animation.start();

    return () => {
      animation.stop();
    };
  }, [percentage, animatedValue]);

  const dashOffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [dashArray, 0],
  });

  return (
    <Svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`}>
      <Defs>
        <LinearGradient id="gradient">
          {gradient.map((data, index) => (
            <Stop key={index} offset={`${data.percentage}%`} stopColor={data.color} />
          ))}
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
      <AnimatedCircle
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

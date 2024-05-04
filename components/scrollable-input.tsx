import { View, Text, ScrollView, TouchableOpacity, Vibration } from 'react-native'
import React, { useRef, useState } from 'react'

type ScrollableInputProps = {
    data: any,
    selectedIndex: any,
    setSelectedIndex: (index: any) => void
}

const ScrollableInput = ({ data, selectedIndex, setSelectedIndex }: ScrollableInputProps) => {
    const scrollViewRef = useRef(null);

    const handleScroll = () => {
        Vibration.vibrate(1); // Vibrate for 5 milliseconds on scroll
    };

    const handlePress = (index: any) => {
        setSelectedIndex(index);
        Vibration.vibrate(2);
    };
    return (
        <View style={{ height: 250, justifyContent: 'center', alignItems: 'center' }}>
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={1} // Adjust scroll event frequency
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                decelerationRate={"normal"}
                fadingEdgeLength={300}
                maintainVisibleContentPosition={{
                    minIndexForVisible: 0,
                    autoscrollToTopThreshold: 10,
                }}
            >
                {data.map((data: any) => (
                    <TouchableOpacity key={data} onPress={() => handlePress(data)}>
                        <Text style={{ fontWeight: selectedIndex === data ? 'bold' : 'normal', fontSize: 24, color: selectedIndex === data ? '#fff' : '#A0A0A0', marginTop: 10 }}>
                            {data}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default ScrollableInput
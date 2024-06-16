import React from 'react'
import { Stack } from 'expo-router'

const ProfileStack = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "",
                headerStyle: {
                    backgroundColor: "#16161A",
                },
            }} />
            <Stack.Screen name="emergency-contacts" options={{ headerTitle: "Emergency Contacts" }} />
        </Stack>
    )
}

export default ProfileStack
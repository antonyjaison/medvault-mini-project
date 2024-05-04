import React from 'react'
import { Stack } from 'expo-router'

const DocumentsStack = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, }}/>
            <Stack.Screen name="[folderID]" options={{ headerShown: false, }}/>
        </Stack>
    )
}

export default DocumentsStack
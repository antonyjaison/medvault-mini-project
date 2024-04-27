import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

type InputProps = {
    labelBackgroundColor?: string,
    label: string,
} & Partial<Omit<TextInputProps, 'placeholder' | 'onChangeText' | 'value'>> & {
    onChangeText?: (text: string) => void,
    value?: string,
    placeholder: string
}

const Input = ({ labelBackgroundColor, label, onChangeText, value, placeholder, ...rest }: InputProps) => {

    const [hidePassword, setHidePassword] = useState(true)

    const toggleHidePassword = () => {
        setHidePassword(!hidePassword)
    }

    return (
        <View className=' relative'>
            <TextInput secureTextEntry={label === "Password" && hidePassword} value={value} onChangeText={onChangeText} placeholder={placeholder} {...rest} placeholderTextColor="#bfbfbf" className=' bg-transparent border-0.5 border-[#707070] rounded-xl px-6 py-2 w-full text-[#bfbfbf] text-sm' />
            <Text style={{ backgroundColor: labelBackgroundColor || "#1C1E27" }} className=' text-[#707070] text-xs absolute top-[-8px] left-4 bg-[#1C1E27] px-2'>{label}</Text>
            {label === "Password" && (
                <TouchableOpacity onPress={toggleHidePassword} className=' absolute right-4 top-2'>
                    {
                        hidePassword ? (
                            <Ionicons name='eye-outline' size={25} color="#fff" />
                        ) : (
                            <Ionicons name='eye-off-outline' size={25} color="#fff" />
                        )
                    }
                </TouchableOpacity>
            )}
        </View>
    )
}

export default Input
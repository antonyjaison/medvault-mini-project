import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { cn } from '@/lib/utils';
import { Divider } from './divider';

type BlockProps = {
    onSelect: () => void,
    icon: React.ReactElement
}

type DocumentFolderProps = {
    title: string,
    subtitle?: string,
    onPress: () => void,
}

export const Block = ({ icon, onSelect }: BlockProps) => {
    return (
        <MenuOption onSelect={onSelect}>
            <TouchableOpacity style={styles.menuItem}>
                {icon}
            </TouchableOpacity>
        </MenuOption>
    )
}

const DocumentFolder = ({ onPress, subtitle, title }: DocumentFolderProps) => {


    return (
        <TouchableOpacity onPress={onPress} className=' relative'>
            <View className={cn(
                ' flex-row h-fit items-center justify-between bg-[#1C1E27] p-5 py-4 rounded-2xl',
                subtitle === undefined && 'py-5'
            )}>
                <View className=' flex-row h-fit items-center gap-3'>
                    <Ionicons name='folder-outline' color="#fff" size={30} />
                    <View>
                        <Text className=' font-medium text-white text-xl'>{title}</Text>
                        {subtitle && <Text className=' text-white text-xs'>{subtitle}</Text>}
                    </View>
                </View>

                <Menu>
                    <MenuTrigger customStyles={{
                        triggerOuterWrapper: {
                            borderRadius: 50,
                        },
                        triggerWrapper: {
                            borderRadius: 50, padding: 6, overflow: "hidden"
                        },
                        triggerTouchable: {
                            underlayColor: "#2A2D3A",
                            activeOpacity: 0.7,
                        }
                    }}>
                        <Ionicons name='ellipsis-vertical' color="#fff" size={24} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{ optionWrapper: {}, optionsContainer: { backgroundColor: "#2A2D3A", borderRadius: 10, width: 100 } }}>

                        <Block icon={<Ionicons name='pencil' color="#fff" size={18} />} onSelect={() => { }} />
                        <Divider backgroundColor='#7F8487' height={1} />
                        <Block icon={<FontAwesome name='trash-o' color="#BA1A1A" size={18} />} onSelect={() => { }} />
                    </MenuOptions>
                </Menu>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    menuItem: {
        alignItems: 'center',
        paddingVertical: 5,
    },
})


export default DocumentFolder
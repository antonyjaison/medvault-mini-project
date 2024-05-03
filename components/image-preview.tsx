import { View, Image, Dimensions, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons'
import { FileType } from '@/lib/types/file-type';

type ImagePreviewProps = {
    image: string;
    setFile: React.Dispatch<React.SetStateAction<FileType>>;
    onPressUpload: () => void;
    loading: number;
    setLoading: React.Dispatch<React.SetStateAction<number>>;
}

const ImagePreview = ({ image, onPressUpload, setFile, loading, setLoading }: ImagePreviewProps) => {
    const { height } = Dimensions.get("screen")

    const clearSelectedFile = () => {
        setLoading(0)
        setFile({
            uri: "",
            name: "",
            type: ""
        })
    }

    return (
        <View style={{ height: height - 190 }} className=' z-20 w-full bg-[#000000aa] absolute top-0 items-center justify-center px-4'>
            <TouchableOpacity onPress={clearSelectedFile} className='self-end mr-6 mb-6'>
                <EvilIcons name="close" size={35} color="#fff" />
            </TouchableOpacity>
            <View className=' w-10/12 h-4/6 justify-center items-center relative'>
                <View className=' absolute  w-full h-full'>
                    <View className='absolute top-2 left-[-5px]'>
                        <View className=' w-12 h-[5px] bg-[#1A4CD3] absolute left-[-5px] top-[-5px] ' />
                        <View className=' w-[5px] h-12 bg-[#1A4CD3] absolute left-[-5px]' />
                    </View>
                    <View className='absolute top-2 right-[-5px]'>
                        <View className=' w-12 h-[5px] bg-[#1A4CD3] absolute right-[-5px] top-[-5px]' />
                        <View className=' w-[5px] h-12 bg-[#1A4CD3] absolute right-[-5px]' />
                    </View>
                    <View className='absolute bottom-2 right-[-5px] '>
                        <View className=' w-12 h-[5px] bg-[#1A4CD3] absolute right-[-5px]' />
                        <View className=' w-[5px] h-12 bg-[#1A4CD3] absolute bottom-0' />
                    </View>

                    <View className='absolute bottom-2 left-[-5px] '>
                        <View className=' w-12 h-[5px] bg-[#1A4CD3] absolute left-[-5px]' />
                        <View className=' w-[5px] h-12 bg-[#1A4CD3] absolute bottom-0 left-[-5px]' />
                    </View>
                </View>
                <Image
                    style={{ resizeMode: "contain", width: "100%", height: "100%" }}
                    source={{ uri: image }}
                    onError={() => console.log('Error loading image')}
                />
            </View>

            {(loading > 0) ? (
                <View className=' bg-[#86a6ff] rounded-xl overflow-hidden w-full'>
                    <View className=' h-5 overflow-hidden'>
                        <View style={{ width: `${loading}%` }} className=' h-full w-6 bg-[#1A4CD3]'>
                        </View>
                    </View>
                </View>
            ) : (
                <View className=' bg-[#1A4CD3] rounded-xl overflow-hidden w-full'>
                    <Button disabled={loading > 0} onPress={onPressUpload} color="#1A4CD3" title="Upload Prescription" />
                </View>
            )}

        </View>
    )
}

export default ImagePreview
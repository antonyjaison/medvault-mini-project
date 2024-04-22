import { StyleSheet, View } from "react-native";

type Dividertype = {
    height?: number,
    backgroundColor?: string,
}

export const Divider = ({ height, backgroundColor }: Dividertype) => <View style={{ height: height, backgroundColor: backgroundColor }} />;

const styles = StyleSheet.create({
    divider: {
        backgroundColor: "#7F8487",
    },
})

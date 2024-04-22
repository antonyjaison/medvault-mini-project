import { StyleSheet, View } from "react-native";

export const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#7F8487",
    },
})

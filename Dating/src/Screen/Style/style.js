import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";

const commonStyle = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default commonStyle;

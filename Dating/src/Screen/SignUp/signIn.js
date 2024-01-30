import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { SCREEN_WIDTH } from "../../utils/constants";
import SignUp from "./comoponent/signUp";
import ImageView from "../../components/imageView";
import FastImage from "react-native-fast-image";

const SignIn = (props) => {
  const localImage = require("../../assets/landing.png");
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <LinearGradient
          colors={["black", "black", "#C67C4E"]}
          style={{ flex: 0.35 }}
        ></LinearGradient>
        <View style={styles.parent}>
          <View style={styles.circle}>
            <FastImage
              source={localImage}
              style={{ height: "100%", width: "100%", borderRadius: 100 }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={styles.viewParent}>
            <View style={styles.view}>
              <SignUp {...props} />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parent: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    height: "100%",
    width: "100%",
    marginTop: 80,
    gap: 20,
  },
  circle: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: "#fff",
    backgroundColor: "white",
  },
  viewParent: { justifyContent: "center", alignItems: "center" },
  view: {
    height: 350,
    width: SCREEN_WIDTH / 1.2,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
});

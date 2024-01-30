import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";

const Flash = (props) => {
  const NextPage = () => {
    props.navigation.push("signin");
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View style={{ flex: 0.6 }}>
        <Image
          style={styles.image}
          source={require("../../assets/landing.png")}
        />
      </View>
      <View style={{ flex: 0.4 }}>
        <LinearGradient
          colors={["white", "black", "black"]}
          style={{ flex: 1, padding: 15 }}
        >
          <View>
            <View style={styles.header}>
              <Text style={styles.headText}>
                Coffee so good, your taste buds will love it.
              </Text>
            </View>
            <View style={styles.para}>
              <Text style={styles.paraText}>
                The best grain, the finest roast, the powerful flavor.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={() => NextPage()}
            >
              <Text style={styles.btnColor}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

export default Flash;

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "stretch",
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
  },

  para: { alignItems: "center", paddingHorizontal: 30, marginVertical: 20 },
  btn: {
    height: 50,
    backgroundColor: "#C67C4E",
    borderWidth: 1,
    borderColor: "#C67C4E",
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  btnColor: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Poppins-Regular",
  },

  headText: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    color: "#fff",
  },
  paraText: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
  },
});

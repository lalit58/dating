import React, { useRef, useImperativeHandle } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Linking,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  interpolate,
} from "react-native-reanimated";

const ScrollableScreen = React.forwardRef((props, ref) => {
  const animatedView = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    const background = interpolateColor(
      animatedView.value,
      [0, 300, 375],
      ["transparent", "transparent", "white"]
    );
    return {
      backgroundColor: background,
    };
  });
  const animatedText = useAnimatedStyle(() => {
    const background = interpolate(
      animatedView.value,
      [0, 350, 375],
      [0, 0, 1]
    );
    return {
      opacity: background,
    };
  });

  const topViewY = useSharedValue(0); // Y position of the top view
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY === 0) {
      // When scrolled to the top, show the top view
      topViewY.value = 0;
    } else {
      // When scrolled away from the top, hide the top view
      topViewY.value = -100;
    }
    animatedView.value = offsetY; // Update animated value based on scroll offset
  };

  const topViewStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      topViewY.value,
      [-100, 0],
      [0, 1] // Mapping opacity from -100 to 0 to 0 to 1
    );

    return {
      transform: [{ translateY: topViewY.value }],
      opacity,
    };
  });

  useImperativeHandle(ref, () => ({
    animate: (e) => animateView(e),
  }));

  const animateView = (e) => {
    animatedView.value = e;
  };

  // Mock data for the FlatList
  const data = Array.from({ length: 50 }, (_, index) => ({
    id: index.toString(),
    text: `Item ${index}`,
  }));

  const handleShare = (item) => {
    const itemLink = `www.coffe.eu/${item.id}`; // Replace with your custom scheme and item details

    const message = itemLink;
    //  `Check out this item: ${item.text}. Link: ${itemLink}`;
    Share.share({
      message,
    })
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const redirectToAppStore = (url) => {
    if (Platform.OS === "ios") {
      Linking.openURL("https://apps.apple.com/coffe"); // Replace with your App Store URL
    } else if (Platform.OS === "android") {
      Linking.openURL("market://details?id=coffe"); // Replace with your Play Store URL or package name
    }
  };

  Linking.addEventListener("url", ({ url }) => {
    console.log("Incoming deep link:", url);
    if (url) {
      redirectToAppStore(url); // Redirect to the App Store or Play Store
    } else {
      // Navigate to the appropriate screen based on the deep link URL
    }
  });

  // Check for initial deep link
  Linking.getInitialURL().then((url) => {
    if (url) {
      console.log("Initial deep link:", url);
      // Check if the app should redirect to the store based on the initial URL
      if (url) {
        redirectToAppStore(url); // Redirect to the App Store or Play Store
      } else {
        // Navigate to the appropriate screen based on the initial deep link URL
      }
    }
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.topView, topViewStyle]}>
        <Text>Top View</Text>
      </Animated.View>
      <Animated.View style={[styles.animatedView, animatedStyle]} />
      <Animated.View style={[styles.animatedText, animatedText]} />
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleShare(item)}
          >
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    height: 100,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  animatedView: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 150,
    left: 50,
  },
  animatedText: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 150,
    left: 200,
    backgroundColor: "red",
  },
});

export default ScrollableScreen;

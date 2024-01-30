import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AnimateHeader = forwardRef((props, ref) => {
  const { mainTitle, actionRef } = props;
  const [title, setTitle] = useState(mainTitle);
  const animatedView = useSharedValue(0);

  useEffect(() => {
    setTitle(mainTitle);
  }, [mainTitle]);

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
    const opacity = interpolate(animatedView.value, [0, 350, 375], [0, 0, 1]);
    return {
      opacity,
    };
  });

  useImperativeHandle(ref, () => ({
    animate: (e) => animateView(e),
  }));

  const animateView = (e) => {
    animatedView.value = withTiming(e, { duration: 100 });
  };

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          ...StyleSheet.absoluteFillObject,
          height: 85,
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingBottom: 15,
          paddingTop: 40,
          backgroundColor: "red",
        },
      ]}
    >
      <Text>Hellooo</Text>
      {/* Your header components with animated styles */}
      {/* Here, you can add your header components with animated styles */}
    </Animated.View>
  );
});

export default AnimateHeader;

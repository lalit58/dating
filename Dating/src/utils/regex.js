import { OS, SCREEN_WIDTH } from "./constants";
import FastImage from "react-native-fast-image";
import { PixelRatio } from "react-native";
export const WP = (widthPercent) => {
  if (widthPercent === 0) return 0;
  if (OS === "android") {
    widthPercent = (widthPercent - 0.5) / 4.6;
  } else {
    widthPercent = (widthPercent - 0.5) / 4;
  }
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
};

export const regex = {
  checkResizeMode: (type) => {
    switch (type) {
      case "cover":
        return FastImage.resizeMode.cover;
        break;
      case "contain":
        return FastImage.resizeMode.contain;
        break;
      case "stretch":
        return FastImage.resizeMode.stretch;
        break;
      case "center":
        return FastImage.resizeMode.center;
        break;
      default:
        return FastImage.resizeMode.cover;
    }
  },
};

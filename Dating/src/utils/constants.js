import { Dimensions, Platform } from "react-native";

export const getWindow = Dimensions.get("window");
export const SCREEN_WIDTH = getWindow.width;
export const SCREEN_HEIGHT = getWindow.height;
export const itemSpace10 = 10;
export const PADDING = 15;
export const { OS } = Platform;

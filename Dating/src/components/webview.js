import { View, Text } from "react-native";
import React from "react";
import WebView from "react-native-webview";

const WebviewContent = () => {
  return (
    <WebView
      source={{ uri: "https://lalitsoren.vercel.app/" }}
      style={{ flex: 1 }}
    />
  );
};

export default WebviewContent;

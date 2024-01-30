import React, { useEffect, useRef, useState } from "react";
import FastImage from "react-native-fast-image";
import { regex } from "../utils/regex";

const ImageView = ({ style, uri, resizeMode, onLoadEnd, backColor }) => {
  console.log(uri);
  const [Url, setUrl] = useState("");
  const ColorArray = [
    "#FEF8F5",
    "#FFF7FA",
    "#F7F5F4",
    "#F5F8F5",
    "#F5F7FD",
    "#F7F5F4",
  ];
  const randomColor = ColorArray[Math.floor(Math.random() * ColorArray.length)];
  useEffect(() => {
    let imageUrl = "";
    if (uri) setUrl(imageUrl);
    else
      imageUrl =
        "https://imgs.search.brave.com/954MvGs9LVvn7vjhX1Xzts802Wy2qMiLb5E3r6KHm9M/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAzLzE1LzE4LzA5/LzM2MF9GXzMxNTE4/MDkzMl9yaGlYRnJK/TjI3elhDQ2RyZ3g4/VjVHV2JMZDl6VEhI/QS5qcGc";
    setUrl(imageUrl);
  }, [uri]);
  return (
    <FastImage
      style={[
        style,
        { backgroundColor: !backColor ? "transparent" : randomColor },
      ]}
      source={{
        uri: Url,
        priority: FastImage.priority.normal,
      }}
      resizeMode={
        resizeMode
          ? regex.checkResizeMode(resizeMode)
          : FastImage.resizeMode.cover
      }
      onLoadEnd={onLoadEnd}
    />
  );
};

export default ImageView;

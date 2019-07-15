import React, { useState, useEffect } from "react";
import { Image, Dimensions } from "react-native";

const FullscreenImage = ({ uri }) => {
  const [imageSize, setImageSize] = useState({ width: null, height: 200 });

  useEffect(
    () =>
      Image.getSize(uri, (width, height) => {
        // calculate image width and height
        const screenWidth = Dimensions.get("screen").width - 8 * 2;
        const scaleFactor = width / screenWidth;
        const imageHeight = height / scaleFactor;
        setImageSize({ width: screenWidth, height: imageHeight });
      }),
    []
  );

  return (
    <Image
      resizeMode="contain"
      style={{
        ...imageSize,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 4
      }}
      source={{ uri }}
    />
  );
};

export default FullscreenImage;

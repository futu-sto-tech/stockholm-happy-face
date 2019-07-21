import React, { useEffect, useRef } from 'react'
import { Animated, Image, Dimensions } from 'react-native'

import { useIsMounted } from '../lib/utils'

const FullscreenImage = ({ uri }) => {
  const isMounted = useIsMounted()
  const imageWidth = Dimensions.get('screen').width - 8 * 2
  const imageHeight = useRef(new Animated.Value(200)).current

  useEffect(() => {
    Image.getSize(uri, (width, height) => {
      if (isMounted.current) {
        const scaleFactor = width / imageWidth
        const realImageHeight = height / scaleFactor

        Animated.timing(imageHeight, {
          toValue: realImageHeight,
          duration: 250,
        }).start()
      }
    })
  }, [uri])

  return (
    <Animated.Image
      resizeMode="contain"
      style={{
        width: imageWidth,
        height: imageHeight,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 4,
      }}
      source={{ uri }}
    />
  )
}

export default FullscreenImage

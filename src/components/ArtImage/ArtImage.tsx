import React, { useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  Animated,
} from 'react-native';

interface Props {
  url: string;
  width?: string | number;
  height?: string | number;
  resizeMode?: string;
}

const FIXED_SIZE = 150;

export default function ArtImage({
  url,
  width = '100%',
  height = FIXED_SIZE,
  resizeMode = 'cover',
}: Props) {
  const [loading, setLoading] = useState(true);
  const [opacity] = useState(new Animated.Value(0));

  const dimensionStyles = {
    width,
    height,
  };

  const loadingPlaceholder = loading && (
    <View style={[styles.placeholder, dimensionStyles]}>
      <ActivityIndicator size="small" color="#b3e5fc" />
    </View>
  );

  const fadeInStyles = {
    opacity,
  };

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setLoading(false);
  };

  return (
    <>
      <Animated.Image
        style={[dimensionStyles, fadeInStyles]}
        resizeMode={resizeMode}
        source={{ uri: url }}
        onLoadEnd={onLoad}
      />
      {loadingPlaceholder}
    </>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    position: 'absolute',
    justifyContent: 'center',
  },
});

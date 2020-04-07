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
}

const FIXED_SIZE = 150;

export default function ArtListImage({ url }: Props) {
  const [loading, setLoading] = useState(true);
  const [opacity] = useState(new Animated.Value(0));

  const loadingPlaceholder = loading && (
    <View style={styles.placeholder}>
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
        style={[fadeInStyles, styles.image]}
        resizeMode="cover"
        source={{ uri: url }}
        onLoadEnd={onLoad}
      />
      {loadingPlaceholder}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: FIXED_SIZE,
  },
  placeholder: {
    position: 'absolute',
    width: '100%',
    height: FIXED_SIZE,
    justifyContent: 'center',
  },
});

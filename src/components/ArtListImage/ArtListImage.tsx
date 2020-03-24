import React, {useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, View, Image} from 'react-native';

interface Props {
  url: string;
}

const FIXED_SIZE = 150;

export default function ArtListImage({url}: Props) {
  const [loading, setLoading] = useState(true);

  const loadingPlaceholder = loading && (
    <View style={styles.placeholder}>
      <ActivityIndicator size="small" color="#b3e5fc" />
    </View>
  );

  return (
    <>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{uri: url}}
        onLoadEnd={() => setLoading(false)}
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

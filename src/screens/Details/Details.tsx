import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  SafeAreaView,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';

import { fetchArtDetails } from '../../services/api';
import { fontSize, spacing } from '../../styles/styles';
import SafeViewAndroid from '../../utilities/AndroidSafeArea';
import ArtImage from '../../components/ArtImage/ArtImage';

export default function Details({ route }) {
  const [artDetails, setArtDetails] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { objectNumber } = route.params;

  useEffect(() => {
    let cancelled = false;
    async function fetchDetails() {
      setLoading(true);

      const details = await fetchArtDetails({ objectNumber });

      if (!cancelled) {
        setArtDetails(details.artObject);
        setLoading(false);
      }
    }
    fetchDetails();

    return () => {
      cancelled = true;
    };
  }, [objectNumber]);

  const renderArtDetails = () => {
    if (loading || !artDetails) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b3e5fc" />
        </View>
      );
    }

    const title = artDetails.title || '';
    const artist = artDetails.principalMaker || '';
    const {
      webImage: { url, width, height },
    } = artDetails;

    const imageHeight = (Dimensions.get('window').width * height) / width;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={[styles.text, styles.textHeading]}>{title}</Text>
          <Text style={styles.text}>{artist}</Text>
        </View>
        <Text style={styles.text}>{artDetails.plaqueDescriptionEnglish}</Text>
        <ArtImage url={url} resizeMode="contain" height={imageHeight} />
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      {renderArtDetails()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  text: {
    paddingLeft: spacing(1),
    paddingRight: spacing(1),
    paddingBottom: spacing(1),
  },
  textHeading: {
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
  },
});

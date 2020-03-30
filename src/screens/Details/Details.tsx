import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  SafeAreaView,
  Text,
} from 'react-native';

import { fetchArtDetails } from '../../services/api';
import SafeViewAndroid from '../../utilities/AndroidSafeArea';

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
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#b3e5fc" />
        </View>
      );
    }

    const title = artDetails.title || '';
    return <Text>Details page: {title}</Text>;
  };

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      {renderArtDetails()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

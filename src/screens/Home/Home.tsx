import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, View, FlatList } from 'react-native';

import { fetchArtList } from '../../services/api';
import ArtListImage from '../../components/ArtListImage/ArtListImage';

export default function Home() {
  const [artList, setArtList] = useState([]);

  useEffect(() => {
    async function fetchList() {
      const list = await fetchArtList();
      setArtList(list.artObjects);
    }
    fetchList();
  }, []);

  const renderArtItem = ({ item }) => {
    const { id, webImage } = item;

    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <ArtListImage key={id} url={webImage.url} />
      </View>
    );
  };

  const renderArtList = () => {
    if (!artList.length) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#b3e5fc" />
        </View>
      );
    }
    return (
      <FlatList
        numColumns={3}
        renderItem={renderArtItem}
        data={artList}
      ></FlatList>
    );
  };

  return renderArtList();
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

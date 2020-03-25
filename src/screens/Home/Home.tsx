import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  TextInput,
  SafeAreaView,
  Text,
} from 'react-native';

import { fetchArtList } from '../../services/api';
import ArtListImage from '../../components/ArtListImage/ArtListImage';
import SafeViewAndroid from '../../utilities/AndroidSafeArea';

export default function Home() {
  const [artList, setArtList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function fetchList() {
      setLoading(true);

      const list = await fetchArtList({ search: searchTerm });

      if (!cancelled) {
        setArtList(list.artObjects);
        setLoading(false);
      }
    }
    fetchList();

    return () => {
      cancelled = true;
    };
  }, [searchTerm]);

  const renderArtItem = ({ item }) => {
    const { id, webImage } = item;

    if (!webImage) {
      return null;
    }

    return (
      <View key={id} style={{ flex: 1, flexDirection: 'row' }}>
        <ArtListImage url={webImage.url} />
      </View>
    );
  };

  const renderArtList = () => {
    const loadingIndicator = loading && (
      <View
        style={{
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <ActivityIndicator size="small" color="#b3e5fc" />
      </View>
    );

    const searchField = (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{
            flex: 1,
            height: 40,
            padding: 10,
          }}
          value={searchTerm}
          placeholder="Search (ex. landscape)"
          onChangeText={text => setSearchTerm(text)}
        />
        {loadingIndicator}
      </View>
    );

    const emptyState = !loading && (
      <View style={styles.container}>
        <Text>No results</Text>
      </View>
    );

    return (
      <FlatList
        ListHeaderComponent={searchField}
        ListEmptyComponent={emptyState}
        numColumns={3}
        renderItem={renderArtItem}
        data={artList}
        refreshing={loading}
      />
    );
  };

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      {renderArtList()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

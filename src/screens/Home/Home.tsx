import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  TextInput,
  SafeAreaView,
  Text,
  TouchableHighlight,
} from 'react-native';

import { fetchArtList } from '../../services/api';
import ArtListImage from '../../components/ArtListImage/ArtListImage';
import SafeViewAndroid from '../../utilities/AndroidSafeArea';
import { shortenString } from '../../utilities/utilities';
import { spacing } from '../../styles/styles';

export default function Home({ navigation }) {
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

  const onPressArtItem = ({ objectNumber, title }) => {
    navigation.push('Details', { objectNumber, title });
  };

  const renderArtItem = ({ item }) => {
    const { objectNumber, webImage, title } = item;

    if (!webImage) {
      return null;
    }

    const shortenedTitle = shortenString(title);

    return (
      <TouchableHighlight
        key={objectNumber}
        onPress={() => onPressArtItem({ objectNumber, title: shortenedTitle })}
        style={styles.listImageTouchable}
      >
        <ArtListImage url={webImage.url} />
      </TouchableHighlight>
    );
  };

  const renderArtList = () => {
    const loadingIndicator = loading && (
      <View style={styles.listLoadingContainer}>
        <ActivityIndicator size="small" color="#b3e5fc" />
      </View>
    );

    const searchField = (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchText}
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
  listLoadingContainer: {
    paddingLeft: spacing(),
    paddingRight: spacing(),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    flex: 1,
    height: 40,
    padding: spacing(),
  },
  listImageTouchable: {
    flex: 1,
    flexDirection: 'row',
  },
});

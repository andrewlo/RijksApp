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
  Button,
} from 'react-native';

import { fetchArtList } from '../../services/api';
import ArtImage from '../../components/ArtImage/ArtImage';
import SafeViewAndroid from '../../utilities/AndroidSafeArea';
import { shortenString } from '../../utilities/utilities';
import { usePrevious } from '../../utilities/hooks';
import { spacing } from '../../styles/styles';

const PAGE_SIZE = 15;

export default function Home({ navigation }) {
  const [artList, setArtList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const prevSearchTerm = usePrevious(searchTerm);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    let cancelled = false;
    async function fetchList() {
      setLoading(true);

      const searchTermChanged = searchTerm !== prevSearchTerm;

      if (searchTermChanged) {
        setPageNum(1);
        setArtList([]);
      }
      const pageNumParam = searchTermChanged ? 1 : pageNum;

      const listData = await fetchArtList({
        search: searchTerm,
        pageNum: pageNumParam,
        pageSize: PAGE_SIZE,
      });

      if (!cancelled) {
        if (searchTermChanged) {
          setArtList(listData.artObjects);
        } else {
          setArtList([...artList, ...listData.artObjects]);
        }
        setHasNextPage(listData.count > pageNum * PAGE_SIZE);
        setLoading(false);
      }
    }
    fetchList();

    return () => {
      cancelled = true;
    };
  }, [searchTerm, pageNum]);

  const onPressArtItem = ({ objectNumber, title }) => {
    navigation.push('Details', { objectNumber, title });
  };

  const onLoadMore = () => {
    if (hasNextPage) {
      setPageNum(pageNum + 1);
    }
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
        <ArtImage url={webImage.url} />
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

    const loadMoreSpinner = hasNextPage && (
      <ActivityIndicator style={{ paddingTop: spacing() }} color="#b3e5fc" />
    );

    return (
      <FlatList
        ListHeaderComponent={searchField}
        ListEmptyComponent={emptyState}
        ListFooterComponent={loadMoreSpinner}
        numColumns={3}
        renderItem={renderArtItem}
        data={artList}
        refreshing={loading}
        onEndReached={onLoadMore}
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

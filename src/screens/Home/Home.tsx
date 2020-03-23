import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';

import {fetchArtList} from '../../services/api';
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

  const renderArtItem = ({item}) => {
    console.log('item', item)
    const {id, webImage} = item;

    return (
      <View style={{flex: 1, flexDirection: 'row'}} key={id}>
        <ArtListImage url={webImage.url} />
      </View>
    );
  };

  const renderArtList = () => {
    if (!artList.length) {
      return <Text>Loading...</Text>;
    }
    return <FlatList renderItem={renderArtItem} data={artList}></FlatList>;
  }

  return (
    <View style={styles.container}>
      {renderArtList()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

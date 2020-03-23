import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

interface Props {
  url: string;
}

export default function ArtListImage({url}: Props) {
  return (
    <Image
      style={{width: '100%', height: 200, alignSelf: 'center'}}
      source={{uri: url}}
    />
  );
}
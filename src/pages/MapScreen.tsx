import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { Map } from '../components/Map';

export const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

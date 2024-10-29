import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
      <Text style={{position: 'absolute', bottom: 0, right: 0, fontSize: 53}}>WAHGAN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    opacity: 0.3
  },
});

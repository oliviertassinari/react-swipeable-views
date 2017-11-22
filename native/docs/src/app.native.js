import React from 'react';
import { AppRegistry, StyleSheet, ScrollView, StatusBar } from 'react-native';
import Main from './Main.native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
  },
});

function App() {
  return (
    <ScrollView style={styles.root}>
      <StatusBar backgroundColor="#0F3D6C" translucent barStyle="light-content" />
      <Main />
    </ScrollView>
  );
}

export default {
  start() {
    AppRegistry.registerComponent('SwipeableViewsDocs', () => App);
  },
};

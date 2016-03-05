import React, {
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SwipeableViews from '../../src/index.native';
import Head from './Head.native';
import Demo from './Demo.native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
  },
  slide: {
    padding: 15,
    height: 100,
  },
  slide1: {
    backgroundColor: '#FEA900',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});

class Main extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Head
          name="React swipeable views"
          description="A React component for swipeable views"
        />
        <Demo
          name="Demo 1"
          description="Simple case without header."
        >
          <SwipeableViews>
            <View style={[styles.slide, styles.slide1]}>
              <Text style={styles.text}>
                slide n°1
              </Text>
            </View>
            <View style={[styles.slide, styles.slide2]}>
              <Text style={styles.text}>
                slide n°2
              </Text>
            </View>
            <View style={[styles.slide, styles.slide3]}>
              <Text style={styles.text}>
                slide n°3
              </Text>
            </View>
          </SwipeableViews>
        </Demo>
      </View>
    );
  }
}

export default Main;

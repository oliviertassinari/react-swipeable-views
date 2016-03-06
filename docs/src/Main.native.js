import React, {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';

import SwipeableViews from '../../src/index.native.animated';
import Head from './Head.native';
import Body from './Body.native';
import Demo from './Demo.native';
import Demo2 from './Demo2.native';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
  },
  slideContainer: {
    height: 100,
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
  divider: {
    height: 50,
  },
});

const list = [];

for (let i = 0; i < 30; i++) {
  list.push(
    <View key={i}>
      <Text style={styles.text}>
        {`item n°${i + 1}`}
      </Text>
    </View>
  );
}

const Main = () => (
  <ScrollView style={styles.root}>
    <StatusBar
      backgroundColor="#0F3D6C"
      translucent={true}
      barStyle="light-content"
    />
    <Head
      name="React swipeable views"
      description="A React component for swipeable views"
    />
    <Body>
      <Demo
        name="Demo 1"
        description="Simple case without header."
      >
        <SwipeableViews containerStyle={styles.slideContainer}>
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
      <Demo
        name="Demo 2"
        description="Now, let's add a header."
      >
        <Demo2 styles={styles} />
      </Demo>
      <Demo
        name="Demo 3"
        description="Set a constant height and let the swipe and scroll behavior work in harmony."
      >
        <SwipeableViews containerStyle={styles.slideContainer}>
          <ScrollView style={[styles.slide, styles.slide1]}>
            {list}
          </ScrollView>
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
      <Demo
        name="Demo 4"
        description="Or let the container respond dynamically to its children."
      >
        <SwipeableViews>
          <View style={[styles.slide, styles.slide1]}>
            {list.slice(0, 10)}
          </View>
          <View style={[styles.slide, styles.slide2]}>
            {list.slice(0, 7)}
          </View>
          <View style={[styles.slide, styles.slide3]}>
            {list.slice(0, 3)}
          </View>
        </SwipeableViews>
      </Demo>
      <Demo
        name="Demo 5"
        description="Add a resistance bounds effet on the edges."
      >
        <SwipeableViews containerStyle={styles.slideContainer} resistance={true}>
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
      <Demo
        name="Demo 6"
        description="You can also nest this component."
      >
        <SwipeableViews containerStyle={styles.slideContainer}>
          <View style={[styles.slide, styles.slide1]}>
            <Text style={styles.text}>
              slide n°1
            </Text>
            <View style={styles.divider} />
            <SwipeableViews resistance={true}>
              <View style={[styles.slide, styles.slide2]}>
                <Text style={styles.text}>
                  slide n°1
                </Text>
              </View>
              <View style={[styles.slide, styles.slide3]}>
                <Text style={styles.text}>
                  slide n°2
                </Text>
              </View>
            </SwipeableViews>
          </View>
          <View style={[styles.slide, styles.slide2]}>
            <Text style={styles.text}>
              slide n°2
            </Text>
          </View>
        </SwipeableViews>
      </Demo>
    </Body>
  </ScrollView>
);

export default Main;

import React, {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';

import Head from './Head.native';
import Body from './Body.native';
import Demo from './Demo/Demo.native';
import Demo1 from './Demo/Demo1.native';
import Demo2 from './Demo/Demo2.native';
import Demo3 from './Demo/Demo3.native';
import Demo4 from './Demo/Demo4.native';
import Demo5 from './Demo/Demo5.native';
import Demo6 from './Demo/Demo6.native';

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
        <Demo1 styles={styles} />
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
        <Demo3 styles={styles} list={list} />
      </Demo>
      <Demo
        name="Demo 4"
        description="Or let the container respond dynamically to its children."
      >
        <Demo4 styles={styles} list={list} />
      </Demo>
      <Demo
        name="Demo 5"
        description="Add a resistance bounds effet on the edges."
      >
        <Demo5 styles={styles} />
      </Demo>
      <Demo
        name="Demo 6"
        description="You can also nest this component."
      >
        <Demo6 styles={styles} />
      </Demo>
    </Body>
  </ScrollView>
);

export default Main;

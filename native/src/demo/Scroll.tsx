import * as React from 'react';
import { View, ScrollView } from 'react-native';
import SwipeableViews from '../../packages/react-swipeable-views-native/src/SwipeableViews.scroll';
import { Headline } from 'react-native-paper';
import styles from '../styles';

const list: any = [];

for (let i = 0; i < 30; i += 1) {
  list.push(
    <View key={i}>
      <Headline style={styles.text}>{`item n°${i + 1}`}</Headline>
    </View>,
  );
}

class DemoScroll extends React.Component<{}> {
  static title = "Scroll";
  static description = "Set a constant height and let the swipe and scroll behavior work in harmony";

  render() {
    return (
      <SwipeableViews>
        <ScrollView
          style={styles.slide1}
          contentContainerStyle={styles.slideContainer}
          horizontal={false}
          directionalLockEnabled={true}
        >
          {list}
        </ScrollView>
        <View style={[styles.slide, styles.slide2]}>
          <Headline style={styles.text}>slide n°2</Headline>
        </View>
        <View style={[styles.slide, styles.slide3]}>
          <Headline style={styles.text}>slide n°3</Headline>
        </View>
      </SwipeableViews>
    );
  }
}

export default DemoScroll;

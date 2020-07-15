import * as React from 'react';
import { View } from 'react-native';
import SwipeableViews from '../../packages/react-swipeable-views-native/src';
import { Headline } from 'react-native-paper';
import styles from '../styles';

class DemoResistance extends React.Component<{}> {
  static title = "Resistance";
  static description = "With a resistance bounds effet on the edges";

  render() {
    return (
      <SwipeableViews resistance>
        <View style={[styles.slide, styles.slide1]}>
          <Headline style={styles.text}>slide n°1</Headline>
        </View>
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

export default DemoResistance;

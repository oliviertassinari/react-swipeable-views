import * as React from 'react';
import { View } from 'react-native';
import SwipeableViews from '../../packages/react-swipeable-views-native/src';
import { virtualize, autoPlay } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import { Title } from 'react-native-paper';
import styles from '../styles';

const EnhancedSwipeableViews = autoPlay(virtualize(SwipeableViews));

function slideRenderer(params) {
  const { index, key } = params;
  let style;

  switch (mod(index, 3)) {
    case 0:
      style = styles.slide1;
      break;

    case 1:
      style = styles.slide2;
      break;

    case 2:
      style = styles.slide3;
      break;

    default:
      break;
  }

  return (
    <View style={[styles.slide, style]} key={key}>
      <Title style={styles.text}>{`slide n°${index + 1}`}</Title>
    </View>
  );
}

class DemoHocs extends React.Component<{}> {
  static title = "Hocs";
  static description = "With all the HOCs";

  render() {
    return <EnhancedSwipeableViews slideCount={10} slideRenderer={slideRenderer} />;
  }
}

export default DemoHocs;

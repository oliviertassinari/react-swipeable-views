import * as React from 'react';
import { View } from 'react-native';
import SwipeableViews from '../../packages/react-swipeable-views-native/src';
import { autoPlay } from 'react-swipeable-views-utils';
import Pagination from '../pagination/Pagination';
import { Title } from 'react-native-paper';
import styles from '../styles';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

class DemoAutoPlay extends React.Component<{}, {index: number}> {
  static title = "Auto play";
  static description = "With the auto play HOC";

  state = {
    index: 0,
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  render() {
    const { index } = this.state;

    return (
      <View style={styles.screen}>
        <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
          <View style={[styles.slide, styles.slide1]}>
            <Title style={styles.text}>slide n°1</Title>
          </View>
          <View style={[styles.slide, styles.slide2]}>
            <Title style={styles.text}>slide n°2</Title>
          </View>
          <View style={[styles.slide, styles.slide3]}>
            <Title style={styles.text}>slide n°3</Title>
          </View>
        </AutoPlaySwipeableViews>
        <Pagination dots={3} index={index} onChangeIndex={this.handleChangeIndex} />
      </View>
    );
  }
}

export default DemoAutoPlay;

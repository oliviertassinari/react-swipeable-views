import * as React from 'react';
import { View } from 'react-native';
import { Headline, Appbar } from 'react-native-paper';
import SwipeableViews from '../../packages/react-swipeable-views-native/src';
import styles from '../styles';
import NavButtom from '../pagination/NavButtom';

class DemoTabs extends React.Component {
  static title = "Tabs";
  static description = "With a header";

  state = {
    index: 0,
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  handleSwitching = (index, type) => {
    if (type === "end" && index !== this.state.index) {
      this.setState({
        index,
      });
    }
  }

  render() {
    const { index } = this.state;

    return (
      <View style={styles.container}>
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex} onSwitching={this.handleSwitching}>
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
        <Appbar style={[styles.toolbar, styles.nav]}>
          <NavButtom
            title="tab n°1"
            onPress={() => this.handleChangeIndex(0)}
            selected={index === 0}
          />
          <NavButtom
            title="tab n°2"
            onPress={() => this.handleChangeIndex(1)}
            selected={index === 1}
          />
          <NavButtom
            title="tab n°3"
            onPress={() => this.handleChangeIndex(2)}
            selected={index === 2}
          />
        </Appbar>
      </View>
    );
  }
}

export default DemoTabs;

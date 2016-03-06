import React, {
  Component,
  Text,
  View,
} from 'react-native';
import Button from 'react-native-button';

import SwipeableViews from '../../src/index.native.animated';

class Demo2 extends Component {
  static propTypes = {
    styles: React.PropTypes.object,
  };

  state = {
    index: 0,
  };

  handleChangeTabs = (value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = (index) => {
    this.setState({
      index: index,
    });
  };

  render() {
    const {
      index,
    } = this.state;

    const {
      styles,
    } = this.props;

    return (
      <View>
        <Button
          style={index === 0 && {color: 'green'}}
          onPress={this.handleChangeTabs.bind(null, 0)}
        >
          tab n°1
        </Button>
        <Button
          style={index === 1 && {color: 'green'}}
          onPress={this.handleChangeTabs.bind(null, 1)}
        >
          tab n°2
        </Button>
        <Button
          style={index === 2 && {color: 'green'}}
          onPress={this.handleChangeTabs.bind(null, 2)}
        >
          tab n°3
        </Button>
        <SwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
          containerStyle={styles.slideContainer}
        >
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
      </View>
    );
  }
}

export default Demo2;

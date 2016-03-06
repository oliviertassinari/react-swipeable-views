import React, {
  Component,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import Button from 'react-native-button';

import SwipeableViews from '../../src/index.native';
import Head from './Head.native';
import Body from './Body.native';
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
  divider: {
    height: 50,
  },
});

class Main extends Component {
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

    return (
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
          <Demo
            name="Demo 2"
            description="Now, let's add a header."
          >
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
            </View>
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
            <SwipeableViews resistance={true}>
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
            <SwipeableViews>
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
  }
}

export default Main;

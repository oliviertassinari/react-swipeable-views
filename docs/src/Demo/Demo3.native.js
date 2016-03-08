import React, {
  Text,
  View,
  ScrollView,
} from 'react-native';

import SwipeableViews from '../../../src/index.native.animated';

const Demo3 = (props) => {
  const {
    list,
    styles,
  } = props;

  return (
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
  );
};

Demo3.propTypes = {
  list: React.PropTypes.array.isRequired,
  styles: React.PropTypes.object.isRequired,
};

export default Demo3;

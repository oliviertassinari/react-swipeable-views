import React, {
  Text,
  View,
} from 'react-native';

import SwipeableViews from '../../../src/index.native.animated';

const Demo6 = (props) => {
  const {
    styles,
  } = props;

  return (
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
  );
};

Demo6.propTypes = {
  styles: React.PropTypes.object.isRequired,
};

export default Demo6;

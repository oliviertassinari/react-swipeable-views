import React, {
  View,
} from 'react-native';

import SwipeableViews from '../../../src/index.native.animated';

const Demo4 = (props) => {
  const {
    list,
    styles,
  } = props;

  return (
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
  );
};

Demo4.propTypes = {
  list: React.PropTypes.array.isRequired,
  styles: React.PropTypes.object.isRequired,
};

export default Demo4;

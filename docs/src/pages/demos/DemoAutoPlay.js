import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Pagination from 'docs/src/modules/components/Pagination';
import SupportTouch from 'docs/src/modules/components/SupportTouch';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const styles = {
  root: {
    position: 'relative',
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
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
};

class DemoAutoPlay extends React.Component {
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
      <SupportTouch>
        <div style={styles.root}>
          <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>slide n°1</div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>slide n°2</div>
            <div style={Object.assign({}, styles.slide, styles.slide3)}>slide n°3</div>
          </AutoPlaySwipeableViews>
          <Pagination dots={3} index={index} onChangeIndex={this.handleChangeIndex} />
        </div>
      </SupportTouch>
    );
  }
}

export default DemoAutoPlay;

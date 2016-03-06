import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import SwipeableViews from '../../src/index';

class Demo2 extends React.Component {
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
      <div>
        <Tabs value={index}>
          <Tab label="tab n°1" value={0} onClick={this.handleChangeTabs.bind(null, 0)} />
          <Tab label="tab n°2" value={1} onClick={this.handleChangeTabs.bind(null, 1)} />
          <Tab label="tab n°3" value={2} onClick={this.handleChangeTabs.bind(null, 2)} />
        </Tabs>
        <SwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
          containerStyle={styles.slideContainer}
        >
          <div style={Object.assign({}, styles.slide, styles.slide1)}>
            slide n°1
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide2)}>
            slide n°2
          </div>
          <div style={Object.assign({}, styles.slide, styles.slide3)}>
            slide n°3
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default Demo2;

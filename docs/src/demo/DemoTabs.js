// @flow weak

import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { LabelCheckbox } from 'material-ui/Checkbox';
import SwipeableViews from 'react-swipeable-views';

const styles = {
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

class DemoTabs extends Component {
  state = {
    index: 0,
  };

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  render() {
    const {
      index,
    } = this.state;

    return (
      <MuiThemeProvider>
        <div>
          <Tabs index={index} fullWidth onChange={this.handleChange}>
            <Tab label="tab n°1" />
            <Tab label="tab n°2" />
            <Tab label="tab n°3" />
          </Tabs>
          <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
              slide n°1
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
              slide n°2
              <br />
              <br />
              <LabelCheckbox label="test event propagation" />
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide3)}>
              slide n°3
            </div>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default DemoTabs;

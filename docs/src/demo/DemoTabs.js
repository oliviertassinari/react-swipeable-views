// @flow weak

import React, { Component } from 'react';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Checkbox from 'material-ui/Checkbox';
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

  handleChangeTabs = (value) => () => {
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
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <Tabs value={index}>
            <Tab label="tab n°1" value={0} onClick={this.handleChangeTabs(0)} />
            <Tab label="tab n°2" value={1} onClick={this.handleChangeTabs(1)} />
            <Tab label="tab n°3" value={2} onClick={this.handleChangeTabs(2)} />
          </Tabs>
          <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
            <div style={Object.assign({}, styles.slide, styles.slide1)}>
              slide n°1
            </div>
            <div style={Object.assign({}, styles.slide, styles.slide2)}>
              slide n°2
              <br />
              <br />
              <Checkbox label="test event propagation" />
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

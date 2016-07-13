import React, {Component} from 'react';
import Tabs from 'material-ui/Tabs/Tabs';
import Tab from 'material-ui/Tabs/Tab';
import SwipeableViews from 'react-swipeable-views';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Checkbox from 'material-ui/Checkbox';

const styles = {
  slideContainer: {
    height: 100,
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


class Demo2 extends Component {
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

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
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

export default Demo2;

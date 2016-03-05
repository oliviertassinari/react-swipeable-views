import React from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import SwipeableViews from '../../src/index';
import Head from './Head';
import Demo from './Demo';

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
  divider: {
    height: 50,
  },
};

class Main extends React.Component {
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
        <div key={i}>
          {`item n°${i + 1}`}
        </div>
      );
    }

    return (
      <div>
        <Head
          name="React swipeable views"
          description="A React component for swipeable views"
        >
          <a className="btn" href="https://github.com/oliviertassinari/react-swipeable-views">
            View on GitHub
          </a>
        </Head>
        <section className="main-content">
          <Demo
            name="Demo 1"
            description="Simple case without header."
          >
            <SwipeableViews containerStyle={styles.slideContainer}>
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
          </Demo>
          <Demo
            name="Demo 2"
            description="Now, let's add a header."
          >
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
          </Demo>
          <Demo
            name="Demo 3"
            description="Set a constant height and let the swipe and scroll behavior work in harmony."
          >
            <SwipeableViews containerStyle={styles.slideContainer}>
              <div style={Object.assign({}, styles.slide, styles.slide1)}>
                {list}
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide2)}>
                slide n°2
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide3)}>
                slide n°3
              </div>
            </SwipeableViews>
          </Demo>
          <Demo
            name="Demo 4"
            description="Or let the container respond dynamically to its children."
          >
            <SwipeableViews>
              <div style={Object.assign({}, styles.slide, styles.slide1)}>
                {list.slice(0, 10)}
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide2)}>
                {list.slice(0, 7)}
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide3)}>
                {list.slice(0, 3)}
              </div>
            </SwipeableViews>
          </Demo>
          <Demo
            name="Demo 5"
            description="Add a resistance bounds effet on the edges."
          >
            <SwipeableViews containerStyle={styles.slideContainer} resistance={true}>
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
          </Demo>
          <Demo
            name="Demo 6"
            description="You can also nest this component."
          >
            <SwipeableViews containerStyle={{}}>
              <div style={Object.assign({}, styles.slide, styles.slide1)}>
                slide n°1
                <div style={styles.divider} />
                <SwipeableViews containerStyle={styles.slideContainer}>
                  <div style={Object.assign({}, styles.slide, styles.slide2)}>
                    nested slide n°1
                  </div>
                  <div style={Object.assign({}, styles.slide, styles.slide3)}>
                    nested slide n°2
                  </div>
                </SwipeableViews>
              </div>
              <div style={Object.assign({}, styles.slide, styles.slide2)}>
                slide n°2
              </div>
            </SwipeableViews>
          </Demo>
          <footer className="site-footer">
            <span className="site-footer-owner">
              <a href="https://github.com/oliviertassinari/react-swipeable-views">
                React-swipeable-views
              </a>
              {' is maintained by '}
              <a href="https://github.com/oliviertassinari">oliviertassinari</a>.
            </span>
            <span className="site-footer-credits">
              {'This page was generated by '}
              <a href="https://pages.github.com">
                GitHub Pages
              </a>
              {' using the '}
              <a href="https://github.com/jasonlong/cayman-theme">Cayman theme</a>
              {' by '}
              <a href="https://twitter.com/jasonlong">Jason Long</a>.
            </span>
          </footer>
        </section>
      </div>
    );
  }
}

export default Main;

import React from 'react';
import SwipeableViews from '../../src/index';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

require('normalize.less');
require('stylesheet.less');
require('github-light.less');

const supportsTouch = 'ontouchstart' in window;

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
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
  slide3: {
    background: '#6AC0FF',
  },
  divider: {
    height: 50,
  },
};

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleChangeTabs = this.handleChangeTabs.bind(this);

    this.state = {
      index: 0,
    };
  }

  renderSupportsTouch() {
    return (
      !supportsTouch && <span className="pl-id">
        <br />You need a touch device to swipe between the 3 slides.
      </span>
    );
  }

  handleChangeTabs(value) {
    this.setState({
      index: value,
    });
  }

  handleChangeIndex(index) {
    this.setState({
      index: index,
    });
  }

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
        <section className="page-header">
          <h1 className="project-name">React swipeable views</h1>
          <h2 className="project-tagline">A React component for swipeable views</h2>
          <a className="btn" href="https://github.com/oliviertassinari/react-swipeable-views">
            View on GitHub
          </a>
        </section>

        <section className="main-content">

          <h3>Demo 1</h3>
          <p>
            Simple case without header.
            {this.renderSupportsTouch()}
          </p>
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

          <h3>Demo 2</h3>
          <p>
            Now, let's add a header.
            {this.renderSupportsTouch()}
          </p>
          <Tabs onChange={this.handleChangeTabs} value={index}>
            <Tab label="tab n°1" value={0} />
            <Tab label="tab n°2" value={1} />
            <Tab label="tab n°3" value={2} />
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

          <h3>Demo 3</h3>
          <p>
            Set a constant height and let the swipe and scroll behavior work in harmony.
            {this.renderSupportsTouch()}
          </p>
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

          <h3>Demo 4</h3>
          <p>
            Or let the container respond dynamically to its children.
            {this.renderSupportsTouch()}
          </p>
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

          <h3>Demo 5</h3>
          <p>
            Add a resistance bounds effet on the edges.
            {this.renderSupportsTouch()}
          </p>
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

          <h3>Demo 6</h3>
          <p>
            You can also nest this component.
            {this.renderSupportsTouch()}
          </p>
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

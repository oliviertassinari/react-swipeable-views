/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Head from './Head';
import Body from './Body';
import Demo from './demo/Demo';
import DemoSimple from './demo/DemoSimple';
import DemoTabs from './demo/DemoTabs';
import DemoScroll from './demo/DemoScroll';
import DemoAnimateHeight from './demo/DemoAnimateHeight';
import DemoResitance from './demo/DemoResitance';
import DemoNested from './demo/DemoNested';
import DemoAutoPlay from './demo/DemoAutoPlay';
import DemoAxis from './demo/DemoAxis';
import DemoKeyboard from './demo/DemoKeyboard';
import DemoVirtualize from './demo/DemoVirtualize';
import DemoHocs from './demo/DemoHocs';
import DemoWidth from './demo/DemoWidth';
import Footer from './Footer';

injectTapEventPlugin();

const Main = () => (
  <div>
    <Head
      name="React swipeable views"
      description="A React component for swipeable views"
    >
      <a className="btn" href="https://github.com/oliviertassinari/react-swipeable-views">
        View on GitHub
      </a>
    </Head>
    <Body>
      <Demo
        name="Demo 1"
        description="A Simple case."
      >
        <DemoSimple />
      </Demo>
      <Demo
        name="Demo 2"
        description="With a header."
      >
        <DemoTabs />
      </Demo>
      <Demo
        name="Demo 3"
        description="Set a constant height and let the swipe and scroll behavior work in harmony."
      >
        <DemoScroll />
      </Demo>
      <Demo
        name="Demo 4"
        description="The container responds dynamically to its children."
      >
        <DemoAnimateHeight />
      </Demo>
      <Demo
        name="Demo 5"
        description="With a resistance bounds effet on the edges."
      >
        <DemoResitance />
      </Demo>
      <Demo
        name="Demo 6"
        description="With nested swipeable-view component."
      >
        <DemoNested />
      </Demo>
      <Demo
        name="Demo 7"
        description="With the auto play HOC."
      >
        <DemoAutoPlay />
      </Demo>
      <Demo
        name="Demo 8"
        description="With the virtualize HOC."
      >
        <DemoVirtualize />
      </Demo>
      <Demo
        name="Demo 9"
        description="Swipe up and down."
      >
        <DemoAxis />
      </Demo>
      <Demo
        name="Demo 10"
        description="With a keyboard binding."
      >
        <DemoKeyboard />
      </Demo>
      <Demo
        name="Demo 11"
        description="With all the HOCs."
      >
        <DemoHocs />
      </Demo>
      <Demo
        name="Demo 12"
        description="Custom width of slides."
      >
        <DemoWidth />
      </Demo>
      <Footer
        maintainerName="oliviertassinari"
        maintainerUrl="https://github.com/oliviertassinari"
        repositoryName="react-swipeable-views"
        repositoryUrl="https://github.com/oliviertassinari/react-swipeable-views"
      />
    </Body>
  </div>
);

export default Main;

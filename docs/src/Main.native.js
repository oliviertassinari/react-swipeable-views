/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {View} from 'react-native';
import Head from './Head.native';
import Body from './Body.native';
import Demo from './demo/Demo.native';
import DemoSimple from './demo/DemoSimple.native';
import DemoTabs from './demo/DemoTabs.native';
import DemoScroll from './demo/DemoScroll.native';
import DemoAnimateHeight from './demo/DemoAnimateHeight.native';
import DemoResitance from './demo/DemoResitance.native';
import DemoNested from './demo/DemoNested.native';
import DemoAutoPlay from './demo/DemoAutoPlay.native';
import DemoVirtualize from './demo/DemoVirtualize.native';
import Footer from './Footer.native';

const Main = () => (
  <View>
    <Head
      name="React swipeable views"
      description="A React component for swipeable views"
    />
    <Body>
      <Demo
        name="Demo 1"
        description="A simple case."
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
      <Footer
        maintainerName="oliviertassinari"
        maintainerUrl="https://github.com/oliviertassinari"
        repositoryName="react-swipeable-views"
        repositoryUrl="https://github.com/oliviertassinari/react-swipeable-views"
      />
    </Body>
  </View>
);

export default Main;

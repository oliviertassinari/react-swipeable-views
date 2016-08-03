/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {View} from 'react-native';

import Head from './Head.native';
import Body from './Body.native';
import Demo from './demo/Demo.native';
import Demo1 from './demo/Demo1.native';
import Demo2 from './demo/Demo2.native';
import Demo3 from './demo/Demo3.native';
import Demo4 from './demo/Demo4.native';
import Demo5 from './demo/Demo5.native';
import Demo6 from './demo/Demo6.native';
import Demo7 from './demo/Demo7.native';
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
        description="Simple case without header."
      >
        <Demo1 />
      </Demo>
      <Demo
        name="Demo 2"
        description="Now, let's add a header."
      >
        <Demo2 />
      </Demo>
      <Demo
        name="Demo 3"
        description="Set a constant height and let the swipe and scroll behavior work in harmony."
      >
        <Demo3 />
      </Demo>
      <Demo
        name="Demo 4"
        description="Or let the container respond dynamically to its children."
      >
        <Demo4 />
      </Demo>
      <Demo
        name="Demo 5"
        description="Add a resistance bounds effet on the edges."
      >
        <Demo5 />
      </Demo>
      <Demo
        name="Demo 6"
        description="You can also nest this component."
      >
        <Demo6 />
      </Demo>
      <Demo
        name="Demo 7"
        description="You can use the auto play HOC."
      >
        <Demo7 />
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

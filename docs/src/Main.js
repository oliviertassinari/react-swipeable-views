/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Head from './Head';
import Body from './Body';
import Demo from './demo/Demo';
import Demo1 from './demo/Demo1';
import Demo2 from './demo/Demo2';
import Demo3 from './demo/Demo3';
import Demo4 from './demo/Demo4';
import Demo5 from './demo/Demo5';
import Demo6 from './demo/Demo6';
import Demo7 from './demo/Demo7';
import Demo8 from './demo/Demo8';
import Demo9 from './demo/Demo9';
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
        <Demo1 />
      </Demo>
      <Demo
        name="Demo 2"
        description="With a header."
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
        description="The container responds dynamically to its children."
      >
        <Demo4 />
      </Demo>
      <Demo
        name="Demo 5"
        description="With a resistance bounds effet on the edges."
      >
        <Demo5 />
      </Demo>
      <Demo
        name="Demo 6"
        description="With nested swipeable-view component."
      >
        <Demo6 />
      </Demo>
      <Demo
        name="Demo 7"
        description="With the auto play HOC."
      >
        <Demo7 />
      </Demo>
      <Demo
        name="Demo 8"
        description="Swipe up and down."
      >
        <Demo8 />
      </Demo>
      <Demo
        name="Demo 9"
        description="With a keyboard binding."
      >
        <Demo9 />
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

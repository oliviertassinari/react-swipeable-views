import React from 'react';

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
import Footer from './Footer';

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
  </div>
);

export default Main;

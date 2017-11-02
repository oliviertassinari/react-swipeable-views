import React from 'react';
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
import DemoRtl from './demo/DemoRtl';
import Footer from './Footer';

function Main() {
  return (
    <div>
      <Head name="React swipeable views" description="A React component for swipeable views">
        <a className="btn" href="https://github.com/oliviertassinari/react-swipeable-views">
          View on GitHub
        </a>
      </Head>
      <Body>
        <Demo name="Simple" description="A Simple case.">
          <DemoSimple />
        </Demo>
        <Demo name="Tabs" description="With a header.">
          <DemoTabs />
        </Demo>
        <Demo
          name="Scroll"
          description="Set a constant height and let the swipe and scroll behavior work in harmony."
        >
          <DemoScroll />
        </Demo>
        <Demo
          name="Animate height"
          description="The container responds dynamically to its children."
        >
          <DemoAnimateHeight />
        </Demo>
        <Demo name="Resitance" description="With a resistance bounds effet on the edges.">
          <DemoResitance />
        </Demo>
        <Demo name="Nested" description="With nested swipeable-view component.">
          <DemoNested />
        </Demo>
        <Demo name="Auto play" description="With the auto play HOC.">
          <DemoAutoPlay />
        </Demo>
        <Demo name="Virtualize" description="With the virtualize HOC.">
          <DemoVirtualize />
        </Demo>
        <Demo name="Axis" description="Swipe up and down.">
          <DemoAxis />
        </Demo>
        <Demo name="Keyboard" description="With a keyboard binding.">
          <DemoKeyboard />
        </Demo>
        <Demo name="Hocs" description="With all the HOCs.">
          <DemoHocs />
        </Demo>
        <Demo name="Custom width" description="Custom width of slides.">
          <DemoWidth />
        </Demo>
        <Demo name="Rtl" description="Right-to-left direction">
          <DemoRtl />
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
}

export default Main;

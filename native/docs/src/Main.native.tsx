import React from 'react';
import { View } from 'react-native';
import Head from './Head.native';
import Body from './Body.native';
import Demo from './demo/Demo.native';
import DemoSimple from './demo/DemoSimple.native';
import DemoTabs from './demo/DemoTabs.native';
import DemoScroll from './demo/DemoScroll.native';
import DemoResitance from './demo/DemoResitance.native';
import DemoAutoPlay from './demo/DemoAutoPlay.native';
import DemoVirtualize from './demo/DemoVirtualize.native';
import DemoHocs from './demo/DemoHocs.native';
import Footer from './Footer.native';

function Main() {
  return (
    <View>
      <Head name="React swipeable views" description="A React component for swipeable views" />
      <Body>
        <Demo name="Simple" description="A simple case.">
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
        <Demo name="Resitance" description="With a resistance bounds effet on the edges.">
          <DemoResitance />
        </Demo>
        <Demo name="Auto play" description="With the auto play HOC.">
          <DemoAutoPlay />
        </Demo>
        <Demo name="Virtualize" description="With the virtualize HOC.">
          <DemoVirtualize />
        </Demo>
        <Demo name="Hocs" description="With all the HOCs.">
          <DemoHocs />
        </Demo>
        <Footer
          maintainerName="yacut"
          maintainerUrl="https://github.com/yacut"
          repositoryName="react-swipeable-views"
          repositoryUrl="https://github.com/oliviertassinari/react-swipeable-views"
        />
      </Body>
    </View>
  );
}

export default Main;

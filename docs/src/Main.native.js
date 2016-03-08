import React, {
  View,
} from 'react-native';

import Head from './Head.native';
import Body from './Body.native';
import Demo from './Demo/Demo.native';
import Demo1 from './Demo/Demo1.native';
import Demo2 from './Demo/Demo2.native';
import Demo3 from './Demo/Demo3.native';
import Demo4 from './Demo/Demo4.native';
import Demo5 from './Demo/Demo5.native';
import Demo6 from './Demo/Demo6.native';

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
    </Body>
  </View>
);

export default Main;

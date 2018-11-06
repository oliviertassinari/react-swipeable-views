import * as React from 'react';
import { FlatList, View } from 'react-native';
import { List, Divider, withTheme } from 'react-native-paper';
import DemoSimple from './demo/Simple';
import DemoTabs from './demo/Tabs';
import DemoScroll from './demo/Scroll';
import DemoResitance from './demo/Resitance';
import DemoAutoPlay from './demo/AutoPlay';
import DemoVirtualize from './demo/Virtualize';
import DemoHocs from './demo/Hocs';
import { Theme } from 'react-native-paper';
import Footer from './Footer';
import styles from './styles';

const pkgInfo = require("../packages/react-swipeable-views-native/package.json");

interface Props {
  theme: Theme;
  navigation: any;
};

export const demos = {
  simple: DemoSimple,
  tabs: DemoTabs,
  scroll: DemoScroll,
  resitance: DemoResitance,
  autoplay: DemoAutoPlay,
  virtualize: DemoVirtualize,
  hocs: DemoHocs,
};

const data = Object.keys(demos).map(id => ({ id, data: demos[id] }));

class Home extends React.Component<Props> {
  _renderItem = ({ item }) => (
    <List.Item
      title={item.data.title}
      description={item.data.description}
      onPress={() => this.props.navigation.navigate(item.id)}
    />
  );

  _keyExtractor = item => item.id;

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={[{ backgroundColor: background }, styles.container]}
          ItemSeparatorComponent={Divider}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          data={data}
        />
        <Footer
          maintainerName="yacut"
          maintainerUrl="https://github.com/yacut"
          repositoryName="react-swipeable-views-native"
          repositoryUrl="https://github.com/oliviertassinari/react-swipeable-views"
          version={pkgInfo.version}
        />
      </View>
    );
  }
}

export default withTheme(Home);
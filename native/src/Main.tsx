import * as React from 'react';
import Home, { demos } from './Home';
import { createStackNavigator } from 'react-navigation';
import { Appbar } from 'react-native-paper';

const routes = Object.keys(demos)
  .map(id => ({ id, item: demos[id] }))
  .reduce((acc, { id, item }) => {
    const Comp = item;
    const Screen = props => <Comp {...props} />;

    Screen.navigationOptions = props => ({
      header: (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => props.navigation.goBack()} />
          <Appbar.Content title={((Comp) as any).title} subtitle={((Comp) as any).description} />
        </Appbar.Header>
      ),
      ...(typeof Comp.navigationOptions === 'function'
        ? Comp.navigationOptions(props)
        : Comp.navigationOptions),
    });

    return {
      ...acc,
      [id]: { screen: Screen },
    };
  }, {});

export default createStackNavigator(
  {
    home: { screen: Home },
    ...routes,
  },
  {
    headerMode: "screen",
    navigationOptions: () => ({
      header: (
        <Appbar.Header>
          <Appbar.Content title="React swipeable views" subtitle="A React component for swipeable views" />
        </Appbar.Header>
      ),
    }),
  }
);

import * as React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import Main from './Main';
import { Provider as PaperProvider } from 'react-native-paper';

export class App extends React.Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
  }

  render () {
    return (
      <PaperProvider>
        <Main />
      </PaperProvider>
    );
  }
}

export default {
  start() {
    AppRegistry.registerComponent('SwipeableViewsDocs', () => App);
  },
};

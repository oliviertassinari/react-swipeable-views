// @flow weak

// Deprecated import
import { bindKeyboard } from 'react-swipeable-views-utils';
import warning from 'warning';

export default function bindKeyboardDeprecated(MyComponent) {
  warning(`react-swipeable-view: you are using the bindKeyboard Higer order Component from the
react-swipeable-view package, please install react-swipeable-view-utils and use the module from this package.
`);

  return bindKeyboard(MyComponent);
}

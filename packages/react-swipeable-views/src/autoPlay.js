// @flow weak

// Deprecated import
import { autoPlay } from 'react-swipeable-views-utils';
import warning from 'warning';

export default function autoPlayDeprecated(MyComponent) {
  warning(`react-swipeable-view: you are using the autoPlay Higer order Component from the
react-swipeable-view package, please install react-swipeable-view-utils and use the module from this package.
`);

  return autoPlay(MyComponent);
}

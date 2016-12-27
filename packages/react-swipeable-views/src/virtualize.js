// @flow weak

// Deprecated import
import { virtualize } from 'react-swipeable-views-utils';
import warning from 'warning';

export default function virtualizeDeprecated(MyComponent) {
  warning(`react-swipeable-view: you are using the virtualize Higer order Component from the
react-swipeable-view package, please install react-swipeable-view-utils and use the module from this package.
`);

  return virtualize(MyComponent);
}

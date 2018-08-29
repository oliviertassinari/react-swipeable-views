# Installation

<p class="description">Install react-swipeable-views.</p>

react-swipeable-views is available as a npm packages.

| Package | Version | Download | Size (kB gzipped) |
|---------|:--------|:---------|:------------------|
| react-swipeable-views | [![npm version](https://img.shields.io/npm/v/react-swipeable-views.svg)](https://www.npmjs.com/package/react-swipeable-views) | [![npm downloads](https://img.shields.io/npm/dm/react-swipeable-views.svg)](https://www.npmjs.com/package/react-swipeable-views) | 5.08 |
| react-swipeable-views-utils | [![npm version](https://img.shields.io/npm/v/react-swipeable-views-utils.svg)](https://www.npmjs.com/package/react-swipeable-views-utils) | [![npm downloads](https://img.shields.io/npm/dm/react-swipeable-views-utils.svg)](https://www.npmjs.com/package/react-swipeable-views-utils) | 3.52 |
| react-swipeable-views-native | [![npm version](https://img.shields.io/npm/v/react-swipeable-views-native.svg)](https://www.npmjs.com/package/react-swipeable-views-native) | [![npm downloads](https://img.shields.io/npm/dm/react-swipeable-views-native.svg)](https://www.npmjs.com/package/react-swipeable-views-native) | ? |

## npm

```sh
npm install --save react-swipeable-views
```

## Packages stucture

The project is split into multiple packages.
This is really useful for code sharing and isolation.
We are using [Lerna](https://github.com/lerna/lerna) to do so.
The project has the following packages:
- `react-swipeable-views-core`: core modules shared between the different packages.
- [react-swipeable-views](https://www.npmjs.com/package/react-swipeable-views): browser implementation of the `<SwipeableViews />` component.
- [react-swipeable-views-native](https://www.npmjs.com/package/react-swipeable-views-native): native implementation**s** of the `<SwipeableViews />` component.
- [react-swipeable-views-utils](https://www.npmjs.com/package/react-swipeable-views-utils): Higher order Components providing additional functionalities like `virtualize()`.

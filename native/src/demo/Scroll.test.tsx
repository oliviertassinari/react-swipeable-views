import 'react-native';
import * as React from 'react';
import Scroll from './Scroll';
import * as renderer from 'react-test-renderer';

describe('Scroll snapshot', () => {
  jest.useFakeTimers();

  it('renders the root', async () => {
    const tree = renderer.create(<Scroll />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

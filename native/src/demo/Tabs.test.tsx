import 'react-native';
import * as React from 'react';
import Tabs from './Tabs';
import * as renderer from 'react-test-renderer';

describe('Tabs snapshot', () => {
  jest.useFakeTimers();

  it('renders the root', async () => {
    const tree = renderer.create(<Tabs />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

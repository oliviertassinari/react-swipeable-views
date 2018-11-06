import 'react-native';
import * as React from 'react';
import AutoPlay from './AutoPlay';
import * as renderer from 'react-test-renderer';

describe('AutoPlay snapshot', () => {
  jest.useFakeTimers();

  it('renders the root', async () => {
    const tree = renderer.create(<AutoPlay />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

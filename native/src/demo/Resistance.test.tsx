import 'react-native';
import * as React from 'react';
import Resistance from './Resistance';
import * as renderer from 'react-test-renderer';

describe('Resistance snapshot', () => {
  jest.useFakeTimers();

  it('renders the root', async () => {
    const tree = renderer.create(<Resistance />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

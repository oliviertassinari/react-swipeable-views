import 'react-native';
import * as React from 'react';
import Resitance from './Resitance';
import * as renderer from 'react-test-renderer';

describe('Resitance snapshot', () => {
  jest.useFakeTimers();

  it('renders the root', async () => {
    const tree = renderer.create(<Resitance />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import 'react-native';
import * as React from 'react';
import Hocs from './Hocs';
import * as renderer from 'react-test-renderer';

describe('Hocs snapshot', () => {
  jest.useFakeTimers();

  it('renders the root', async () => {
    const tree = renderer.create(<Hocs />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

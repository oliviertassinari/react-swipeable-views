import 'react-native';
import * as React from 'react';
import Virtualize from './Virtualize';
import * as renderer from 'react-test-renderer';

describe('Virtualize snapshot', () => {
  jest.useFakeTimers();

  it('renders the root', async () => {
    const tree = renderer.create(<Virtualize />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

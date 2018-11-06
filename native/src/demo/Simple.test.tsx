import 'react-native';
import * as React from 'react';
import Simple from './Simple';
import * as renderer from 'react-test-renderer';

describe('Simple snapshot', () => {
  jest.useFakeTimers();

  it('renders the root', async () => {
    const tree = renderer.create(<Simple />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

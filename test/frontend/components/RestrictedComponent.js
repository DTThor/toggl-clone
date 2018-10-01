import React from 'react';
import { shallow } from 'enzyme';
import RestrictedComponent from '../../../src/frontend/components/RestrictedComponent';

describe('RestrictedComponent', () => {
  it('renders without crashing', () => {
    shallow(<RestrictedComponent />);
  });
});

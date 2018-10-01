import React from 'react';
import { shallow } from 'enzyme';
import Admin from '../../../src/frontend/components/Admin';

describe('Admin Component', () => {
  it('renders without crashing', () => {
    shallow(<Admin />);
  });
});

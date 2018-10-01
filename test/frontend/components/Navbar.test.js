/* eslint-disable react/jsx-indent */
import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../../src/frontend/components/Navbar';

describe('Navbar', () => {
  it('renders without crashing', () => {
    const isLoggedIn = true;
    const onClick = jest.fn();
    const user = {};

    mount(<BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} logout={onClick} user={user} />
          </BrowserRouter>);
  });

  it('calls onClick event when logout button is clicked', () => {
    const isLoggedIn = true;
    const onClick = jest.fn();
    const user = {};

    const wrapper = mount(<BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} logout={onClick} user={user} />
                          </BrowserRouter>);
    wrapper.find('button.ph4').simulate('click');
    expect(onClick).toBeCalled();
  });
});

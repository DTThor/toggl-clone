import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '../../../src/frontend/components/Login';

describe('Login', () => {
  const login = jest.fn();

  it('renders without crashing', () => {
    shallow(<Login login={login} />);
  });

  it('has a handleAuth method', () => {
    const wrapper = mount(<Login login={login} />);
    expect(wrapper.instance().handleAuth).toBeDefined();
  });

  it('has a validateEmail method', () => {
    const wrapper = mount(<Login login={login} />);
    expect(wrapper.instance().validateEmail).toBeDefined();
  });

  it('has a validatePassword method', () => {
    const wrapper = mount(<Login login={login} />);
    expect(wrapper.instance().validatePassword).toBeDefined();
  });

  it('will update email with change', () => {
    const wrapper = shallow(<Login login={login} />);
    const event = {
      target: { name: 'email', value: 'test@test.com' },
    };
    wrapper.find('[name="email"]').simulate('change', event);
    expect(wrapper.state('email')).toEqual('test@test.com');
    expect(wrapper.find('[name="email"]').prop('value')).toEqual('test@test.com');
  });

  it('will update password with change', () => {
    const wrapper = mount(<Login login={login} />);
    const event = {
      target: { name: 'password', value: 'passsss' },
    };
    wrapper.find('[name="password"]').simulate('change', event);
    expect(wrapper.state('password')).toEqual('passsss');
    expect(wrapper.find('[name="password"]').prop('value')).toEqual('passsss');
  });

  it('cannot submit empty form', () => {
    const wrapper = mount(<Login login={login} />);
    expect(wrapper.find('[type="submit"]').prop('disabled')).toEqual(true);
  });
});

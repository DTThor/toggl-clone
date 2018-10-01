import { isAuthenticated } from '../../../src/frontend/components/AuthRoute';
import { VALID_TOKEN } from '../../../src/constants';

describe('AuthRoute tests', () => {
  it('returns false when localstorage does not contain validtoken', () => {
    const user = { authToken: 'invalid' };
    localStorage.setItem('user', JSON.stringify(user));
    expect(isAuthenticated()).toBeFalsy();
  });

  it('returns true when localstorage does contain validtoken', () => {
    const user = { authToken: VALID_TOKEN };
    localStorage.setItem('user', JSON.stringify(user));
    expect(isAuthenticated()).toBeTruthy();
  });
});

/* eslint-disable no-underscore-dangle */
import { setUser, removeUser } from '../../src/utils/userUtils';

describe('user', () => {
  it('adds user to local storage', () => {
    const user = { email: 'someEmail@email.com', authToken: 'someToken' };
    setUser(user);
    expect(localStorage.setItem).toHaveBeenLastCalledWith('user', JSON.stringify(user));
    expect(JSON.parse(localStorage.__STORE__.user)).toEqual(user);
  });
  it('removes user from local storage', () => {
    const user = { email: 'someEmail@email.com', authToken: 'someToken' };
    setUser(user);
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    removeUser();
    expect(Object.keys(localStorage.__STORE__).length).toBe(0);
  });
});

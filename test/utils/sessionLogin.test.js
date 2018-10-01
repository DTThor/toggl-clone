import sessionLogin, { validEmailsAndPasswords } from '../../src/utils/sessionLogin';
import { VALID_TOKEN } from '../../src/constants';

describe('sessionLogin', () => {
  const validEmail = 'validEmail@email.com';
  const validPassword = 'validPassword';
  validEmailsAndPasswords[validEmail] = validPassword;

  it('returns a user object with an email and an authToken', async () => {
    const session = await sessionLogin(validEmail, validPassword);
    expect(session).toHaveProperty('email');
    expect(session).toHaveProperty('authToken');
  });

  it('returns a user object with a valid token if given a correct email and password', async () => {
    const session = await sessionLogin(validEmail, validPassword);
    const { authToken } = session;
    expect(authToken).toEqual(VALID_TOKEN);
  });

  it('does not return a user object with a valid token if given an unknown email', async () => {
    const session = await sessionLogin('anUnknownEmail@email.com', validPassword);
    const { authToken } = session;
    expect(authToken).not.toEqual(VALID_TOKEN);
  });

  it('does not return a user object with a valid token if given the wrong password', async () => {
    const session = await sessionLogin(validEmail, 'someWrongPassword');
    const { authToken } = session;
    expect(authToken).not.toEqual(VALID_TOKEN);
  });
});

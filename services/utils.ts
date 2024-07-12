import Cookies from 'js-cookie';

export async function setAuthToken(token: string) {
  Cookies.set('auth_token', token, { expires: 7, secure: true });
}

export async function getAuthToken() {
  return Cookies.get('auth_token');
}

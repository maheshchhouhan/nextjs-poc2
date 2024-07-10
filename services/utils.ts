import { cookies } from 'next/headers';

export async function setAuthToken(token: string) {
  const cookieStore = cookies();
  cookieStore.set('auth_token', token, { httpOnly: true, secure: true, path: '/' });
}

export async function getAuthToken() {
  const cookieStore = cookies();
  return cookieStore.get('auth_token')?.value;
}

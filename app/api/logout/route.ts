import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();
  cookieStore.set('auth_token', '', { httpOnly: true, secure: true, path: '/', maxAge: -1 });
  return NextResponse.json({ message: 'Logged out successfully' });
}
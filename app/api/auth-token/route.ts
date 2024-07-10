import { NextResponse } from 'next/server';
import { getAuthToken } from '@/services/utils';

export async function GET() {
  const authToken = await getAuthToken() || "";

  return NextResponse.json(authToken);
}

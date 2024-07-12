import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { userName, password, clientId } = await request.json();

  try {
    const response = await fetch('https://dev.exp-inc.com/EXPDev71/api/users/authenticateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'offset': "2.0",
      },
      body: JSON.stringify({
        userName,
        password,
        clientId,
      }),
    });

    const result = await response.json();
    const authToken = response.headers.get("Auth_Token");

    if (response.ok) {
      const nextResponse = NextResponse.json(result, { status: 200 });
      if (authToken) {
        nextResponse.headers.set('Auth_Token', authToken);
      }
      return nextResponse;
    } else {
      return NextResponse.json({ message: result.message }, { status: response.status });
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

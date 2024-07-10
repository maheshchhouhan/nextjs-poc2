"use server";

import { setAuthToken } from "./utils";

export async function Authenticate(userName: string, password: string, clientId: string) {
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
        clientId
      }),
    });

    const result = await response.json();
    const authToken = response.headers.get("Auth_Token");

    if (authToken) {
      await setAuthToken(authToken);
    }

    return {
      status: response.status,
      message: result.message,
      authToken,
      data: result.data,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      status: 500,
      error: 'Failed to authenticate user'
    };
  }
}



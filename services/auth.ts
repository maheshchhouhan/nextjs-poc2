import { setAuthToken } from "./utils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function Authenticate(userName: string, password: string, clientId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        userName,
        password,
        clientId,
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
      error: 'Failed to authenticate user',
    };
  }
}

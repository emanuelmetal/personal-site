'use server'; // Mark function as a Server Action
import { cookies } from 'next/headers';

export async function setCookieValue(key: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(key, value, { path: '/', maxAge: 60 * 60 * 24 * 365 }); // Set the cookie for 1 year
}

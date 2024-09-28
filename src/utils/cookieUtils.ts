// src/utils/cookieUtils.ts

import Cookies from 'js-cookie';

/**
 * Store a token in cookies.
 * @param token - The JWT token to be stored.
 * @param days - Number of days until the cookie expires.
 */
export const setTokenCookie = (key:string,token: string, days: number = 7) => {
  Cookies.set(key, token, { expires: days });
};

/**
 * Retrieve the token from cookies.
 * @returns The token if it exists, otherwise null.
 */
export const getTokenCookie = (key:string): string | null => {
  return Cookies.get(key) || null;
};

/**
 * Remove the token from cookies.
 */
export const removeTokenCookie = (key:string) => {
  Cookies.remove(key);
};

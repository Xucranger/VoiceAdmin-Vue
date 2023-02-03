/*
 * @Description:Cookie相关操作
 * @Author: Xucranger
 * @Date: 2023-01-28 11:25
 */
import Cookies from 'js-cookie';

export const COOKIE_TOKEN_KEY = 'user_token';

export const clearAllCoolies = () => {
  Cookies.remove(COOKIE_TOKEN_KEY);
};

export const getTokenFromCookie = () => {
  return Cookies.get(COOKIE_TOKEN_KEY);
};

/**
 * 三个月后cookie过期
 *
 * @param token
 */
export const saveTokenToCookie = (token) => {
  Cookies.set(COOKIE_TOKEN_KEY, token, { expires: 90 });
};

import Cookies from 'js-cookie';

export const getAppAuthCookie = function() {
  if (Cookies.get('application-auth')) {
    return true;
  }
  return false;
};

export const getTwitterAuthCookie = function() {
  if (Cookies.get('twitter-auth-request')) {
    return true;
  }
  return false;
};

export const getYoutubeAuthCookie = function() {
  // needs YouTube Cookie
  return false;
};

export const getTwitterUsername = function() {
  return Cookies.get('username');
};
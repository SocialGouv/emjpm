import cookie from "cookie";

const TOKEN_KEY = "token";
const ID_TOKEN_KEY = "id_token";

const THIRTY_DAYS_TIME = 30 * 24 * 60 * 60;

const getToken = () => {
  return localStorage.getItem(ID_TOKEN_KEY);
};

export const storageService = {
  getToken,

  hasToken() {
    const token = getToken();
    return !!token;
  },
  removeLogin() {
    localStorage.removeItem(LOGIN_KEY);
  },
  removeToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
    document.cookie = cookie.serialize(TOKEN_KEY, "", {
      maxAge: -1 // Expire the cookie immediately
    });
  },
  setToken(token) {
    localStorage.setItem(ID_TOKEN_KEY, token);
    document.cookie = cookie.serialize(TOKEN_KEY, token, {
      maxAge: THIRTY_DAYS_TIME
    });
  }
};

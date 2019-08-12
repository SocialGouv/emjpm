const ID_TOKEN_KEY = "id_token";
const LOGIN_KEY = "login";

const getToken = () => {
  return localStorage.getItem(ID_TOKEN_KEY);
};

export const localStorageService = {
  getToken,

  hasToken: () => {
    const token = getToken();
    return !!token;
  },
  removeToken: () => {
    localStorage.removeItem(ID_TOKEN_KEY);
  },
  removeLogin: () => {
    localStorage.removeItem(LOGIN_KEY);
  },
  setLogin: login => {
    localStorage.setItem(LOGIN_KEY, login);
  },
  setToken: token => {
    localStorage.setItem(ID_TOKEN_KEY, token);
  }
};

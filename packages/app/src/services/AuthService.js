import cookie from "cookie";
import { localStorageService } from "./LocalStorageService";

export const authService = {
  logout: () => {
    localStorageService.removeToken();
    localStorageService.removeLogin();
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1 // Expire the cookie immediately
    });
  },
  login: (login, idToken) => {
    localStorageService.setLogin(login);
    localStorageService.setToken(idToken);
    document.cookie = cookie.serialize("token", idToken, {
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });
  }
};

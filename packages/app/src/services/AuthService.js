import { storageService } from "../util";

export const authService = {
  logout: () => {
    storageService.removeToken();
    storageService.removeLogin();
  },
  login: (login, idToken) => {
    storageService.setLogin(login);
    storageService.setToken(idToken);
  }
};

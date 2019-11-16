import { storageService } from "../util";

export const authService = {
  login(login, idToken) {
    storageService.setLogin(login);
    storageService.setToken(idToken);
  },
  logout() {
    storageService.removeToken();
    storageService.removeLogin();
  }
};

import { storageService } from "../util";

export const authService = {
  logout() {
    storageService.removeToken();
  },
  login(idToken) {
    storageService.setToken(idToken);
  },
  logout() {
    storageService.removeToken();
    storageService.removeLogin();
  }
};

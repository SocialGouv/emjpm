import { storageService } from "../util";

export const authService = {
  login(idToken) {
    storageService.setToken(idToken);
  },
  logout() {
    storageService.removeToken();
  }
};

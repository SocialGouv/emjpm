import apiFetch from "../components/communComponents/Api";
import { authService } from "./AuthService";

export const startImpersonate = async id => {
  const url = `/impersonate/start`;
  const json = await apiFetch(
    url,
    {
      body: JSON.stringify({ user_id: id }),
      method: "POST"
    },
    { apiVersion: "v2", forceLogin: true }
  );
  const token = json.token;
  authService.logout();
  authService.login(token);
  return json.url;
};

export const stopImpersonate = async realUserId => {
  const url = `/impersonate/stop`;
  const json = await apiFetch(
    url,
    {
      body: JSON.stringify({ user_id: realUserId }),
      method: "POST"
    },
    { apiVersion: "v2", forceLogin: true }
  );
  const token = json.token;
  authService.logout();
  authService.login(token);
  return json.url;
};

import apiFetch from "../components/communComponents/Api";
import { authService } from "./AuthService";

export const startImpersonate = async id => {
  const url = `/impersonate/start`;
  const json = await apiFetch(
    url,
    {
      method: "POST",
      body: JSON.stringify({ user_id: id })
    },
    { forceLogin: true, apiVersion: "v2" }
  );
  const token = json.token;
  authService.login(token);
  return json.url;
};

export const stopImpersonate = async realUserId => {
  const url = `/impersonate/stop`;
  const json = await apiFetch(
    url,
    {
      method: "POST",
      body: JSON.stringify({ user_id: realUserId })
    },
    { forceLogin: true, apiVersion: "v2" }
  );
  const token = json.token;
  authService.login(token);
  return json.url;
};

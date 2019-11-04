import apiFetch from "../components/communComponents/Api";
import { authService } from "./AuthService";

export const startImpersonate = async (id, email) => {
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
  authService.login(email, token);
  return json.url;
};

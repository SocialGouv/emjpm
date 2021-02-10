import { useContext } from "react";
import { UserContext } from "~/containers/UserContext";

export default function useUser() {
  return useContext(UserContext);
}

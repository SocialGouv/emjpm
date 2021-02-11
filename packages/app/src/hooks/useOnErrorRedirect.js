import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useOnErrorRedirect(error, redirection) {
  const history = useHistory();
  useEffect(() => {
    if (error) {
      history.push(redirection);
    }
  }, [error, redirection, history]);
}

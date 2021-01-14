import { useState, useEffect } from "react";

const IDLE = "idle";
const LOADING = "loading";
const READY = "ready";
const ERROR = "error";

export const SCRIPT_STATUS = {
  IDLE,
  LOADING,
  READY,
  ERROR,
};

export default function useScript(src) {
  const [status, setStatus] = useState(src ? LOADING : IDLE);

  useEffect(() => {
    // Allow falsy src value if waiting on other data needed for
    // constructing the script URL passed to this hook.
    if (!src) {
      setStatus(IDLE);
      return;
    }

    // Fetch existing script element by src
    // It may have been added by another intance of this hook
    let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.setAttribute("data-status", "loading");
      document.body.appendChild(script);

      // Store status in attribute on script
      // This can be read by other instances of this hook
      function setAttributeFromEvent(event) {
        script.setAttribute(
          "data-status",
          event.type === "load" ? READY : ERROR
        );
      }

      script.addEventListener("load", setAttributeFromEvent);
      script.addEventListener("error", setAttributeFromEvent);
    } else {
      // Grab existing script status from attribute and set to state.
      setStatus(script.getAttribute("data-status"));
    }

    // Script event handler to update status in state
    // Note: Even if the script already exists we still need to add
    // event handlers to update the state for *this* hook instance.

    function setStateFromEvent(event) {
      setStatus(event.type === "load" ? READY : ERROR);
    }

    script.addEventListener("load", setStateFromEvent);
    script.addEventListener("error", setStateFromEvent);

    return () => {
      if (script) {
        script.removeEventListener("load", setStateFromEvent);
        script.removeEventListener("error", setStateFromEvent);
      }
    };
  }, [src]);

  return status;
}
